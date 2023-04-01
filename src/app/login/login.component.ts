import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProfileUser } from '../../models/user-profile';
import { Observable } from 'rxjs';
import { doc } from '@firebase/firestore';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  hide = true;
  currentUserId: string | undefined;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit(): void {}

  get email() {
      return this.loginForm.get('email');
    }
  get password() {
      return this.loginForm.get('password');
    }

    submit() {
      if (!this.loginForm.valid) {
        return;
      }
  
      const { email, password } = this.loginForm.value;
      this.authService
        .login(email, password)
        .pipe(
          switchMap(async ({ user: { uid } }) => this.userService.currentUserId = uid ))
            .subscribe(() => {
              this.router.navigate(['/dashboard/summary']);
            });
    }
}
