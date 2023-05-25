import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';
import { useStyletron } from 'styletron-react';
import { get, merge } from 'lodash';
import { OverrideObject } from '@type/component.types';
import { getOverrideStyle } from '@helper/getOverridesStyle';

type InputOverrides = {
  Root?: Omit<OverrideObject<InputProps>, 'component'>;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  overrides?: InputOverrides;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
}

const Input = ({
  overrides,
  disabled,
  onChange,
  onFocus,
  onBlur,
  value,
  placeholder,
  type = 'text',
  ...props
}: InputProps) => {
  const [css] = useStyletron();

  const internalOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const internalOnFocusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onFocus?.(e);
  };

  const internalOnBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  return (
    <input
      autoComplete={'off'}
      disabled={disabled}
      onChange={internalOnchangeHandler}
      onFocus={internalOnFocusHandler}
      onBlur={internalOnBlurHandler}
      value={value}
      placeholder={placeholder}
      type={type}
      className={css(getOverrideStyle(overrides))}
      {...merge(props, get(overrides, 'Root.props', {}))}
    />
  );
};

export { Input };
export type { InputProps, InputOverrides };
