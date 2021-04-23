import { Component, OnInit } from '@angular/core';
import { DataHandlerServiceService } from 'src/app/services/data-handler-service.service';

@Component({
  selector: 'app-quiz-category-list',
  templateUrl: './quiz-category-list.component.html',
  styleUrls: ['./quiz-category-list.component.css']
})
export class QuizCategoryListComponent {

  constructor(public dataHandler: DataHandlerServiceService) {}

}
