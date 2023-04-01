import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, getFirestore } from '@firebase/firestore';
import { UsersService } from '../services/users.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private afirestore: AngularFirestore,
    private firestore: Firestore,
    private userservice: UsersService,
    public taskService: TasksService
  ) {}

  greet: string | undefined;
  userId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  colRef = collection(getFirestore(), 'users');

  ngOnInit(): void {
    this.getTime();
    this.getCurrentUser();
    this.afAuth.authState.subscribe((user) => (this.userId = user?.uid));
    this.taskService.getAllTasks()
  }

  async getCurrentUser() {
    try {
      const docsSnap = await getDocs(this.colRef);
      docsSnap.forEach((doc) => {
        if (doc.id == this.userId) {
          this.firstName = doc.get('firstName');
          this.lastName = doc.get('lastName');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getTime() {
    let now = new Date();
    let hour = now.getHours();
    if (hour < 12) {
      this.greet = 'Good morning, ';
    } else if (hour < 18) {
      this.greet = 'Good afternoon, ';
    } else {
      this.greet = 'Good evening, ';
    }
  }
}
