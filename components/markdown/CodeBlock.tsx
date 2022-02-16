import style from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { FunctionComponent } from "react";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";

export const CodeBlock: FunctionComponent<SyntaxHighlighterProps> = ({
  language,
  children,
  ...props
}) => {
  return (
    <SyntaxHighlighter style={style} language={language} {...props}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
