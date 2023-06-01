import Head from "next/head";

const CustomHead = ({subtitle}) => {
    const addSubtitle = subtitle ? `TuneBox | ${subtitle}` : "TuneBox"

    return (
        <Head>
          <title>{addSubtitle}</title>
          <meta name="keywords" content="TuneBox,inspiring,travel,horror,epic,romantic,ethnic,family,corporate,hybrid,hip-hop,yoga,thriller,documentary,trailer,action,fantasy,sport,media"/>
          <meta name="description" content="Tunebox's music is perfect for use as free background music for videos. The music you download from Tunebox is free and royalty-free. For Vlogs & Stream. New music added daily. Whitelist YouTube channel. Join free today! Choose no copyright music from many genres."/>
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