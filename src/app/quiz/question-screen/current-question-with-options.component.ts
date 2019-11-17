import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question.model';
import { DataHandlerServiceService } from '../../services/data-handler-service.service';

@Component({
  selector: 'app-current-question-with-options',
  templateUrl: './current-question-with-options.component.html',
  styleUrls: ['./current-question-with-options.component.css']
})
export class CurrentQuestionWithOptionsComponent implements OnInit {

  @Input()
  question: Question;

  @Input()
  isReviewMode = false;
  
  constructor(private dataHandler: DataHandlerServiceService) { }

  ngOnInit() {
  }

  public updateUserSelection(count) {
   this.dataHandler.updateUserSelection(this.question.id, count);
    console.log('Updating user selection');
  }

}
