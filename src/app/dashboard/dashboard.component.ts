import { Component } from '@angular/core';
import {
  Auth
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private auth: Auth,
    private router: Router
  ){}

  signOut() {
    this.router.navigate(["/login"])
    return this.auth.signOut();
  }

  select(key: string) {
    document.querySelectorAll("li").forEach(p => p.style.backgroundColor = "white");
    let topic = document.getElementById(key) as HTMLDivElement;
    topic.style.backgroundColor = '#D2E3FF';
  }

}
