import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    {path:'', component: LandingpageComponent},
    {path:'signin', component: SigninComponent},
    {path:'signup', component: SignupComponent},
    {
        path:"dashboard", children:[
            {path:"", component:DashboardComponent},
        ],canActivate:[authGuardGuard]
    },
];
