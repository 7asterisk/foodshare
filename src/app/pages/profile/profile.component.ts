import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData;
  edit = false;
  uid;
  uploading = false;
  posts;
  gotliks = false;
  now = Date.now();
  allPostLikes = {};
  constructor(private auth: AuthService, private router: Router, private data: DataService, private storage: AngularFireStorage) {
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;
      this.getPost();
      this.data.getDoc('user', this.uid).subscribe(udata => {
        this.userData = udata;
      });
    });
  }


  uploadPhoto(event) {
    this.uploading = true;
    const file = event.target.files[0];
    const filePath = 'profile' + '/' + this.uid;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(url => { this.userData.picture = url; this.updateData(); }))
    )
      .subscribe();
  }

  updateData() {
    this.data.updateDoc('user', this.uid, this.userData);
    this.uploading = false;
  }
  deletPost(postId) {
    console.log(postId);
    this.data.deleteDoc('post', postId);
  }


  getPost() {
    this.data.getMyPost(this.uid).valueChanges().subscribe(posts => {
      this.posts = posts;
      this.posts.forEach(p => {
        this.data.getCollection(`post/${p.time}/likes`).subscribe((likes) => {
          this.allPostLikes[p.time] = likes;
          // console.log(this.allPostLikes);
        });
      });
      this.gotliks = true;
    });
  }
  saveData() {
    this.updateData();
    this.edit = false;
  }
  logout() {
    this.auth.logout().then(() => this.router.navigate(['/login']));
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

  likeIt(postId) {
    if (this.isLiked(postId)) {
      this.data.deleteDoc(`post/${postId}/likes`, this.uid);
    } else {
      const like = { likedBy: this.uid, time: this.now };
      this.data.addDoc(`post/${postId}/likes`, this.uid, like);
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



}
