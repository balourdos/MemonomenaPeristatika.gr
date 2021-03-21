import Head from "next/head";

function Header() {
  const GA_TRACKING_ID = "G-FV7VX546WR";

  return (
    <Head>
      <script
        async=""
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&amp;display=swap"
        rel="stylesheet"
      />
      <link
        rel="shortcut icon"
        type="image/jpg"
        href="https://img.icons8.com/ios-filled/50/000000/policeman-male--v1.png"
      />
      <link
        href="https://vjs.zencdn.net/7.10.2/video-js.css"
        rel="stylesheet"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

export default Header;
