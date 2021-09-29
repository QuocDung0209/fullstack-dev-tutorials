import { Component } from '@angular/core';

const routes = [
  {
    path: '/reactjs',
    name: 'ReactJs',
  },
  {
    path: '/nodejs',
    name: 'Nodejs',
  },
  {
    path: '/css',
    name: 'CSS',
  },
  {
    path: '/python',
    name: 'Python',
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  headerLinks = routes;
}
