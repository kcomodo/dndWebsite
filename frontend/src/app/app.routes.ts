import { Routes } from '@angular/router';
import { LandingPageComponent } from '../app/components/landingpage/landingpage.component';
import { LoginComponent } from '../app/components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CharacterComponent } from './components/character/character.component';
export const routes: Routes = [
  {
    path: 'landingpage',
    component:LandingPageComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'character',
    component: CharacterComponent
  },
  {
    path: 'signup',
    component:SignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: 'landingpage',
    pathMatch: 'full'
  }
];
