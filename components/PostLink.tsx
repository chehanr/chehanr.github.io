import Link from "next/link";
import React, { FunctionComponent } from "react";

export type PostLinkProps = {
  title: string;
  href: string;
  publishedDate: Date;
  as?: keyof JSX.IntrinsicElements;
};

export const PostLink: FunctionComponent<PostLinkProps> = ({
  title,
  href,
  publishedDate,
  as,
}) => {
  const Tag = as || "div";

  return (
    <Tag className="flex flex-row gap-4">
      <div className="flex-grow overflow-hidden truncate w-0">
        <Link href={href} passHref>
          <a className="hover:underline">{title}</a>
        </Link>
      </div>
      <time className="flex-none">{publishedDate.toLocaleDateString()}</time>
    </Tag>
  );
};

export default PostLink;
