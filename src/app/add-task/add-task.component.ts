import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/task';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  colors: any = {
    urgent: 'red',
    medium: 'orange',
    low: 'green',
  };
  userId: string | undefined;
  tasks: Task[] = [];
  task: Task = new Task();
  assignedToString: string = '';
  @ViewChild('myForm') myForm: NgForm | undefined;

  constructor(
    private afirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public userService: UsersService
  ) {}

  ngOnInit() {
    this.userService.getUserData();
    this.afAuth.authState.subscribe((user) => {
      this.userId = user?.uid;
    });
  }

  onAssignedToChange() {
    this.task.assignedTo = this.assignedToString;
  }

  onSubmit(form: NgForm) {
    const taskData = this.convertTaskToData(this.task);
    this.afirestore
      .collection('users')
      .doc(this.userId)
      .collection('tasks')
      .add(taskData)
      .then((ref) => {
        ref.id;
        this.updateTaskWithId(ref.id);
      });
    this.submitNewTask(form);
  }

  submitNewTask(form: NgForm) {
    this.task = new Task(
      this.task.id!,
      this.task.title!,
      this.task.description!,
      this.task.board!,
      this.task.assignedTo!,
      this.task.date!,
      this.task.category!,
      this.task.urgency!
    );
    this.assignedToString = '';
    form.reset();
  }

  updateTaskWithId(id: string): Promise<any> {
    const userTasksRef = this.afirestore
      .collection('users')
      .doc(this.userId)
      .collection('tasks');
    return userTasksRef.doc(id).update({ id: id });
  }

  private convertTaskToData(task: Task): any {
    return {
      title: task.title ?? '',
      assignedTo: task.assignedTo ?? '',
      date: task.date ? new Date(task.date).toDateString() : '',
      category: task.category ?? '',
      urgency: task.urgency ?? '',
      description: task.description ?? '',
      id: ''!,
      board: 'todos'!,
    };
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
      test[i].classList.remove('test');
    }
  }

  styleImg(urgency: string) {
    let img = document.getElementById(urgency + 'id') as HTMLDivElement;
    img.classList.add('test');
  }
}
