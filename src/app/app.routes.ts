import { Routes } from '@angular/router';
import { ShareComponent } from './share/share.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

export const routes: Routes = [
  { path: '', component: ShareComponent },
  { path: 'admin', component: ResourceListComponent },
];
