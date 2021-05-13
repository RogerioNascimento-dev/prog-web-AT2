import Document, {Html,Head,Main, NextScript} from 'next/document';

export default class MyDocument extends Document{
  render(){
    return(
      <Html>
        <Head>
          <link rel="shortcut icon" href="img/favicon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:100,200,300,400,500,600,700,800,900" rel="stylesheet" />          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}