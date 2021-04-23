import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})

export class AlertBoxComponent {
  @Input() public textContent: string;
  @Output() public completion: EventEmitter<boolean> = new EventEmitter();
  constructor() {
  }

  onNoClick(): void {
    console.log("here");
    this.completion.emit(false);
  }

  onSubmit(): void {
    console.log("here");
    this.completion.emit(true);
  }

}
