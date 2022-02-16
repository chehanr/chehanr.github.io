import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FunctionComponent } from "react";

import CodeBlock from "./CodeBlock";
import styles from "./Markdown.module.css";

export type MarkdownProps = {
  content: string;
};

const Markdown: FunctionComponent<MarkdownProps> = ({ content }) => (
  <ReactMarkdown
    className={styles.markdown}
    components={{
      code: ({ inline, className, children, ...props }) => {
        const language = /language-(\w+)/.exec(className || "");

        return !inline && language && language.length ? (
          <CodeBlock language={language[1]} showLineNumbers {...props}>
            {String(children).replace(/\n$/, "")}
          </CodeBlock>
        ) : (
          <code {...props}>{children}</code>
        );
      },
    }}
    remarkPlugins={[remarkGfm]}
  >
    {content}
  </ReactMarkdown>
);

export default Markdown;
