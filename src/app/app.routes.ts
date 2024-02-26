import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterVisitorComponent } from './components/register-visitor/register-visitor.component';
import { querieComponent } from './components/querie/querie.component';
import { EntryComponent } from './components/entry/entry.component';
import { verifyTokenGuard } from './guards/verify-token.guard';
import { RegisterMedicComponent } from './components/register-medic/register-medic.component';
import { ApplicationComponent } from './components/application/application.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [verifyTokenGuard] },
  {
    path: 'register-visitor',
    component: RegisterVisitorComponent,
    canActivate: [verifyTokenGuard],
  },
  {
    path: 'register-medic',
    component: RegisterMedicComponent,
    canActivate: [verifyTokenGuard],
  },
  {
    path: 'querie',
    component: querieComponent,
    canActivate: [verifyTokenGuard],
  },
  {
    path: 'app',
    component: ApplicationComponent,
    canActivate: [verifyTokenGuard],
  },
  { path: 'entry', component: EntryComponent, canActivate: [verifyTokenGuard] },
  { path: '**', redirectTo: 'login' },
];
