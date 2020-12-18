import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chatinbox',
  templateUrl: './chatinbox.component.html',
  styleUrls: ['./chatinbox.component.scss']
})
export class ChatinboxComponent implements OnInit {


  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  chatid: number;
  tochat;
  newmsg = '';
  chats;
  uid;
  toChatUser;
  constructor(private route: ActivatedRoute, private data: DataService, private auth: AuthService) {
    this.auth.getUser().subscribe(user => this.uid = user.uid);
  }



  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatid = params.roomid;
      this.tochat = params.tochat;
      this.data.getCollection(`chats/${this.chatid}/msgs`).subscribe(chats => {
        this.chats = chats;
        if (this.chats.length === 0) {
          this.data.addDoc(`user/${this.uid}/chatids`, this.tochat, { chatid: this.chatid });
          this.data.addDoc(`user/${this.tochat}/chatids`, this.uid, { chatid: this.chatid });
        } else {
          this.data.addDoc(`user/${this.tochat}/chatids`, this.uid, { newChat: false, chatid: this.chatid });
        }
      });

      this.data.getDoc('user', this.tochat).subscribe(userData => {
        this.toChatUser = userData;
      });

    });
  }




  sendMsg() {
    if (this.newmsg.length > 0) {
      const now = Date.now();
      this.data.addDoc(`user/${this.uid}/chatids`, this.tochat, { newChat: true, chatid: this.chatid });
      this.data.addDoc(`chats/${this.chatid}/msgs`, now, { msg: this.newmsg, time: now, by: this.uid });
      this.newmsg = '';
    }
  }
}
