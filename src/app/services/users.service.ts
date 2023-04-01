import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{

  public currentUserId: string | undefined;

  constructor(
    private firestore: Firestore,
    private afirestore: AngularFirestore,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    console.log(this.currentUserId)
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
