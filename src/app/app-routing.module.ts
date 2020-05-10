import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEmployeeComponent} from './employee/create-employee.component';
import {ListemployeesComponent} from './employee/listemployees.component';


const routes: Routes = [
  {path:'',redirectTo:'/list',pathMatch:'full'},
  {path:'list',component:ListemployeesComponent},
  {path:'create',component:CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //This will make it available for other modules to import
  exports: [RouterModule]
})
export class AppRoutingModule { }
