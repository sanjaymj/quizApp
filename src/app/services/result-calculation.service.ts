import { Injectable } from '@angular/core';
import { DataHandlerServiceService } from './data-handler-service.service';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnswerTypeContainer } from '../models/answer.type.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class ResultCalculationService {
    private reviewedAnswers$$: BehaviorSubject<AnswerTypeContainer> = new BehaviorSubject<AnswerTypeContainer>(new AnswerTypeContainer(0, 0, 0));
    public reviewedAnswers$: Observable<AnswerTypeContainer> = this.reviewedAnswers$$.asObservable();

    private incorrectAnswers$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
    public incorrectAnswers$: Observable<Question[]> = this.incorrectAnswers$$.asObservable();

    constructor(private datahandler: DataHandlerServiceService, private http: HttpClient) {
    }

    public review() {
        this.http.get('//localhost:8080/answers/result/5ddac90299729c538a208bbe').subscribe((val: Map<string, number>) => {
            this.reviewedAnswers$$.next(new AnswerTypeContainer(val['correct'],
            val['incorrect'], 0));
        });

        this.http.get('//localhost:8080/answers/result/incorrect/5ddac90299729c538a208bbe').subscribe((val: number[]) => {
            const incorrectAnswerTemp: Question[] = [];
            for (const i of val) {
                incorrectAnswerTemp.push(this.datahandler.questions[i]);
            }
            this.incorrectAnswers$$.next(incorrectAnswerTemp);
        });
    }
  }
