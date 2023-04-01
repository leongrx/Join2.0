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
  userList: Userlist[] = [];
  alphabetList: AlphabetItem[] = [];
  userId: string | undefined;
  startLetter: string = '';
  colRef = collection(getFirestore(), 'users');

  constructor(private afAuth: AngularFireAuth, private userservice: UsersService) {
    this.getUserData();
    this.afAuth.authState
    .subscribe((user) => this.userId = user?.uid);
  }

  async getUserData() {
    try {
      const docsSnap = await getDocs(this.colRef);
      docsSnap.forEach((doc) => {
        this.pushToUserlist(doc);
        this.pushToAlphabet(doc);
        this.sort();
      });
    } catch (error) {
      console.log(error);
    }
  }

  pushToAlphabet(doc: QueryDocumentSnapshot<DocumentData>) {
    return this.alphabetList.push({
      start: doc.get('firstName').slice(0, 1),
    });
  }

  pushToUserlist(doc: QueryDocumentSnapshot<DocumentData>) {
    return this.userList.push({
      firstName: doc.get('firstName'),
      start: doc.get('firstName').slice(0, 1),
      lastName: doc.get('lastName'),
      end: doc.get('lastName').slice(0, 1),
      email: doc.get('email'),
    });
  }

  sort() {
    this.userList.sort((a, b) => {
      if (a.firstName < b.firstName) {
        return -1;
      } else if (a.firstName < b.firstName) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  setHeaders(user: { firstName: string; }) {
      let userLetter = user.firstName.charAt(0);
      if (userLetter !== this.startLetter) {
        // Setze den neuen Anfangsbuchstaben als aktuellen Anfangsbuchstaben
        this.startLetter = userLetter;
        return true;
      }
      return false;
    }
}

