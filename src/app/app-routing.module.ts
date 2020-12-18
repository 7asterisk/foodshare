import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ViewpostComponent } from './pages/viewpost/viewpost.component';
import { HomeComponent } from './pages/home/home.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { LoginComponent } from './pages/login/login.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { CommentsComponent } from './pages/comments/comments.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatinboxComponent } from './pages/chatinbox/chatinbox.component';
import { ViewlikeComponent } from './pages/viewlike/viewlike.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

const routes: Routes = [
  // tslint:disable-next-line: max-line-length
  { path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'viewComment', component: ViewpostComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: '', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'comment/:id', component: CommentsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'addpost', component: AddpostComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'chats', component: ChatsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'likes/:id', component: ViewlikeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'chatroom', component: ChatinboxComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
