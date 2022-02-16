import path from "path";
import Head from "next/head";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import Main from "../../components/Main";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/markdown";
import { PostData } from "../../lib/types";
import {
  getMarkdownFilePaths,
  getMarkdownfile,
  parseMarkdownFile,
  getFilePathFromSlug,
  getSlug,
} from "../../lib/utils/markdown";
import { generateFeeds } from "../../lib/utils/feed";

type PostParsedUrlQuery = ParsedUrlQuery & {
  slug: string;
};

type HomeProps = {
  post: {
    slug: string;
    data: PostData;
    content: string;
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  generateFeeds();

  return {
    paths: getMarkdownFilePaths().map((fp) => {
      return { params: { slug: getSlug(fp) } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ params }) => {
  const { slug } = params as PostParsedUrlQuery;

  const { data, content } = parseMarkdownFile(
    getMarkdownfile(getFilePathFromSlug(slug))
  );

  return {
    props: {
      post: {
        slug,
        data: data as PostData,
        content,
      },
    },
  };
};

const Post: NextPage<HomeProps> = ({ post }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/";
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
        <meta
          name="description"
          key="description"
          content={post.data.description}
        />
        <meta
          name="twitter:url"
          key="twitter:url"
          content={path.join(baseUrl, router.pathname, post.slug)}
        />
        <meta
          name="twitter:title"
          key="twitter:title"
          content={post.data.title}
        />
        <meta
          name="twitter:description"
          key="twitter:description"
          content={post.data.description}
        />
        {post.data.image && (
          <meta
            name="twitter:image"
            key="twitter:image"
            content={path.join(baseUrl, post.data.image)}
          />
        )}
        {post.data.image && (
          <meta
            name="twitter:image:alt"
            key="twitter:image:alt"
            content="Post image"
          />
        )}
        <meta
          property="og:url"
          key="og:url"
          content={path.join(baseUrl, router.pathname, post.slug)}
        />
        <meta property="og:title" key="og:title" content={post.data.title} />
        {post.data.image && (
          <meta
            property="og:image"
            key="og:image"
            content={path.join(baseUrl, post.data.image)}
          />
        )}
        {post.data.image && (
          <meta
            property="og:image:alt"
            key="og:image:alt"
            content="Post image"
          />
        )}
        <meta
          property="og:description"
          key="og:description"
          content={post.data.description}
        />
      </Head>
      <Main className="mx-auto max-w-screen-lg">
        <Header tagLine={post.slug} />
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex-none">
            <NavBar />
          </div>
          <div className="flex-grow">
            <article>
              <Markdown content={post.content} />
              <div className="flex flex-row divide-x text-sm mt-12">
                <time className="pr-2">
                  {new Date(post.data.publishedDate).toLocaleDateString("AU")}
                </time>
                {post.data.updatedDate && (
                  <span className="px-2">
                    Updated on:{" "}
                    <time>
                      {new Date(post.data.updatedDate).toDateString()}
                    </time>
                  </span>
                )}
                {post.data.tags && post.data.tags.length && (
                  <span className="px-2">Tags: {post.data.tags.join(",")}</span>
                )}
              </div>
            </article>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Post;
