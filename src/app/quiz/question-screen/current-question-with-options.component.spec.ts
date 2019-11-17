import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentQuestionWithOptionsComponent } from './current-question-with-options.component';

describe('QuestionScreenComponent', () => {
  let component: CurrentQuestionWithOptionsComponent;
  let fixture: ComponentFixture<CurrentQuestionWithOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentQuestionWithOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentQuestionWithOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
