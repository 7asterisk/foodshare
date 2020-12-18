import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user;
  showBottomnav = true;
  constructor(public auth: AuthService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        const temp: any = event;
        const url = temp.url.split(';')[0];
        // console.log(url);
        if (url === '/chatroom') {
          this.showBottomnav = false;
        } else {
          this.showBottomnav = true;
        }
      });
    this.auth.getUser().subscribe(user => this.user = user);
  }
}
