interface RouteInfo {
  path: string;
  routerLink: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

interface PageRoute {
  routerLink: string;
  name: string;
}

interface PageInfo {
  name: string;
  mainRoute: string;
}
