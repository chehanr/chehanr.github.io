---
title: "Validation with Express.js middleware, fp-ts and Zod"
description: "This post explores how to use Express.js middleware for validating data in the request body, URL parameters, or query parameters using fp-ts and Zod. The post also covers the Either monad and how to use the fold function for error handling."
pubDate: "May 05 2023"
heroImage: "/posts/validation-with-express-js-middleware-fp-ts-and-zod/cyberpunk-train.png"
heroImageAlt: "A cyberpunk (express) train (AI Art)"
---

# Validation with Express.js middleware, fp-ts and Zod

This post is about setting up Express.js middleware to validate data in the request body, URL parameters, or query parameters using fp-ts and Zod.

There are multiple ways to approach this, and this is one of them.

Let's start by writing a utility function:

```ts
// ./src/utils.ts

import { either as E } from "fp-ts";
import { z } from "zod";

export const parseZ =
  <T>(zodType: z.ZodType<T>) =>
  (v: unknown): E.Either<z.ZodError<T>, T> => {
    const result = zodType.safeParse(v);

    switch (result.success) {
      case true:
        return E.right(result.data);

      case false:
        return E.left(result.error);
    }
  };
```

We'll be using fp-ts today but we'll keep it at a minimum and mainly use the `Either` monad.

__What is the Either monad?__

In fp-ts, the `Either` type is a monad that can be used to handle errors in a functional and composable way. Computation that succeeds are represented by a value wrapped in a `Right` constructor, while computations that fail are represented by a value wrapped in a `Left` constructor.

So the above `parseZ` acts as a wrapper around Zod's `safeParse` function. It returns a `Right` that contains the data if parsing was successful and a `Left` containing a ZodError if it failed.

We will now use this in our first middleware:

```ts
// ./src/types.ts

export type RequestContentLocation = "body" | "params" | "query";

```

```ts
// ./src/middleware.ts

import { RequestHandler } from "express";
import { function as F, either as E } from "fp-ts";

import { parseZ } from "./utils";
import { RequestValidationError } from "./errors";
import { RequestContentLocation } from "./types";

export const validateRequest =
  <T>({
    requestContentLocation,
    zodType,
  }: {
    requestContentLocation: RequestContentLocation;
    zodType: z.ZodType<T>;
  }): RequestHandler =>
  (req, _, next) => {
    const requestContentParser = parseZ(zodType);
    const requestContent = req[requestContentLocation];

    return F.pipe(
      requestContentParser(requestContent),
      E.fold(
        (err) => next(new RequestValidationError(requestContentLocation, err)),
        () => next()
      )
    );
  };
```

The `validateRequest` middleware takes in a `requestContentLocation` parameter which we use to specify where the Zod parser should be run on. We can choose to validate data in the request body, URL parameters, or query parameters.

The result of `requestContentParser` function is then passed into the `fold` function available in the `Either` monad to pass that result into the next middleware using the `next` function.

__What is the `fold` function?__

The `fold` method is a way to extract values from an `Either` instance in a safe and composable way. It takes two functions as arguments, one for handling the `Left` case and one for handling the `Right` case. The `fold` method applies the appropriate function based on whether the Either value is a `Left` or `Right`, and returns the result of that function.

In this instance, if `requestContentParser` returns a `Left<ZodError>`, we pass the error into next. Express will then handle that error for us.

Otherwise, if the parsing was successful, we call the `next` function without an argument.

Here's the custom error class we will use to wrap the original `ZodError` returned by the `parseZ` function. We will also pass the `requestContentLocation` when initialising this class as it will be helpful down the line. More on this later.

```ts
// ./src/errors.ts

import { ZodError } from "zod";

import { RequestContentLocation } from "./types";

export class RequestValidationError extends Error {
  requestContentLocation: RequestContentLocation;
  zodError: ZodError;

  constructor(
    requestContentLocation: RequestContentLocation,
    zodError: ZodError
  ) {
    super("Request validation error");

    this.requestContentLocation = requestContentLocation;
    this.zodError = zodError;
  }
}
```

In this section of the code, we have created three utility functions - `validateRequestBody`, `validateRequestQueries`, and `validateRequestParams` - that wrap around the `validateRequest` middleware for ease of use and better type safety.

These functions are a way to abstract away the implementation details of the `validateRequest` middleware, making it easier to use and ensuring that the types of the request parameters are correctly inferred.

```ts
// ./src/middleware.ts

import { ParsedQs } from "qs";

import { z } from "zod";
import { ErrorRequestHandler, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export const validateRequestBody = <T>(
  zodType: z.ZodType<T>
): RequestHandler<any, any, T, any, any> =>
  validateRequest({ requestContentLocation: "body", zodType });

export const validateRequestQueries = <T extends ParsedQs>(
  zodType: z.ZodType<T>
): RequestHandler<any, any, any, T, any> =>
  validateRequest({ requestContentLocation: "query", zodType });

export const validateRequestParams = <T extends ParamsDictionary>(
  zodType: z.ZodType<T>
): RequestHandler<T, any, any, any, any> =>
  validateRequest({ requestContentLocation: "params", zodType });

```

Now let's create an endpoint to test all these out:

