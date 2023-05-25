import { get, isFunction, isUndefined } from 'lodash';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { useStyletron } from 'styletron-react';
import { OverrideObject } from '@type/component.types';

type LinkOverrides = {
  Root?: OverrideObject<LinkProps>;
};

type LinkProps = {
  target?: HTMLAttributeAnchorTarget;
  isDisabled?: boolean;
  overrides?: LinkOverrides;
  children?: ReactNode;
} & NextLinkProps;

const Link = ({
  href,
  overrides,
  isDisabled = false,
  target = '_self',
  children,
}: LinkProps) => {
  const [css] = useStyletron();

  const overridesStyle = get(overrides, 'Root.style', {});
  const overridesComponent = get(overrides, 'Root.component');
  const overridesProps = get(overrides, 'Root.props', {});

  if (isDisabled) {
    return (
      <span
        className={css({
          ...overridesStyle,
        })}
      >
        {children}
      </span>
    );
  } else {
    if (isUndefined(href)) {
      throw new Error(
        'You must pass valid href when used next.js built in link',
      );
    } else {
      return isFunction(overridesComponent) ? (
        <NextLink href={href} target={target}>
          {overridesComponent({
            style: overridesStyle,
            props: {
              href,
              ...overridesProps,
            },
          })}
        </NextLink>
      ) : (
        <NextLink
          href={href}
          target={target}
          className={css({
            ...overridesStyle,
          })}
        >
          {children}
        </NextLink>
      );
    }
  }
};

export { Link };
export type { LinkProps };
