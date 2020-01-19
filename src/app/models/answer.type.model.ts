export class AnswerTypeContainer {
    correctAnswerCount: number;
    incorrectAnswerCount: number;
    unansweredCount:number;

    constructor(correct: number, incorrect: number, unanswered: number) {
        this.correctAnswerCount = correct;
        this.incorrectAnswerCount = incorrect;
        this.unansweredCount = unanswered; 
    }
}