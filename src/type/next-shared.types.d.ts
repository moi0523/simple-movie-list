type DefaultGetStaticProps = { dehydratedState: unknown };
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

export type { DefaultGetStaticProps, ArrayElement, Exact };
