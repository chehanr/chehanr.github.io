import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Main from "../components/Main";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chehan Ratnasiri</title>
      </Head>
      <Main className="mx-auto max-w-screen-lg">
        <Header />
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex-none">
            <NavBar />
          </div>
          <div className="flex-grow">
            <span className="flex items-center gap-4">
              <Image
                src={
                  "https://www.gravatar.com/avatar/f3791ecaa641099539cd5a7d266163c6?s=48"
                }
                height={48}
                width={48}
                alt="Gravatar"
                className="rounded-full"
              />
              <p className="text-2xl">Hello, I&apos;m Chehan</p>
            </span>
            <p className="mt-4">
              I&apos;m a software developer currently employed at{" "}
              <Link href="https://www.vcgs.org.au/" passHref>
                <a target={"_blank"} rel={"noopener"} className="underline">
                  VCGS
                </a>
              </Link>
              , a nonprofit clinical genetics service based in Melbourne,
              Australia.
              <br />
              <br />
              When I&apos;m not working I&apos;m usually tinkering with my{" "}
              <Link href="https://github.com/chehanr" passHref>
                <a target={"_blank"} rel={"noopener"} className="underline">
                  random projects
                </a>
              </Link>{" "}
              while listening to{" "}
              <Link
                href="https://open.spotify.com/user/22ipl2w2udlk4kcuary6xdeka"
                passHref
              >
                <a target={"_blank"} rel={"noopener"} className="underline">
                  my music
                </a>
              </Link>{" "}
              on{" "}
              <Link href="https://www.last.fm/user/chehanr" passHref>
                <a target={"_blank"} rel={"noopener"} className="underline">
                  repeat
                </a>
              </Link>
              .
              <br />
              <br />
              You can also find me on,
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link href={"https://www.linkedin.com/in/chehanr"}>
                  <a target={"_blank"} rel={"noopener"} className="underline">
                    LinkedIn
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"https://www.instagram.com/chehanr/"}>
                  <a target={"_blank"} rel={"noopener"} className="underline">
                    Instagram
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"https://twitter.com/chehanr"}>
                  <a target={"_blank"} rel={"noopener"} className="underline">
                    Twitter
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Home;
