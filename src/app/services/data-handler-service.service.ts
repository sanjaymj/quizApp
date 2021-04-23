import { Answer, QuestionAnswerMapper } from './../models/answer.model';
import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { GameState } from '../models/game.state.model';
import { HttpClient } from '@angular/common/http';
import { UserCOllection } from '../models/userCollection.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerServiceService {

  public questions: Question[] = [];
  private answers: Answer = new Answer();

  private questions$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(this.questions);
  public question$: Observable<Question[]> = this.questions$$.asObservable();

  public currentQuestion$$: BehaviorSubject<Question> = new BehaviorSubject<Question>(this.questions[0]);
  public currentQuestion$: Observable<Question> = this.currentQuestion$$.asObservable();

  public currentUserSelection$$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public currentUserSelection$: Observable<number> = this.currentUserSelection$$.asObservable();

  public questionCategories$$: Subject<String[]> = new BehaviorSubject<String[]>([""]);
  public questionCategories$: Observable<String[]> = this.questionCategories$$.asObservable();

  private currentCategory: String;

  public currentQuestion: Question;
  private index: number = 1;

  private gameState$$: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.PLAYING);
  public gameState$: Observable<GameState> = this.gameState$$.asObservable();


  private url = environment.questionsApi + 'questions/';
  private categoryUrl = environment.questionsApi + 'questions/getAllCategories';
  private answerUrl = environment.questionsApi + 'answers/';

  constructor(private http: HttpClient) {
    this.answers.id = 10;
    this.answers.questionAnswerMapper = [];

    /*this.http.get(this.url).subscribe((val: Question[]) => {
      this.questions = val;
      this.questions$$.next(val);
      this.currentQuestion$$.next(this.questions[0]);
    });*/

    this.http.get(this.categoryUrl).subscribe((val: String[]) => this.questionCategories$$.next(val));
  }

  public getCurrentQuestion() {
    this.currentQuestion = this.questions[this.index];
    return this.currentQuestion;
  }

  public incrementIndex() {
    this.index++;
    if (this.index <= this.questions.length) {
      this.currentQuestion$$.next(this.questions[this.index - 1]);

      const val = this.answers.questionAnswerMapper.findIndex(val => val.questionNumber === this.questions[this.index-1].questionId);

      if (val !== -1) {
        this.currentUserSelection$$.next(this.answers.questionAnswerMapper[val].userSelection);
      } else {
        this.currentUserSelection$$.next(val);
      }
    } else {
      this.index = this.questions.length - 1;
    }
  }

  public decrementIndex() {
    this.index--;
    if (this.index >= 1) {
      this.currentQuestion$$.next(this.questions[this.index - 1]);
      const val = this.answers.questionAnswerMapper.findIndex(val => val.questionNumber === this.questions[this.index-1].questionId);

      if (val !== -1) {
        this.currentUserSelection$$.next(this.answers.questionAnswerMapper[val].userSelection);
      } else {
        this.currentUserSelection$$.next(val);
      }
      //this.currentUserSelection$$.next(this.answers.questionAnswerMapper[this.index].userSelection);
    } else {
      this.index = 1;
    }
  }

  public updateUserSelection(index: number, value: number, questionId: String) {

    this.questions[index - 1].userSelection = value;
    const questionAnswerMapper: QuestionAnswerMapper = {
      questionNumber: questionId,
      userSelection: value
    };


    const itemIndex = this.answers.questionAnswerMapper.findIndex((el) => el.questionNumber === questionId);
    if (itemIndex === -1) {
      this.answers.questionAnswerMapper.push(questionAnswerMapper);
    } else {
      this.answers.questionAnswerMapper[index-1] = questionAnswerMapper;
    }
    console.log(this.answers);

  }

  public updateGameState(state: GameState) {
    this.gameState$$.next(state);
  }

  public start() {
    this.currentQuestion$$.next(this.questions[0]);
  }

  public updateDB() {
    function mapToObj(inputMap) {
      let obj = {};

      inputMap.forEach(function(value, key){
          obj[key] = value
      });

      return obj;
  }

    console.log("update db");
    console.log(this.answers);
    const dto = new Map<String, number>();

    this.answers.questionAnswerMapper.forEach((val) => {
      dto.set(val.questionNumber, val.userSelection);
    })

    const valToUpdateInDB = {
      "category": this.currentCategory,
      "questionAnswerMapper": mapToObj(dto)
  };


  this.gameState$$.next(GameState.ANSWERED_ALL_QUESTIONS);
  return this.http.post(this.answerUrl, valToUpdateInDB).toPromise();
  }

  public getAllQuestionsbyCategories(category: String) {
    this.currentCategory = category;
    let tempCount = 1;
     this.http.get(this.url + "/category/" +category).subscribe((val: Question[]) => {
       this.questions = val.map(item => {
        item.questionId = item.index.toString();
        item.index = tempCount++;
        return item;
      });
      this.questions$$.next(val);
      this.currentQuestion$$.next(this.questions[0]);
    });
  }

  public createNewQuiz(questions) {
   this.http.post(this.url, questions).subscribe(val => console.log(val));
  }
}
