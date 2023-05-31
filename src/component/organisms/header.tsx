import { useStyletron } from 'styletron-react';
import { border, margin, padding } from 'polished';
import { Link } from '@component/atoms/link';
import { OverrideObject } from '@type/component.types';
import { getOverrideStyle } from '@helper/getOverridesStyle';
import { SearchInput } from '@component/molecules/search/searchInput';

type HeaderOverrides = {
  Root?: Omit<OverrideObject<HeaderProps>, 'component'>;
};

interface HeaderProps {
  overrides?: HeaderOverrides;
}

const Header = ({ overrides }: HeaderProps) => {
  const [css] = useStyletron();

  return (
    <header
      className={css({
        zIndex: 2,
        width: '100%',
        height: '90px',
        display: 'flex',
        position: 'sticky',
        top: 0,
        backgroundColor: '#ffffff',
        ...border('bottom', '1px', 'solid', '#e0e0e0'),
        ...getOverrideStyle(overrides),
      })}
    >
      <div
        className={css({
          display: 'flex',
          columnGap: '48px',
          ...margin('', 'auto'),
          ...padding('16px', '24px'),
        })}
      >
        <section
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <Link href="/">
            <div
              className={css({
                ...padding('4px'),
              })}
            >
              <b
                className={css({
                  fontSize: '36px',
                  lineHeight: '48px',
                })}
              >
                영화목록
              </b>
            </div>
          </Link>
        </section>

        <section
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <SearchInput />
        </section>
      </div>
    </header>
  );
};

export { Header };

// CenterFitWrapper vs CenterWrapper
