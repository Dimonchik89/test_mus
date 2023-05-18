import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <title>TuneBox</title>
          <meta name="keywords" content="TuneBox,music,sound,free,download,track,chill,relax,sport,dark,epic,abstract"/>
          <meta name="description" content="TuneBox"/>
          <meta charSet="urf-8"/>
          <link rel="apple-touch-icon" sizes="60x60" href="./favicon/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png"/>
          <link rel="manifest" href="./favicon/site.webmanifest"/>
          <link rel="mask-icon" href="./favicon/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="robots" content="index, follow"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
