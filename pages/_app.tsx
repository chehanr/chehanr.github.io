import "../styles/globals.css";
import path from "path";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

function CustomApp({ Component, pageProps }: AppProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/";
  const router = useRouter();

  return (
    <>
      <Head>
        <meta
          name="description"
          key="description"
          content="Chehan's personal webspace"
        />
        <meta name="theme-color" content="#000" />
        <meta name="author" key="author" content="Chehan Ratnasiri" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@chehanr" />
        <meta name="twitter:creator" content="@chehanr" />
        <meta property="twitter:domain" content={baseUrl} />
        <meta
          name="twitter:url"
          key="twitter:url"
          content={path.join(baseUrl, router.pathname)}
        />
        <meta
          name="twitter:title"
          key="twitter:title"
          content="Chehan Ratnasiri"
        />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="Chehan's personal webspace"
        />
        <meta
          name="twitter:image"
          key="twitter:image"
          content={path.join(baseUrl, "face.png")}
        />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="ಠ_ಠ" />
        <meta
          property="og:url"
          key="og:url"
          content={path.join(baseUrl, router.pathname)}
        />
        <meta property="og:type" content="blog" />
        <meta property="og:title" key="og:title" content="Chehan Ratnasiri" />
        <meta
          property="og:image"
          key="og:image"
          content={path.join(baseUrl, "face.png")}
        />
        <meta property="og:image:alt" key="og:image:alt" content="ಠ_ಠ" />
        <meta
          property="og:description"
          key="og:description"
          content="Chehan's personal webspace"
        />
        <meta property="og:site_name" content="Chehan Ratnasiri" />
        <meta property="og:locale" content="en_AU" />
        <meta property="article:author" content="Chehan Ratnasiri" />
        <link rel="me" href="mailto:chehan.rat@gmail.com" />
        <link rel="me" href="https://twitter.com/chehanr" />
        <link rel="me" href="https://github.com/chehanr" />
        <link rel="canonical" href={path.join(baseUrl, router.pathname)} />
        <link
          rel="alternate"
          href={path.join(baseUrl, "atom.xml")}
          type="application/atom+xml"
          title="Chehan Ratnasiri"
        />
        <link
          rel="alternate"
          href={path.join(baseUrl, "rss.xml")}
          type="application/rss+xml"
          title="Chehan Ratnasiri"
        />
        <link
          rel="alternate"
          href={path.join(baseUrl, "feed.json")}
          type="application/feed+json"
          title="Chehan Ratnasiri"
        />
        {/* <link rel="dns-prefetch" href={baseUrl} />
        <link rel="preconnect" href={baseUrl} />
        <link rel="prefetch"  href={baseUrl} />
        <link rel="prerender" href={baseUrl} /> */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="black" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
