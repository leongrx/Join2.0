import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public todo: Task[] = [];
  public inprogress: Task[] = [];
  public awaitfeedback: Task[] = [];
  public done: Task[] = [];
  public date = [];
  tasks: Task[] = [];
  [key: string]: any;
  tasksSubscription: Subscription | undefined;
  userId: string | undefined;
  taskurgent: number = 0;
  tasktodo: number = 0;
  taskinboard: number = 0;
  taskinprogress: number = 0;
  taskawaitfeedback: number = 0;
  taskdone: number = 0;
  deadline!: string;

  colors: any = {
    design: '#FF7A00',
    sales: '#FC71FF',
    backoffice: '#1FD7C1',
    marketing: '#0038FF',
  };

  boards: any = [
    {
      todos: 'todos',
      inprogresss: 'inprogresss',
      awaitfeedbacks: 'awaitfeedbacks',
      dones: 'dones',
    },
  ];

  urgency: any = {
    urgent: './assets/img/Urgent.svg',
    medium: './assets/img/Medium.svg',
    low: './assets/img/Urgency-low.svg',
  };

  constructor(
    private afirestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  getUserId() {
    this.afAuth.authState.subscribe((user) => {
      this.userId = user!.uid;
    });
  }

  getAllTasks() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.tasksSubscription = this.afirestore
          .collection('users')
          .doc(user.uid)
          .collection('tasks')
          .valueChanges()
          .pipe(
            map((tasks: any) => tasks.map((task: any) => this.setNewTask(task)))
          )
          .subscribe((tasks: Task[]) => {
            this.tasks = tasks;
            this.getBoard();
            this.setSummary(tasks);
            this.getAllDates(tasks);
          });
      }
    });
  }

  getAllDates(tasks: any) {
    const today = new Date();
    let minDiff = Infinity;
    tasks.forEach((task: { date: string }) => {
      const date: Date = new Date(task.date);
      const diff = date.getTime() - today.getTime();
      if (diff >= 0 && diff < minDiff) {
        minDiff = diff;
        let months: any = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        let month: number = date.getMonth();
        month = months[month];
        const day: number = date.getDate();
        const year: number = date.getFullYear();
        this.deadline = month + ' ' + day + ', ' + year;
      }
    });
  }

  setNewTask(task: {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    board: string | undefined;
    assignedTo: string | undefined;
    date: string | undefined;
    category: string | undefined;
    urgency: string | undefined;
  }): Task {
    return new Task(
      task.id,
      task.title,
      task.description,
      task.board,
      task.assignedTo,
      task.date,
      task.category,
      task.urgency
    );
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  getBoard() {
    this.emptyTasks();
    this.tasks.forEach((task: Task) => {
      this.ifGetBoard(task);
      this.pushToCategory(task);
    });
  }

  emptyTasks() {
    this.todo = [];
    this.inprogress = [];
    this.awaitfeedback = [];
    this.done = [];
  }

  ifGetBoard(task: Task) {
    this.boards.forEach(() => {
      let currentBoard = task.board;
      if (currentBoard && this.boards[0][currentBoard] == currentBoard) {
        this[currentBoard] = true;
      }
    });
  }

  setSummary(tasks: Task[]) {
    this.clearSummaryLength();
    tasks.forEach((task) => {
      this.taskinboard++;
      if (task.urgency == 'urgent') {
        this.taskurgent++;
      }
      if (task.board == 'todos') {
        this.tasktodo++;
      }
      if (task.board == 'inprogresss') {
        this.taskinprogress++;
      }
      if (task.board == 'awaitfeedbacks') {
        this.taskawaitfeedback++;
      }
      if (task.board == 'done') {
        this.taskdone++;
      }
    });
  }

  clearSummaryLength() {
    this.taskurgent = 0;
    this.taskinboard = 0;
    this.tasktodo = 0;
    this.taskinprogress = 0;
    this.taskawaitfeedback = 0;
    this.taskdone = 0;
  }

  pushToCategory(task: Task) {
    if (task.board == 'todos') {
      this.todo.push(task);
    } else if (task.board == 'inprogresss') {
      this.inprogress.push(task);
    } else if (task.board == 'awaitfeedbacks') {
      this.awaitfeedback.push(task);
    } else {
      this.done.push(task);
    }
    setTimeout(() => {
      this.setCategoryBackground();
    }, 1);
  }

  setCategoryBackground() {
    const elements: NodeListOf<HTMLElement> =
      document.querySelectorAll('.board-task-title');
    for (let i = 0; i < elements.length; i++) {
      const textContent = elements[i].textContent;
      if (textContent !== null) {
        const color = this.colors[textContent];
        elements[i].style.backgroundColor = `${color}`;
        this.setTaskSytleGenerel(elements[i]);
      }
    }
  }

  setTaskSytleGenerel(task: HTMLElement) {
    task.style.color = 'white';
    task.style.borderRadius = '8px';
    task.style.padding = '4px 25px';
    task.style.width = 'fit-content';
  }
}
