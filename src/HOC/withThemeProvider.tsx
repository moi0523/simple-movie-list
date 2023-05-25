import { NextPage } from 'next';
import { ReactNode } from 'react';
import { useStyletron } from 'styletron-react';

interface ThemeChangerProps {
  children: ReactNode;
}

const WithThemeProvider: NextPage<ThemeChangerProps> = ({ children }) => {
  const [css] = useStyletron();

  return (
    <div
      id="variableWrapper"
      className={css({
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        backgroundColor: 'var(--base-background-color)',
        color: 'var(--base-font-color)',
        width: 'inherit',
        height: 'inherit',
      })}
    >
      <main
        id="AppContainer"
        className={css({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: 'inherit',
          height: 'inherit',
          paddingBottom: 'var(--app-bottommost-padding)',
        })}
      >
        {children}
      </main>
      <div id="LayersContainer" />
    </div>
  );
};

export { WithThemeProvider };
