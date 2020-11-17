import { ItemList } from './../Pages/Items/ItemList';
import { ItemFormContainer } from './../Pages/Items/ItemFormContainer';
import { Home } from './../Pages/Home/Home';
import { ItemTable } from './../Pages/Items/ItemTable';
import { ProfileContainer } from './../Pages/Profile/ProfileContainer';

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/item/add',
    component: ItemFormContainer,
    exact: true,
    isEdit: false,
  },
  {
    path: '/item/edit/:id',
    component: ItemFormContainer,
    exact: true,
    isEdit: true,
  },
  {
    path: '/item/list/:page?',
    component: ItemList,
    exact: true,
  },
  {
    path: '/item/table/:page?',
    component: ItemTable,
    exact: true,
  },
  {
    path: '/user/profile/:id?',
    component: ProfileContainer,
    exact: true,
  },
];
