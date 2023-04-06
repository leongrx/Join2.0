import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Task } from 'src/models/task';
import { UsersService } from '../services/users.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  colors: any = {
    urgent: 'red',
    medium: 'orange',
    low: 'green',
  };
  task: Task;
  selectedUser: any = [];
  selectedUsers: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public userService: UsersService
  ) {
    this.task = data.task;
  }

  ngOnInit() {
    this.userService.getUserData();
    setTimeout(() => {
      this.getSelectedUser();
    }, 500);
  }

  getSelectedUser() {
    this.selectedUsers = this.userService.userList.map((user) => {
      let test = user.firstName + ' ' + user.lastName;
      this.selectedUsers.push(test)
    });
    console.log(this.selectedUsers);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  hover(urgency: string) {
    let color = this.colors[urgency];
    let option = document.getElementById(urgency) as HTMLDivElement;
    option.style.borderBottom = `2px solid ${color}`;
  }

  hoverEnd(urgency: string) {
    let option = document.getElementById(urgency) as HTMLDivElement;
    option.style.borderBottom = `2px solid white`;
  }

  clicked(urgency: string) {
    let color = this.colors[urgency];
    this.resetStyle();
    this.styleOption(urgency, color);
    this.styleImg(urgency);
  }

  styleOption(urgency: string, color: string) {
    let option = document.getElementById(urgency) as HTMLDivElement;
    option.style.backgroundColor = color;
    option.style.borderBottom = `2px solid ${color}`;
    option.style.color = 'white';
  }

  resetStyle() {
    let test = document.getElementsByClassName(
      'add-task-urgency-button'
    ) as HTMLCollectionOf<HTMLDivElement>;
    for (let i = 0; i < test.length; i++) {
      test[i].style.color = 'black';
      test[i].style.borderBottom = 'white';
      test[i].style.backgroundColor = 'white';
    }
  }

  styleImg(urgency: string) {
    this.resetStyleBg();
    switch (urgency) {
      case 'urgent':
        let urgentStyle = document.getElementById(
          urgency + 'id'
        ) as HTMLDivElement;
        urgentStyle.classList.add('test');
        break;
      case 'medium':
        let mediumStyle = document.getElementById(
          urgency + 'id'
        ) as HTMLDivElement;
        mediumStyle.classList.add('test');
        break;
      case 'low':
        let lowStyle = document.getElementById(
          urgency + 'id'
        ) as HTMLDivElement;
        lowStyle.classList.add('test');
        break;
    }
  }

  resetStyleBg() {
    let urgent = document.getElementById('urgentid') as HTMLDivElement;
    let medium = document.getElementById('mediumid') as HTMLDivElement;
    let low = document.getElementById('lowid') as HTMLDivElement;
    urgent.classList.remove('test');
    medium.classList.remove('test');
    low.classList.remove('test');
  }
}
