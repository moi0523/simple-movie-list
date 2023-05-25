import { FunctionComponent, PropsWithChildren } from 'react';
import { StyleObject } from 'styletron-react';

type StyleOverride<Props> =
  | StyleObject
  | ((props: { $theme: never } & PropsWithChildren<Props>) => StyleObject);

interface OverrideObject<Props> {
  component?: FunctionComponent<OverrideObject<Props>>;
  props?: Props;
  style?: StyleOverride<Props>;
}
