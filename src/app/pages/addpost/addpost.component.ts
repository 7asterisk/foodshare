import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
  uid;
  today = Date.now();
  caption = '';
  img;
  tempImg;
  file;
  uploading;
  posterName;
  posterPic;

  constructor(private auth: AuthService, private router: Router, private data: DataService, private storage: AngularFireStorage) {
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;
      this.data.getDoc('user', this.uid).subscribe(userdata => {
        console.log(userdata);
        this.posterName = userdata.name;
        this.posterPic = userdata.picture;
      });
    });
  }

  getfile(event) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.tempImg = reader.result;

      reader.readAsDataURL(file);
    }
  }
  post() {
    this.uploading = true;
    const filePath = 'post' + '/' + this.today;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(url => {
        const post = {
          img: url,
          postedBy: this.uid,
          caption: this.caption,
          time: this.today,
          posterName: this.posterName,
          posterPic: this.posterPic
        };
        this.data.addDoc('post', this.today, post);
        this.router.navigate(['/']);
      }))
    )
      .subscribe();
  }


  ngOnInit(): void {
  }

}
