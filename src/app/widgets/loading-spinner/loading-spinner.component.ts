import { Component, Input, OnInit } from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  @Input() isLoading = false;
  constructor() { }

  ngOnInit() {
  }

}
