import {Injectable} from '@angular/core';
import {FaceSnap} from '../models/face-snap.model';
import {Comment} from "../models/comment.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) {
  }

  faceSnaps!: FaceSnap[];
  comment!: Comment[];

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<any>('http://localhost:5000/facesnaps').pipe(
      map(response => response.facesnaps)
    );
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<any>(`http://localhost:5000/facesnaps/${faceSnapId}`).pipe(
      map(response => response.facesnap)
    );
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    if (snapType === 'snap') {
      return this.http.put<any>(`http://localhost:5000/facesnaps/${faceSnapId}/snaps`, {}).pipe(
        map(response => response)
      );
    } else {
      return this.http.delete<FaceSnap>(`http://localhost:5000/facesnaps/${faceSnapId}/snaps`);
    }
  }

  addFaceSnap(formValue: {title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    const httpOptions = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    );

    const body = new HttpParams()
      .set('title', formValue.title)
      .set('description', formValue.description)
      .set('imageUrl', formValue.imageUrl)
      .set('location', formValue.location || '');

    return this.getAllFaceSnaps().pipe(
      map(previousFaceSnap => body),
      switchMap(newFaceSnap => this.http.post<any>('http://localhost:5000/facesnaps', newFaceSnap, {headers: httpOptions})));
  }

  getCommentsByFaceSnapId(faceSnapId: number): Observable<Comment[]>
  {
      return this.http.get<any>(`http://localhost:5000/commentaires/${faceSnapId}`).pipe(
        map(response => response.commentaires)
      );
  }
}
