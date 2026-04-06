import { Routes } from '@angular/router';
import { RegidtrationFormComponent } from './regidtration-form/regidtration-form.component';
import { WaitingpageComponent } from './waitingpage/waitingpage.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TokenstatusComponent } from './tokenstatus/tokenstatus.component';
import { UsercomponentComponent } from './usercomponent/usercomponent.component';
import { EnduserComponent } from './enduser/enduser.component';


export const routes: Routes = [
     { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  // {path:'home',component:HomeComponent} ,// default redirect
  
  // { path: 'registration', component: RegidtrationFormComponent },
  // { path: 'waitingpage', component: WaitingpageComponent },
  // { path: '**', redirectTo: 'login' }
{
    path: '',
    component: HomeComponent,
    children: [
      { path: 'registration', component: RegidtrationFormComponent },
      { path: 'waitingpage', component: WaitingpageComponent },
      {path:'tokenstatus',component:TokenstatusComponent},
      {path:'users',component:UsercomponentComponent},
      {path:'endusers',component:EnduserComponent}
    ]
  },
  { path: '**', redirectTo: 'login' }
];
