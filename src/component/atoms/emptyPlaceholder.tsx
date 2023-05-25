import { useStyletron } from 'styletron-react';
import { StyleObject } from 'styletron-standard';

interface EmptyPlaceholderProps {
  style?: StyleObject;
}

const EmptyPlaceholder = ({ style }: EmptyPlaceholderProps) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        width: '100%',
        flex: 1,
        height: '200px',
        ...style,
      })}
    />
  );
};

export { EmptyPlaceholder };
export type { EmptyPlaceholderProps };
