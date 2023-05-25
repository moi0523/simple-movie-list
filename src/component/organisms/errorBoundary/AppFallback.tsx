import { ComponentType } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { EmptyPage } from '../emptyPage';

export const AppFallback: ComponentType<FallbackProps> = (props) => (
  <EmptyPage desc="예기치 못한 에러가 발생했습니다." {...props} />
);
