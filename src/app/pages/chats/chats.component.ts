import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  users;
  uid;
  chatId;
  isNewMsg = {};
  constructor(private dataService: DataService, private auth: AuthService, private router: Router) {
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;
    });
    dataService.getCollection('user').subscribe(users => {
      this.users = users;
      users.forEach(user => {
        this.dataService.getDoc(`user/${user.uid}/chatids`, this.uid).subscribe(data => {
          if (data?.newChat) {
            this.isNewMsg[user.uid] = data.newChat;
            console.log(this.isNewMsg);
          }

        });
      });
    });
  }

  // hadChat(tochatId) {
  //   this.dataService.getDoc(`user/${this.uid}/chatids`, tochatId).subscribe(data => {
  //     data.len
  //   }
  //   );
  // }

  hasNewMsg(toChat) {
    return true;
    // this.dataService.getDoc(`user/${this.uid}/chatids`, toChat).subscribe(chatid => {
    //   if (chatid) {
    //     console.log(chatid);
    //   } else {
    //     return false;
    //   }
    // });
  }

  goToInbox(toChat) {

    this.dataService.getDoc(`user/${this.uid}/chatids`, toChat).subscribe(chatid => {
      if (chatid) {
        this.chatId = chatid.chatid;
      } else {
        this.chatId = this.uid.substring(0, 5) + toChat.substring(0, 5);
      }
      this.router.navigate(['/chatroom', { roomid: this.chatId, tochat: toChat }]);
    });
  }
  ngOnInit(): void {
  }

}
