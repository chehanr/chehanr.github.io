import { NextPage } from "next";
import Head from "next/head";

import Main from "../components/Main";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const Resume: NextPage = () => {
  return (
    <>
      <Head>
        <title>Resume</title>
        <meta name="description" key="description" content="Resume" />
        <meta name="twitter:title" key="twitter:title" content="Resume" />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="Resume"
        />
        <meta property="og:title" key="og:title" content="Resume" />
        <meta property="og:description" key="og:description" content="Resume" />
      </Head>
      <Main className="mx-auto max-w-screen-lg">
        <Header tagLine="Resume" />
        <div className="flex flex-col flex-wrap gap-4 md:flex-row md:gap-8">
          <div className="flex-none">
            <NavBar />
          </div>
          <div className="flex-grow">
            <iframe
              src="https://drive.google.com/file/d/1yUPVelqdbJkLnhHYdBlJNc2Vh2X89f4F/preview"
              allow="autoplay"
              scrolling="allow"
              className="h-screen w-full"
            ></iframe>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Resume;
