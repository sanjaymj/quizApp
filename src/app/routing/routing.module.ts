import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ContributeComponent } from '../contribute/contribute.component';
import { QuizHomeComponent } from '../quiz/quiz.home.component';
import { ResultScreenComponent } from '../quiz/result-screen/result-screen.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'contribute', component: ContributeComponent},
  { path: 'quiz', component: QuizHomeComponent},
  { path: 'result', component: ResultScreenComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
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
