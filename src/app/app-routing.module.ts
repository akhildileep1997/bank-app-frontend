import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  // login - localhost:4200/login page
  {
   path:'',component:LoginComponent
  },
  // register - localhost:4200/register
{
 path:'register',component:RegisterComponent
},
// dashboard-localhost:4200/dashboard
{
  path:'dashboard',component:DashboardComponent
},
// transactions: localhost:4200//transactions
{
  path:'transactions',component:TransactionsComponent
},
//pageNotFound:localhost:4200//pageNotfound
{
  path:'**',component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
