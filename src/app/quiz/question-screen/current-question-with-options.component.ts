import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question.model';
import { DataHandlerServiceService } from '../../services/data-handler-service.service';

@Component({
  selector: 'app-current-question-with-options',
  templateUrl: './current-question-with-options.component.html',
  styleUrls: ['./current-question-with-options.component.css']
})
export class CurrentQuestionWithOptionsComponent {

  @Input()
  question: Question;

  @Input()
  isReviewMode = false;

  constructor(private dataHandler: DataHandlerServiceService) { }

  public updateUserSelection(count: number) {
    this.dataHandler.updateUserSelection(this.question.index, count, this.question.questionId);
  }
}
