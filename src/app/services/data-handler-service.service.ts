import { Injectable } from '@angular/core';
import { BackendMock } from './backend.mock';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState } from '../models/game.state.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerServiceService {

  private questions: Question[] = [];

  private questions$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(this.questions);
  public question$: Observable<Question[]> = this.questions$$.asObservable();

  public currentQuestion$$: BehaviorSubject<Question> = new BehaviorSubject<Question>(this.questions[0]);
  public currentQuestion$: Observable<Question> = this.currentQuestion$$.asObservable();

  public currentQuestion: Question;
  private index: number = 0;

  private gameState$$: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.PLAYING);
  public gameState$: Observable<GameState> = this.gameState$$.asObservable();

  constructor(private http: HttpClient) {
    console.log('I am in datahandler service');
    this.http.get('http://localhost:8080/rest/users/all').subscribe((val: Question[]) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!Getting value', val);
      this.questions = val;
      this.questions$$.next(val);
      this.currentQuestion$$.next(this.questions[0]);
    })
  }

  public getCurrentQuestion() {
     console.log('getCurrentQuestion()');
     this.currentQuestion = this.questions[this.index];
     return this.currentQuestion;
  }

  public incrementIndex() {
    console.log('____in increment index', this.index);
    this.index++;
    if (this.index < this.questions.length) {
      this.currentQuestion$$.next(this.questions[this.index]);
    }
    else {
      this.index = this.questions.length - 1;
      console.log('invalid index');
    }
  }

  public decrementIndex() {
    this.index--;
      if (this.index >= 0) {
          this.currentQuestion$$.next(this.questions[this.index]);
      }
      else {
        this.index = 0;
      }
  }

  public updateUserSelection(index: number, value: number) {
    this.questions[index-1].userSelection = value;
    /* if (index === this.questions.length) {
      this.gameState$$.next(GameState.ANSWERED_ALL_QUESTIONS);
    } */
  }

  public start() {
    this.currentQuestion$$.next(this.questions[0]);
  }
}
