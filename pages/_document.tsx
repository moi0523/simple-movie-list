import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import {
  isServerStyletron,
  styletron,
  STYLETRON_CLASSNAME,
} from '@style/styletron';
import { GlobalResetStyle } from '@style/globalReset';
import { sheetT } from 'styletron-engine-atomic/lib/server/server';
import { Provider as StyletronProvider } from 'styletron-react';

class CustomDocument extends Document<{
  stylesheets: sheetT[];
}> {
  static override async getInitialProps(context: DocumentContext) {
    const renderPage = () =>
      context.renderPage({
        enhanceApp: (App) => (props) =>
          (
            <StyletronProvider value={styletron}>
              <App {...props} />
            </StyletronProvider>
          ),
      });

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage,
    });
    let stylesheets: sheetT[] = [];

    if (isServerStyletron(styletron)) {
      stylesheets = styletron.getStylesheets() || [];
    }

    return { ...initialProps, stylesheets };
  }

  override render() {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: GlobalResetStyle }} />
          {this.props.stylesheets.map(({ css, attrs }, i) => (
            <style
              className={STYLETRON_CLASSNAME}
              dangerouslySetInnerHTML={{ __html: css }}
              media={attrs.media}
              data-hydrate={attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
