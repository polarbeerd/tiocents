"use client";

import { MDXProvider } from "@mdx-js/react";

const components = {
  h1: (props) => <h1 className="text-3xl font-bold my-4" {...props} />,
  p: (props) => <p className="text-lg my-2" {...props} />,
  VideoPlayer: ({ src }) => (
    <video controls className="w-full rounded-lg my-4">
      <source src={src} type="video/mp4" />
    </video>
  ),
  Blockquote: (props) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic my-4"
      {...props}
    />
  ),
  Spacer: ({ size }) => <div style={{ height: size }} />,
};

export default function MDXComponentsWrapper({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
