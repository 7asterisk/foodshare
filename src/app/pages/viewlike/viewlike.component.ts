import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-viewlike',
  templateUrl: './viewlike.component.html',
  styleUrls: ['./viewlike.component.scss']
})
export class ViewlikeComponent implements OnInit {
  likeBy;
  likedUser = [];
  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe(params => {
      this.data.getCollection(`post/${params.id}/likes`).subscribe(likedby => {
        this.likeBy = likedby;
        likedby.forEach(comment => {
          this.data.getDoc('user', comment.likedBy).subscribe(userdata => this.likedUser.push(userdata));
        });
        console.log(this.likedUser);
      });
    });

  }



  getPosterName(uid) {
    const poster = this.likedUser.find(x => x.uid === uid);
    return poster?.name;
  }

  getPosterPic(uid) {
    const poster = this.likedUser.find(x => x.uid === uid);
    return poster?.picture;
  }


  ngOnInit(): void {
  }

}
