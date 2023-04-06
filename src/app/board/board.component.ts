import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task';
import { TasksService } from '../services/tasks.service'; 
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  
  constructor(
    private afirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    public taskService: TasksService
  ) {}

  ngOnInit() {
    this.taskService.getUserId();
    this.taskService.getAllTasks();
  }

  openTask(task: any) {
    console.log(task)
    this.dialog.open(TaskDialogComponent, {
      data: { task }
    });
  }

  getUrgencySelected(urgency: string): string {
    return this.taskService.urgency[urgency] || '';
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.changeBoardByDrop(event.item.data, event.container.id);
    }
  }

  changeBoardByDrop(task: any, status: any) {
    if (status === 'cdk-drop-list-0') {
      task.board = 'todos';
    } else if (status === 'cdk-drop-list-1') {
      task.board = 'inprogresss';
    } else if (status === 'cdk-drop-list-2') {
      task.board = 'awaitfeedbacks';
    } else if (status === 'cdk-drop-list-3') {
      task.board = 'dones';
    }
    this.updateTask(task, task.board);
  }

  updateTask(task: any, board: any) {
    this.afirestore
      .collection('users')
      .doc(this.taskService.userId)
      .collection('tasks')
      .doc(task.id)
      .update({ board: board });
  }
}
