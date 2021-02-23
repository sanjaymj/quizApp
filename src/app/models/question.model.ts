export class Question {
    index: number;
    problemStatement: String;
    options: String[];
    correctAnswer: number;
    userSelection?: number;
    questionCategory: String;
    questionId: String;
}
