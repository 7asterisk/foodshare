import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  uid;
  today = Date.now();
  comments;
  caption = '';
  posterName;
  posterPic;
  postId;
  uploading = false;
  cometedUsers = [];
  constructor(private auth: AuthService, private data: DataService, private route: ActivatedRoute) {


    this.route.params.subscribe(params => {
      this.postId = +params.id;
      this.data.getCollection(`post/${this.postId}/comments`).subscribe(comments => {
        this.comments = comments;

        comments.forEach(comment => {
          this.data.getDoc('user', comment.postedBy).subscribe(userdata => this.cometedUsers.push(userdata));
        });

      });
    });
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;
      this.data.getDoc('user', this.uid).subscribe(userdata => {
        this.posterName = userdata.name;
        this.posterPic = userdata.picture;
      });
    });
  }



  deleteComment(commentid) {
    this.data.deleteDoc(`post/${this.postId}/comments`, commentid);
  }
  post() {
    this.uploading = true;
    const post = {
      postedBy: this.uid,
      comment: this.caption,
      time: this.today,
      posterName: this.posterName,
      posterPic: this.posterPic
    };
    this.data.addDoc(`post/${this.postId}/comments`, this.today, post).then(() => {
      this.caption = '';
      this.uploading = false;
    });

  }


  getPosterName(uid) {
    const poster = this.cometedUsers.find(x => x.uid === uid);
    return poster?.name;
  }

  getPosterPic(uid) {
    const poster = this.cometedUsers.find(x => x.uid === uid);
    return poster?.picture;
  }


  calculateTime(datefuture) {
    let delta = Math.abs(datefuture - Date.now()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    if (days > 0) {
      return days + ' day ago';
    }
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    if (hours > 0) {
      return hours + ' hr ago';
    }
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    if (minutes > 0) {
      return minutes + ' min ago';
    }

    return delta % 60;  // in theory the modulus is not required

  }


  ngOnInit(): void {
  }

}
