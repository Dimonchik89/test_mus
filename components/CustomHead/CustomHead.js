import Head from "next/head";

const CustomHead = ({subtitle}) => {
    const addSubtitle = subtitle ? `TuneBox | ${subtitle}` : "TuneBox"

    return (
        <Head>
          <title>{addSubtitle}</title>
          <meta name="keywords" content="TuneBox,music,sound,free,download,track,chill,relax,sport,dark,epic,abstract"/>
          <meta name="description" content="TuneBox"/>
          <meta charSet="urf-8"/>
          <link rel="apple-touch-icon" sizes="60x60" href="./favicon/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png"/>
          <link rel="manifest" href="./favicon/site.webmanifest"/>
          <link rel="mask-icon" href="./favicon/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="robots" content="index, follow"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      </Head>
    )
}
export default CustomHead;