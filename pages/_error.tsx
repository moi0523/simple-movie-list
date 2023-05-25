import { NextPage } from 'next';
import NextErrorComponent, { ErrorProps } from 'next/error';

interface AppErrorProps extends ErrorProps {
  err?: Error;
  hasGetInitialPropsRun?: boolean;
}

const Error: NextPage<AppErrorProps> = ({ statusCode }) => {
  return <NextErrorComponent statusCode={statusCode} />;
};

Error.getInitialProps = async (context) => {
  const errorInitialProps: AppErrorProps =
    await NextErrorComponent.getInitialProps(context);

  const { res, err } = context;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return errorInitialProps;
  }

  if (err) {
    return errorInitialProps;
  }

  return errorInitialProps;
};

export default Error;
