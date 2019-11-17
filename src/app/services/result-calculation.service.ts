import { Injectable } from '@angular/core';
import { DataHandlerServiceService } from './data-handler-service.service';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnswerTypeContainer } from '../models/answer.type.model';

@Injectable({
    providedIn: 'root'
  })
  export class ResultCalculationService {
    private correctAnswers$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public correctAnswers$: Observable<number> = this.correctAnswers$$.asObservable();

    private reviewedAnswers$$: BehaviorSubject<AnswerTypeContainer> = new BehaviorSubject<AnswerTypeContainer>(new AnswerTypeContainer(0,0,0));
    public reviewedAnswers$: Observable<AnswerTypeContainer> = this.reviewedAnswers$$.asObservable();

    private incorrectAnswers$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
    public incorrectAnswers$: Observable<Question[]> = this.incorrectAnswers$$.asObservable();

    private static correctAnswers: number;
    private static incorrectAnswers: number;
    private static unAnswered: number;
    
    constructor(private datahandler: DataHandlerServiceService) {
        console.log('I am in result calculation service');
    }

    public review() {
        this.datahandler.question$.subscribe((val: Question[]) => {
            const incorrectAnswerTemp: Question[] = [];
            ResultCalculationService.correctAnswers = 0;
            ResultCalculationService.incorrectAnswers = 0;
            ResultCalculationService.unAnswered = 0;
            for(const question of val) {
                console.log('##############review()', question);
                if (question.userSelection === undefined || question.userSelection === null) {
                    ResultCalculationService.unAnswered++;
                }else if (question.correctAnswer === question.userSelection) {
                    ResultCalculationService.correctAnswers++;
                } else {
                    ResultCalculationService.incorrectAnswers++
                    incorrectAnswerTemp.push(question);
                } 
            }
            console.log('__in review', ResultCalculationService.incorrectAnswers) ;
            this.reviewedAnswers$$.next(new AnswerTypeContainer(ResultCalculationService.correctAnswers,
                ResultCalculationService.incorrectAnswers,ResultCalculationService.unAnswered));
            this.incorrectAnswers$$.next(incorrectAnswerTemp);
        });
    }
  }