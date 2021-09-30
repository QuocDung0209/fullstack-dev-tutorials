import { CSS_ROUTES } from 'src/app/css-tutorials/css-tutorials-routes.constant';
import { JAVASCRIPT_ROUTES } from 'src/app/javascript-tutorials/javascript-tutorials-routes.constant';
import { NODEJS_ROUTES } from 'src/app/nodejs-tutorials/nodejs-tutorials-routes.constant';
import { PYTHON_ROUTES } from 'src/app/python-tutorials/python-tutorials-routes.constant';
import { REACTJS_ROUTES } from 'src/app/reactjs-tutorials/reactjs-tutorials-routes.constant';

export const MAIN_ROUTES = ['reactjs', 'nodejs', 'css', 'python', 'javascript'];

export const MAIN_PAGES: { [name: string]: PageInfo } = {
  reactjs: {
    name: 'ReactJs',
    mainRoute: 'reactjs',
  },
  nodejs: {
    name: 'NodeJs',
    mainRoute: 'nodejs',
  },
  css: {
    name: 'CSS',
    mainRoute: 'css',
  },
  python: {
    name: 'Python',
    mainRoute: 'python',
  },
  javascript: {
    name: 'JavaScript',
    mainRoute: 'javascript',
  },
};

export const PAGE_ROUTES: { [name: string]: RouteInfo[] } = {
  reactjs: REACTJS_ROUTES,
  python: PYTHON_ROUTES,
  nodejs: NODEJS_ROUTES,
  css: CSS_ROUTES,
  javascript: JAVASCRIPT_ROUTES,
};
