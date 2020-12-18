import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopnavComponent } from './topnav/topnav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { BottomnavComponent } from './bottomnav/bottomnav.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { ViewpostComponent } from './pages/viewpost/viewpost.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './pages/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CommentsComponent } from './pages/comments/comments.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatinboxComponent } from './pages/chatinbox/chatinbox.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { ViewlikeComponent } from './pages/viewlike/viewlike.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent,
    BottomnavComponent,
    AddpostComponent,
    ViewpostComponent,
    ProfileComponent,
    LoginComponent,
    CommentsComponent,
    ChatsComponent,
    ChatinboxComponent,
    ViewlikeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    InfiniteScrollModule,
    MatMenuModule,
    FormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
