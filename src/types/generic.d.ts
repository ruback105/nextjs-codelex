export type Layout = "default";

export type NextCustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  layout: Layout;
};
