import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta property="og:site_name" content="Desa Rejoagung" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
      </Head>
      <body>
        <div id="fb-root"></div>
        <script 
          async 
          defer 
          crossOrigin="anonymous" 
          src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v19.0"
        />
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}