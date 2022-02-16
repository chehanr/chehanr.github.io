import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

import Main from "../components/Main";
import Header from "../components/Header";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Not found</title>
      </Head>
      <Main className="mx-auto max-w-screen-lg">
        <Header tagLine="404 - Not found" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold">404</h1>
          <h2 className="text-xl mt-2">Not found :(</h2>
          <Link href="/" passHref>
            <a
              className="text-3xl mt-4"
              title="Go to index"
              aria-label="Go to index"
            >
              🏠
            </a>
          </Link>
        </div>
      </Main>
    </>
  );
};

export default Custom404;
