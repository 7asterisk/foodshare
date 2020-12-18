import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  isNewMsg = {};
  isNewMsgLength = 0;
  constructor(private dataService: DataService, private auth: AuthService) {
    this.auth.getUser().subscribe(authUser => {
      dataService.getCollection('user').subscribe(users => {
        users.forEach(user => {
          this.dataService.getDoc(`user/${user.uid}/chatids`, authUser.uid).subscribe(data => {
            this.isNewMsg[user.uid] = data?.newChat;
            const isNewMsgLength = Object.values(this.isNewMsg).filter((element) => {
              return element === true;
            });
            this.isNewMsgLength = isNewMsgLength.length;
          });
        });
      });
    });
  }

  ngOnInit(): void {
  }

}
