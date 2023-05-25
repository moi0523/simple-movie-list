import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useKey, useMount } from 'react-use';
import { useStyletron } from 'styletron-react';
import { isNull } from 'lodash';
import { OverrideObject } from '@type/component.types';
import { StyledWithPortalBackgroundHolder } from '@HOC/withPortal.styled';
import { isBrowserContext } from '@helper/isBrowserContext';
import { getOverrideStyle } from '@helper/getOverridesStyle';

type WithPortalOverrides = {
  Root?: Omit<OverrideObject<WithPortalProps>, 'component'>;
};

interface WithPortalProps {
  node?: Element | null;
  targetId?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isDimBlocked?: boolean;
  children: ReactNode;
  overrides?: WithPortalOverrides;
}

const WithPortal = ({
  targetId = 'LayersContainer',
  children,
  node,
  isOpen,
  setIsOpen,
  isDimBlocked = false,
  overrides,
}: WithPortalProps) => {
  const [css] = useStyletron();
  const [didMounted, setDidMounted] = useState(false);
  useKey('Escape', () => {
    setIsOpen(false);
  });

  useMount(() => {
    setDidMounted(true);
  });

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isBrowserContext() || !isOpen) {
    return null;
  }

  const detectedTargetNode = node ?? document.getElementById(targetId);

  if (isNull(detectedTargetNode)) {
    return null;
  }

  return didMounted
    ? createPortal(
        <StyledWithPortalBackgroundHolder
          id="backgroundHolder"
          className={css(getOverrideStyle(overrides))}
          onClick={(event: SyntheticEvent) => {
            if (!isDimBlocked && (event.target as HTMLDivElement).id) {
              setIsOpen(false);
            }
          }}
        >
          {children}
        </StyledWithPortalBackgroundHolder>,
        detectedTargetNode,
      )
    : null;
};

export { WithPortal };
export type { WithPortalProps };