```ts
// ./src/types.ts

import { z } from "zod";

export type APIResponseBodySuccessful<T = null> = {
  success: true;
  result: T;
  error: null;
};

export const ExampleRequestQueriesZ = z.object({ foo: z.string().optional() });

export type ExampleRequestQueries = z.infer<typeof ExampleRequestQueriesZ>;

export const ExampleRequestBodyZ = z.object({ bar: z.string().optional() });

export type ExampleRequestBody = z.infer<typeof ExampleRequestBodyZ>;

export const ExampleRequestParamsZ = z.object({ baz: z.string().optional() });

export type ExampleRequestParams = z.infer<typeof ExampleRequestParamsZ>;

export type ExampleAPIResponseBody = APIResponseBodySuccessful<{
  queries: Record<string, unknown>;
  body: Record<string, unknown>;
  params: Record<string, unknown>;
  requestContext: Record<string, unknown>;
  responseContext: Record<string, unknown>;
}>;

```

```ts
// ./src/controllers.ts

import { RequestHandler } from "express";

import {
  ExampleAPIResponseBody,
  ExampleRequestBody,
  ExampleRequestQueries,
  ExampleRequestParams,
} from "./types";

export const exampleController: RequestHandler<
  ExampleRequestParams,
  ExampleAPIResponseBody,
  ExampleRequestBody,
  ExampleRequestQueries
> = (req, res) => {
  res.send({
    success: true,
    result: {
      queries: req.query,
      body: req.body || {},
      params: req.params,
      requestContext: req.context,
      responseContext: res.context,
    },
    error: null,
  });
};
```

```ts
// ./src/routes.ts

import { Router } from "express";
import bodyParser from "body-parser";

import { exampleController } from "./controllers";
import {
  ExampleRequestBodyZ,
  ExampleRequestQueriesZ,
  ExampleRequestParamsZ,
} from "./types";
import {
  validateRequestBody,
  validateRequestQueries,
  validateRequestParams,
} from "./middleware";

export const router = Router();

export const validateExampleRequestQueriesFn = validateRequestQueries(
  ExampleRequestQueriesZ
);
export const validateExampleRequestBodyFn =
  validateRequestBody(ExampleRequestBodyZ);
export const validateExampleRequestParamsFn = validateRequestParams(
  ExampleRequestParamsZ
);

router.post(
  "/:baz?",
  bodyParser.json(),
  validateExampleRequestQueriesFn,
  validateExampleRequestBodyFn,
  validateExampleRequestParamsFn,
  exampleController
);


export default router;

```

Now let's call the endpoint:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"bar": "bar"}' "http://localhost:3000/baz?foo=foo" | jq

...

{
  "success": true,
  "result": {
    "queries": {
      "foo": "foo"
    },
    "body": {
      "bar": "bar"
    },
    "params": {
      "baz": "baz"
    }
  },
  "error": null
}
```

As you can see, we received a nicely formatted JSON response.

But what if we force a validation error?

```bash
curl -X POST -H "Content-Type: application/json" -d '{"bar": 1}' "http://localhost:3000/baz?foo=foo"     

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Error: Request validation error<br> &nbsp; ...</pre>
</body>
</html>
```

We received a stack trace as HTML. Unfortunately this is not very useful if we are planning to use this route as a REST API endpoint that takes in inputs and returns outputs purely in JSON.

How do we fix this? With another middleware:

```ts
// ./src/types.ts

export type APIResponseBodyFailure<T> = {
  success: false;
  result: null;
  error: T;
};

```

```ts
// ./src/middleware.ts

import { ErrorRequestHandler } from "express";

export const transformToAPIFailureResponse: ErrorRequestHandler<
  any,
  APIResponseBodyFailure<unknown>
> = (err, _, res, next) => {
  if (err instanceof RequestValidationError) {
    const { requestContentLocation: location, zodError } = err;

    return res.status(400).json({
      success: false,
      result: null,
      error: {
        location,
        zodErrors: zodError.errors,
      },
    });
  }

  // Handle other errors here.

  return next(err);
};

```

The `transformToAPIFailureResponse` middleware will be "invoked" whenever the `next` function is called with an error. In this case that's done by the `validateRequest` middleware.

This middleware will look at the `err` parameter and matches it against a list of `Error` classes that we know of. Here we are doing that against the previously created `RequestValidationError` error. Then, thanks to `instanceof` and type guards, we are able to extract properties from the error and map them to a JSON response and send it down with the correct status code.

It is important to register this middleware after your routes to get it working.

```ts
// ./src/index.ts

import express from "express";

import routes from "./routes";
import { transformToAPIFailureResponse } from "./middleware";

const app = express();
const port = 3000;

app.use(routes);
app.use(transformToAPIFailureResponse);
```

Now let's see how the error response look like:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"bar": 1}' "http://localhost:3000/baz?foo=foo" | jq

...

{
  "success": false,
  "result": null,
  "error": {
    "location": "body",
    "zodErrors": [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "number",
        "path": [
          "bar"
        ],
        "message": "Expected string, received number"
      }
    ]
  }
}
```

That's it!

I believe this approach is highly extensible. Meaning it's very easy handle future error cases, especially when there's multiple endpoints to maintain.

The code for this is available [here](https://github.com/chehanr/express-boilerplate).
