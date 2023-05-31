import { useStyletron } from 'styletron-react';
import { border, padding } from 'polished';
import { Input } from '@component/atoms/input';
import { useSearchMovie } from '@hook/useSearchMovie';
import { debounce } from 'lodash';
import { SearchText } from '@component/atoms/search/searchText';
import { useState } from 'react';

const SearchInput = () => {
  const [css] = useStyletron();
  const {
    value: searchValue,
    setSearchValue,
    getSearchList,
  } = useSearchMovie();
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div
      className={css({
        position: 'relative',
      })}
    >
      <article
        className={css({
          display: 'flex',
          width: '450px',
        })}
      >
        <Input
          overrides={{
            Root: {
              style: {
                width: '100%',
                fontsize: '18px',
                lineHeight: '24px',
                ...padding('16px', '', '16px', '16px'),
                ...border('1px', 'solid', isFocus ? '#333333' : '#e0e0e0'),
              },
            },
          }}
          placeholder="영화명을 입력해주세요"
          onChange={debounce((e) => {
            const { value } = e.target;

            setSearchValue(value);
          }, 300)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              const { value } = e.target as HTMLInputElement;

              setSearchValue(value);
            }
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsFocus(false);
            }, 150);
          }}
        />
      </article>
      {searchValue && isFocus && (
        <section
          className={css({
            position: 'absolute',
            top: '64px',
            width: '100%',
            backgroundColor: '#ffffff',
            zIndex: 2,
            ...border('1px', 'solid', '#e0e0e0'),
            ...padding('4px'),
          })}
        >
          {getSearchList()?.map((item, index) => (
            <SearchText
              key={`${item.title}-${index}`}
              id={item.id}
              value={searchValue}
              data={item}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export { SearchInput };
