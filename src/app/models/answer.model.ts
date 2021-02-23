export class Answer {
  id: number;
  questionAnswerMapper: QuestionAnswerMapper[];
}

export class QuestionAnswerMapper {
  questionNumber: String;
  userSelection: number;
}
