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

  selectedValue: string = '';

  onButtonClick(value: string) {
    if (this.selectedValue !== value) {
      this.selectedValue = value;
      console.log(this.selectedValue);
    }
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
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
    this.resetStyle();
    this.resetStyleBg()
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
    }
  }

  styleImg(urgency: string) {
    this.resetStyleBg();
    switch (urgency) {
      case 'urgent':
        let urgentStyle = document.getElementById(urgency + 'id') as HTMLDivElement;
        urgentStyle.classList.add('test');
        break;
        case 'medium':
        let mediumStyle = document.getElementById(urgency + 'id') as HTMLDivElement;
        mediumStyle.classList.add('test');
        break;
        case 'low':
        let lowStyle = document.getElementById(urgency + 'id') as HTMLDivElement;
        lowStyle.classList.add('test');
        break;
    }
  }

  resetStyleBg() {
    let urgent = document.getElementById('urgentid') as HTMLDivElement;
    let medium = document.getElementById('mediumid') as HTMLDivElement;
    let low = document.getElementById('lowid') as HTMLDivElement;
    urgent.classList.remove('test')
    medium.classList.remove('test')
    low.classList.remove('test')
  }
}
