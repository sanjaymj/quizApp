export class Question {
    id: number;
    problemStatement: String;
    options: String[];
    correctAnswer: number;
    userSelection?: number;
}