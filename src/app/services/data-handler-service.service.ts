import { Injectable } from '@angular/core';
import { BackendMock } from './backend.mock';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState } from '../models/game.state.model';
import { HttpClient } from '@angular/common/http';
import { UserCOllection } from '../models/userCollection.model';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerServiceService {

  public questions: Question[] = [];
  private answers: Map<number, number> = new Map();

  private questions$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(this.questions);
  public question$: Observable<Question[]> = this.questions$$.asObservable();

  public currentQuestion$$: BehaviorSubject<Question> = new BehaviorSubject<Question>(this.questions[0]);
  public currentQuestion$: Observable<Question> = this.currentQuestion$$.asObservable();

  public currentUserSelection$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public currentUserSelection$: Observable<number> = this.currentUserSelection$$.asObservable();


  public currentQuestion: Question;
  private index: number = 1;

  private gameState$$: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.PLAYING);
  public gameState$: Observable<GameState> = this.gameState$$.asObservable();


  private url = 'http://localhost:8080/questions/';
  private answerUrl = 'http://localhost:8080/answers/user/5ddac90299729c538a208bbe';
  constructor(private http: HttpClient) {
    console.log('I am in datahandler service');
    this.http.get(this.url).subscribe((val: Question[]) => {
      this.questions = val;
      this.questions$$.next(val);
      this.currentQuestion$$.next(this.questions[0]);
    });

    this.http.get(this.answerUrl).subscribe((val: Map<number, number>) => {
      this.answers = val;
      this.currentUserSelection$$.next(this.answers[this.index]);
    })
  }

  public getCurrentQuestion() {
     this.currentQuestion = this.questions[this.index];
     return this.currentQuestion;
  }

  public incrementIndex() {
    this.index++;
    if (this.index <= this.questions.length) {
      this.currentQuestion$$.next(this.questions[this.index-1]);
      this.currentUserSelection$$.next(this.answers[this.index]);
    }
    else {
      this.index = this.questions.length - 1;
      console.log('invalid index');
    }
  }

  public decrementIndex() {
    this.index--;
      if (this.index >= 1) {
          this.currentQuestion$$.next(this.questions[this.index-1]);
          this.currentUserSelection$$.next(this.answers[this.index]);
      }
      else {
        this.index = 1;
      }
  }

  public updateUserSelection(index: number, value: number) {
    this.questions[index-1].userSelection = value;
    this.answers[index] = value;
    let user = new UserCOllection();
    user.index = 5;
    user.answers = this.answers;
  }

  public start() {
    this.currentQuestion$$.next(this.questions[0]);
  }

  public updateDB() {
    let user = new UserCOllection();
    user.index = 5;
    user.answers = this.answers;
    user.evaluatedAnswers = {
      correct: 0,
      incorrect: 0,
      unanswered: 0
    }
    this.http.put('http://localhost:8080/answers/update/5ddac90299729c538a208bbe', user).subscribe();
  }
}
