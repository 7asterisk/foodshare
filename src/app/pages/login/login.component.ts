import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email;
  pass;
  repass;
  name;
  file;
  forgetTab = false;
  uploading = false;
  userData;
  constructor(private auth: AuthService,
    private toastr: ToastrService,
    private data: DataService,
    private route: Router,
    private storage: AngularFireStorage
  ) { }
  loginWithGoogle() {
    this.auth.loginWithGoogle().then(user => {

      this.data.getDoc('user', user.user.uid).subscribe(data => {
        if (!data) {
          let userdata: any = user.additionalUserInfo.profile;
          userdata.uid = user.user.uid;
          this.data.addDoc('user', user.user.uid, user.additionalUserInfo.profile);
        }
        this.route.navigate(['/']);
      });
    });
  }

  loginWithEmail(email, pass) {
    this.auth.loginWithEmail(email, pass).then(() => {
      this.route.navigate(['/']);
    }).catch(err => {
      this.toastr.error('invalid username or password !');
    });
  }
  openForgetTab(toset) {
    this.forgetTab = toset;
  }

  resetPassword(email) {
    this.auth.resetPassword(email).then(() => {
      this.toastr.success('reset mail is sent!');
    });
  }



  getfile(event) {
    this.file = event.target.files[0];
  }

  singup(pass1, pass2) {
    if (pass1 === pass2) {
      this.auth.singinWithEmail(this.email, pass1).then((user) => {
        this.userData = { email: this.email, name: this.name, verified_email: false, uid: user.user.uid };
        if (this.file) {
          this.uploadPhoto(user.user.uid);
        } else {
          // tslint:disable-next-line: max-line-length
          this.userData.picture = 'https://firebasestorage.googleapis.com/v0/b/foodbook-f86b7.appspot.com/o/default-profile.png?alt=media&token=8050181b-c15d-4974-8523-8a109d742d18'
          this.data.addDoc('user', user.user.uid, this.userData);
          this.route.navigate(['/']);
        }
      });
    } else {
      this.toastr.error('password didn\'t match !');
    }

  }

  uploadPhoto(uid) {
    this.uploading = true;
    const filePath = 'profile' + '/' + uid;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(url => {
        this.userData.picture = url;
        this.userData.uid = uid;
        this.data.addDoc('user', uid, this.userData);
        this.route.navigate(['/']);
      }))
    )
      .subscribe();
  }



  ngOnInit(): void {
  }

}
