import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRouting } from './auth/auth.routing';
import { ClassroomRouting } from './classroom/classroom.routing';

const routes: Routes = [
  {
    path: '',
    children: [
      ...AuthRouting,
      ...ClassroomRouting
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
