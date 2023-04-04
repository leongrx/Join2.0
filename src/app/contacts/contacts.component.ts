import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UserProfile } from '@angular/fire/auth';
import { getFirestore } from '@angular/fire/firestore';
import {
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlphabetItem } from '../../models/alphabet-item';
import { Userlist } from '../../models/user-list';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  userId: string | undefined;
  startLetter: string = '';

  constructor(private afAuth: AngularFireAuth, private userservice: UsersService, public userService: UsersService) {
    this.userService.getUserData()
    this.afAuth.authState
    .subscribe((user) => this.userId = user?.uid);
  }

  setHeaders(user: { firstName: string; }) {
      let userLetter = user.firstName.charAt(0);
      if (userLetter !== this.startLetter) {
        this.startLetter = userLetter;
        return true;
      }
      return false;
    }

    clickedUser(user: any) {
      this.userService.clickeduser = user;
      console.log(this.userService.clickeduser)
    }
}

