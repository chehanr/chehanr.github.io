import fs from "fs";
import path from "path";
import { Feed, Author, Item } from "feed";

import {
  getMarkdownFilePaths,
  getMarkdownfile,
  parseMarkdownFile,
  getSlug,
} from "./markdown";

export const getAuthor = (): Author => {
  return {
    name: "Chehan Ratnasiri",
    email: "chehan.rat@gmail.com",
    link: "https://twitter.com/chehanr",
  };
};

export const getFeed = (
  baseUrl: string,
  { updated = new Date(), author = getAuthor() } = {}
) => {
  return new Feed({
    title: "Chehan Ratnasiri",
    description: "Chehan's personal webspace",
    id: baseUrl,
    link: baseUrl,
    language: "en-AU",
    image: path.join(baseUrl, "face.png"),
    favicon: path.join(baseUrl, "favicon.ico"),
    copyright: "All rights reserved 2022, Chehan Ratnasiri",
    updated,
    feedLinks: {
      rss2: path.join(baseUrl, "rss.xml"),
      atom: path.join(baseUrl, "atom.xml"),
      json: path.join(baseUrl, "feed.json"),
    },
    author,
  });
};

export const getFeedItems = (
  basePath: string,
  { author = getAuthor() } = {}
) => {
  const posts = getMarkdownFilePaths({ inclDir: true })
    .map((fp) => {
      return { fc: getMarkdownfile(fp), fp };
    })
    .map(({ fc, fp }) => {
      const { data, content } = parseMarkdownFile(fc);
      return { slug: getSlug(fp), data, content };
    })
    .sort(
      (a, b) =>
        new Date(b.data.publishedDate).valueOf() -
        new Date(a.data.publishedDate).valueOf()
    );

  const feedItems: Item[] = [];

  posts.forEach(({ slug, data, content }) => {
    feedItems.push({
      title: data.title,
      id: `${basePath}/posts/${slug}`,
      link: `${basePath}/posts/${slug}`,
      description: data.description,
      content: content,
      author: [author],
      contributor: [author],
      image: data.image ? path.join(basePath, data.image) : undefined,
      date: new Date(data.updatedDate || data.publishedDate),
      published: new Date(data.publishedDate),
    });
  });

  return feedItems;
};

export const generateFeeds = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/";
  const feed = getFeed(baseUrl);

  getFeedItems(baseUrl).map((fi) => feed.addItem(fi));

  fs.writeFileSync(path.join("./public", "atom.xml"), feed.atom1());
  fs.writeFileSync(path.join("./public", "rss.xml"), feed.rss2());
  fs.writeFileSync(path.join("./public", "feed.json"), feed.json1());
};
