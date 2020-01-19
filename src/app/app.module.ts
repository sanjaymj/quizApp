import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MaterialModule } from './material/material.module';
import { ContributeComponent } from './contribute/contribute.component';
import { QuizHomeComponent } from './quiz/quiz.home.component';
import { DataHandlerServiceService } from './services/data-handler-service.service';
import { ResultCalculationService } from './services/result-calculation.service';
import { CurrentQuestionWithOptionsComponent } from './quiz/question-screen/current-question-with-options.component';
import { QuestionComponent } from './quiz/question-screen/question/question.component';
import { OptionsComponent } from './quiz/question-screen/options/options.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BackendMock } from './services/backend.mock';
import { ResultScreenComponent } from './quiz/result-screen/result-screen.component';
import { ChartsModule } from 'ng2-charts';
import { ResultChartComponent } from './quiz/result-screen/result-chart/result-chart.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContributeComponent,
    QuizHomeComponent,
    CurrentQuestionWithOptionsComponent,
    QuestionComponent,
    OptionsComponent,
    ResultScreenComponent,
    ResultChartComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [DataHandlerServiceService, ResultCalculationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
