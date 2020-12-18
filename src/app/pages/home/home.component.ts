import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgNavigatorShareService } from 'ng-navigator-share';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts = [];
  uid;
  now = Date.now();
  gotliks = false;
  lastPostTime = this.now;
  allPostLikes = {};
  allPostComment = {};
  allUser;
  gotAllUser = false;
  constructor(private dataService: DataService, private auth: AuthService, private ngNavigatorShareService: NgNavigatorShareService) {
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;
      this.getPost();
    });

    dataService.getCollection('user').subscribe(users => {
      this.allUser = users;
      this.gotAllUser = true;
    });

  }
  onScroll() {
    this.getPost();
  }

  ngOnInit(): void {
  }

  isLiked(postId) {
    if
      (this.allPostLikes[postId]?.find(i => i?.likedBy === this.uid)) {
      return true;
    }
    return false;
  }

  NoOfLikes(postId) {
    return this.allPostLikes[postId]?.length;
  }


  NoOfcomment(postId) {
    return this.allPostComment[postId]?.length;
  }

  getPosterName(uid) {
    const poster = this.allUser.find(x => x.uid === uid);
    return poster.name;
  }

  getPosterPic(uid) {
    const poster = this.allUser.find(x => x.uid === uid);
    return poster.picture;
  }


  likeIt(postId) {
    if (this.isLiked(postId)) {
      this.dataService.deleteDoc(`post/${postId}/likes`, this.uid);
    } else {
      const like = { likedBy: this.uid, time: this.now };
      this.dataService.addDoc(`post/${postId}/likes`, this.uid, like);
    }

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


  share(text, url) {
    this.ngNavigatorShareService.share({
      title: 'My post on khanawala ',
      text: text,
      url: url,
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  }


  getPost() {
    this.dataService.getPost(this.lastPostTime).valueChanges().subscribe(post => {
      this.posts.push(...post);
      this.lastPostTime = this.posts[this.posts.length - 1].time;
      this.posts.forEach(p => {
        this.dataService.getCollection(`post/${p.time}/likes`).subscribe((likes) => {
          this.allPostLikes[p.time] = likes;
        });

        this.dataService.getCollection(`post/${p.time}/comments`).subscribe((comment) => {
          this.allPostComment[p.time] = comment;
        });

      });
      this.gotliks = true;
    });
  }

}
