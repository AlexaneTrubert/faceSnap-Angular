import { Component, OnInit } from '@angular/core';
import {FaceSnapsService} from "../../../core/services/face-snaps.service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  constructor(private faceSnapService: FaceSnapsService) { }

  ngOnInit(): void {

  }

}
