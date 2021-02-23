import { Component, OnInit } from '@angular/core';
import { DataHandlerServiceService } from 'src/app/services/data-handler-service.service';

@Component({
  selector: 'app-quiz-category-list',
  templateUrl: './quiz-category-list.component.html',
  styleUrls: ['./quiz-category-list.component.css']
})
export class QuizCategoryListComponent implements OnInit {

  constructor(public dataHandler: DataHandlerServiceService) {
    console.log("again here")
   }

  ngOnInit() {
    this.dataHandler.questionCategories$.subscribe(val => {
      console.log(val);
    });
  }

}
