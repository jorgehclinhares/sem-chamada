import { Routes } from '@angular/router';
import { ClassroomListComponent } from './list/list.component';
import { AuthGuard } from '../guards/auth.guard';

export const ClassroomRouting: Routes = [
  {
    path: 'classroom',
    component: ClassroomListComponent,
    canActivate: [ AuthGuard ]
  }
];
