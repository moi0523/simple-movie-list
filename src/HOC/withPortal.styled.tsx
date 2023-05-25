import { position } from 'polished';
import { styled } from 'styletron-react';

export const StyledWithPortalBackgroundHolder = styled('div', {
  background: 'rgba(0, 0, 0, 0.3)',
  position: 'fixed',
  ...position('0', '0', '0', '0'),
  zIndex: 10,
});
