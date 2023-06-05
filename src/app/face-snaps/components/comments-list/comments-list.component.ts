import { Component, OnInit } from '@angular/core';
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Comment} from "../../../core/models/comment.model";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  comments!: Comment[];

  constructor(private faceSnapService: FaceSnapsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnapService.getCommentsByFaceSnapId(faceSnapId).subscribe(comments => {
      this.comments = comments;
      console.log(comments)
    })
  }

}
