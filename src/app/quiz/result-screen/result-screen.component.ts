import { Component, OnInit } from '@angular/core';
import { ResultCalculationService } from '../../services/result-calculation.service';

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.css']
})
export class ResultScreenComponent {

  constructor(public result: ResultCalculationService) { }  
}
