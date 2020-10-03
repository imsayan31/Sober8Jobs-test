import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from './message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialogData: MatDialog) { }

  showSuccessMessage(msg) {
    this.dialogData.open(MessageDialogComponent, {
      width: '400px',
      panelClass: 'message-success-container',
      /* disableClose: true, */
      hasBackdrop: false,
      /* backdropClass: 'backdropClassTest', */
      data: {
        message: msg
      },
      position: {
        top: '2%',
        right: '2%'
      }
    });
  }

  showErrorMessage(msg) {
    this.dialogData.open(MessageDialogComponent, {
      width: '400px',
      panelClass: 'message-error-container',
      /* disableClose: true, */
      hasBackdrop: false,
      /* backdropClass: 'backdropClassTest', */
      data: {
        message: msg
      },
      position: {
        top: '2%',
        right: '2%'
      }
    });
  }

}
