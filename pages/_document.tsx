import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="base case capital is inviting you to an event"
        />
        <meta
          property="og:site_name"
          content="base case capital is inviting you to an event"
        />
        <meta
          property="og:description"
          content="base case capital is inviting you to an event"
        />
        <meta
          property="og:title"
          content="base case capital is inviting you to an event"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="base case capital is inviting you to an event"
        />
        <meta
          name="twitter:description"
          content="base case capital is inviting you to an event"
        />
        <meta property="og:image" content="https://supafan.vercel.app/api/og" />
        <meta
          name="twitter:image"
          content="https://supafan.vercel.app/api/og"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
