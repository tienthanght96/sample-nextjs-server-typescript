import Document, { Head, Main, NextScript } from "next/document";
import { getServerSideToken, getUserScript } from "@src/utils/funcUtils";

export default class MyDocument extends Document<any> {
  static async getInitialProps(ctx: any) {
    const props = await Document.getInitialProps(ctx);
    const userData = await getServerSideToken(ctx.req);

    return { ...props, ...userData };
  }

  render() {
    const { user = {} } = this.props;

    return (
      <html>
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    );
  }
}
