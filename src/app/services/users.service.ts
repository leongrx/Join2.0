import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../../models/user-profile';
import { Userlist } from 'src/models/user-list';
import { AlphabetItem } from 'src/models/alphabet-item';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{

  public currentUserId: string | undefined;
  userList: Userlist[] = [];
  alphabetList: AlphabetItem[] = [];
  clickeduser: any = [];
  colRef = collection(getFirestore(), 'users');

  constructor(
    private firestore: Firestore,
    private afirestore: AngularFirestore,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getUserData();
  }
  
  async getUserData() {
    this.userList = [];
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

  addUser(user: ProfileUser): Observable<any> { //from signUp
    const ref = doc(this.firestore, 'users', user?.uid);
    this.currentUserId = user?.uid
    return from(setDoc(ref, user));
  }

  getUser() { //from login
    this.currentUserId = this.currentUserId;
    console.log(this.currentUserId)
  }

  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    console.log(queryAll)
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }
  
}
