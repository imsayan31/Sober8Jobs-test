import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<MessageDialogComponent>) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
