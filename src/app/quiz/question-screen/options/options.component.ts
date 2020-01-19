import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataHandlerServiceService } from 'src/app/services/data-handler-service.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  @Input()
  index: number;

  @Input()
  options: string[];

  @Input()
  userSelection: number;

  @Input()
  isReviewMode = false;

  @Input()
  correctAnswer = 0;

  @Output()
  userSelectedIndex: EventEmitter<number> = new EventEmitter<number>();

  constructor(private dataHandler: DataHandlerServiceService) {
    this.dataHandler.currentQuestion$.subscribe(val => this.userSelection = val.userSelection);
    this.dataHandler.currentUserSelection$.subscribe((val: number) => {
      if (val !== undefined) {
        this.userSelection = val;
      }
    });
  }

  public emitUserSelection() {
    this.userSelectedIndex.emit(this.userSelection);
  }
}
