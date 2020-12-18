import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  getUser() {
    return this.auth.user;
  }
  loginWithGoogle() {
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginWithEmail(username, pass) {
    return this.auth.signInWithEmailAndPassword(username, pass);
  }
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
  singinWithEmail(email, pass) {
    return this.auth.createUserWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.auth.signOut();
  }
}
