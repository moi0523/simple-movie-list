import { ComponentType } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useStyletron } from 'styletron-react';

const EmptyPage: ComponentType<FallbackProps & { desc: string }> = ({
  resetErrorBoundary,
  desc,
}) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: 'flex',
        width: 'var(--100vw)',
        height: 'var(--100vh)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      })}
    >
      <p>
        {desc}
        <br />
        잠시후 재시도 해주세요.
      </p>
      <button
        className={css({
          background: '#000',
          color: '#fff',
          padding: '8px 0',
          marginBottom: '30px',
          width: '60%',
          marginTop: '10px',
        })}
        onClick={() => resetErrorBoundary()}
      >
        재시도
      </button>
    </div>
  );
};

export { EmptyPage };
