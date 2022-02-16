import Head from "next/head";
import { NextPage, GetStaticProps } from "next";

import Main from "../components/Main";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PostLink from "../components/PostLink";
import { PostData } from "../lib/types";
import {
  getMarkdownFilePaths,
  getMarkdownfile,
  parseMarkdownFile,
  getSlug,
} from "../lib/utils/markdown";

type HomeProps = {
  posts: {
    slug: string;
    data: PostData;
  }[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let posts = getMarkdownFilePaths({ inclDir: true })
    .map((fp) => {
      return { fc: getMarkdownfile(fp), fp };
    })
    .map(({ fc, fp }) => {
      return { slug: getSlug(fp), data: parseMarkdownFile(fc).data };
    })
    .sort(
      (a, b) =>
        new Date(b.data.publishedDate).valueOf() -
        new Date(a.data.publishedDate).valueOf()
    );

  return {
    props: {
      posts,
    },
  };
};

const Posts: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" key="description" content="Posts" />
        <meta name="twitter:title" key="twitter:title" content="Posts" />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="Posts"
        />
        <meta property="og:title" key="og:title" content="Posts" />
        <meta property="og:description" key="og:description" content="Posts" />
      </Head>
      <Main className="mx-auto max-w-screen-lg">
        <Header tagLine="Posts" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex-none">
            <NavBar />
          </div>
          <div className="flex-grow">
            <ul className="space-y-1">
              {posts.map(({ slug, data }) => (
                <PostLink
                  key={slug}
                  title={data.title}
                  href={`/posts/${slug}`}
                  publishedDate={new Date(data.publishedDate)}
                  as="li"
                />
              ))}
            </ul>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Posts;
