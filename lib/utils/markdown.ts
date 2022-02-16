import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { PostData } from "../types";

export const POSTS_DIR = "./content/posts";

export const getMarkdownFilePaths = ({
  dir = POSTS_DIR,
  ext = ".md",
  inclDir = false,
} = {}) =>
  fs
    .readdirSync(dir)
    .filter((fp) => fp.endsWith(ext))
    .map((fp) => (inclDir ? path.format({ dir, base: fp }) : fp));

export const getMarkdownfile = (filePath: string) =>
  fs.readFileSync(filePath, "utf-8");

export const getFilePathFromSlug = (
  slug: string,
  { dir = POSTS_DIR, ext = ".md" } = {}
) => path.format({ dir, name: slug, ext });

export const getSlug = (filePath: string, { ext = ".md" } = {}) =>
  path.basename(filePath, ext);

export const parseMarkdownFile = <Data = PostData>(fileContent: string) => {
  const { data, content } = matter(fileContent);

  return {
    content,
    data: data as Data,
  };
};
