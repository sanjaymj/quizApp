import { SignInComponent } from './../auth/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ContributeComponent } from '../contribute/contribute.component';
import { QuizHomeComponent } from '../quiz/quiz.home.component';
import { ResultScreenComponent } from '../quiz/result-screen/result-screen.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: SignInComponent},
  { path: 'register', component: SignUpComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'contribute', component: ContributeComponent, canActivate: [AuthGuardService]},
  { path: 'quiz', component: QuizHomeComponent, canActivate: [AuthGuardService]},
  { path: 'result', component: ResultScreenComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule { }
