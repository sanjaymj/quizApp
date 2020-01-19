import { Component, OnInit } from '@angular/core';
import { ResultCalculationService } from '../../../services/result-calculation.service';

@Component({
  selector: 'app-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.css']
})
export class ResultChartComponent implements OnInit {

  public showPercentageScore = false;
  public correctAnswerCount = 0;
  public totalNumberOfQuestions = 0;
  public percentageScore = 0;

  constructor(public result: ResultCalculationService) { }

  // ADD CHART OPTIONS.
  pieChartOptions = {
    responsive: true
  };

  pieChartLabels =  ['Correct Answers', 'Incorrect Answers', 'Skipped Answers'];

  // CHART COLOR.
  pieChartColor: any = [
      {
          backgroundColor: ['rgba(30, 169, 224, 0.8)',
                            'rgba(255,165,0,0.9)',
                            'rgba(139, 136, 136, 0.9)'
                          ]
      }
  ];

  pieChartData: any = [
      {
          data: []
      },
  ];

  ngOnInit() {
      this.result.reviewedAnswers$.subscribe(val => {
        this.pieChartData = [
          {
            data: [val.correctAnswerCount, val.incorrectAnswerCount, val.unansweredCount]
          }
        ];
        this.correctAnswerCount = val.correctAnswerCount;
        this.totalNumberOfQuestions = val.correctAnswerCount + val.incorrectAnswerCount + val.unansweredCount;
        this.percentageScore = 100 * (this.correctAnswerCount / this.totalNumberOfQuestions);
      });
  }

  onChartClick(event) {
      this.showPercentageScore = !this.showPercentageScore;
  }
}
