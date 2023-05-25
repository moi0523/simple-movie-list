import { ReactNode, SyntheticEvent } from 'react';
import { useStyletron } from 'styletron-react';
import { get, merge } from 'lodash';
import { OverrideObject } from '@type/component.types';
import { getOverrideStyle } from '@helper/getOverridesStyle';

type ButtonOverrides = {
  Root?: Omit<OverrideObject<ButtonProps>, 'component'>;
};

interface ButtonProps {
  /**
   * atom component has no component overriding
   * */
  overrides?: ButtonOverrides;
  onClick?: (e: SyntheticEvent) => void;
  type?: 'submit' | 'reset' | 'button';
  children?: ReactNode;
}

const Button = ({ overrides, onClick, children, ...props }: ButtonProps) => {
  const [css] = useStyletron();

  return (
    <button
      onClick={onClick}
      className={css(getOverrideStyle<ButtonProps>(overrides))}
      {...merge(props, get(overrides, 'Root.props', {}))}
    >
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps, ButtonOverrides };
