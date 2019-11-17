import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BackendMock {
    constructor(private http: HttpClient) {

    }

    public static getAllQuestion() {
        const questions = 
        [
            {
                id: 1,
                problemStatement: 'I am a dummy question 10',
                options: ['i am option a1', 'I am option b1', 'I am option c1', 'I am option d1'],
                correctAnswer: 0
            },
            {
                id: 2,
                problemStatement: 'I am a dummy question 2',
                options: ['i am option a2', 'I am option b2', 'I am option c2', 'I am option d2'],
                correctAnswer: 1
            },
           /*  {
                id: 3,
                problemStatement: 'I am a dummy question 3',
                options: ['i am option a3', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 2
            },
            {
                id: 4,
                problemStatement: 'I am a dummy question 4',
                options: ['i am option a4', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 3
            },
            {
                id: 5,
                problemStatement: 'I am a dummy question 5',
                options: ['i am option a5', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 0
            },
            {
                id: 6,
                problemStatement: 'I am a dummy question 6',
                options: ['i am option a6', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 1
            },
            {
                id: 7,
                problemStatement: 'I am a dummy question 7',
                options: ['i am option a7', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 2
            },
            {
                id: 8,
                problemStatement: 'I am a dummy question 8',
                options: ['i am option a8', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 3
            },
            {
                id: 9,
                problemStatement: 'I am a dummy question 9',
                options: ['i am option a9', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 0
            },
            {
                id: 10,
                problemStatement: 'I am a dummy question 10',
                options: ['i am option a10', 'I am option b', 'I am option c', 'I am option d'],
                correctAnswer: 0
            } */
        ]
    return questions;
    }

    public get() : Observable<Object>{
        return this.http.get('http://localhost:8080/rest/users/all');
    }
}