import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  task: any;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) {
    this.task = data.task;
  }

  openTask(task: any) {
    console.log(task)
    this.dialog.open(EditTaskComponent, {
      data: { task }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
