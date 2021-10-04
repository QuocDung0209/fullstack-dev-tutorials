import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ReactRouterComponent } from './pages/react-router/react-router.component';

export const REACTJS_ROUTES: RouteInfo[] = [
  {
    path: 'how-to-create-and-config-project',
    routerLink: '/how-to-create-and-config-project',
    name: 'Hướng dẫn tạo project ReactJs',
    component: CreateProjectComponent,
  },
  {
    path: 'react-router',
    routerLink: '/react-router',
    name: 'Lazy load và React Router',
    component: ReactRouterComponent,
  },
];
