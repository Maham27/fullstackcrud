import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subj } from '../../models/subject';

@Injectable({
  providedIn: 'root'
})
export class ServicedataService {

  private apiUrl = 'http://localhost:3000/api/subjects';

  constructor(private http: HttpClient) { }
  createsubject(subject: any): Observable<Subj> {
    return this.http.post<Subj>(this.apiUrl, subject);
  }
  getsubjects(): Observable<Subj[]> {
    return this.http.get<Subj[]>(this.apiUrl);
  }
  getsubjectbyid(id: number): Observable<Subj> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Subj>(url);
  }

  updatesubject(id: number, subject: any): Observable<Subj> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Subj>(url, subject);
  }
  deletesubject(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  createvideo(subjectId: number, video: FormData): Observable<any> {
    const url = `${this.apiUrl}/${subjectId}/videos`;
    return this.http.post(url, video);  // FormData directly post karenge
  }

  getvideosbysubjectid(subjectId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${subjectId}/videos`;
    return this.http.get<any[]>(url);
  }

  updatevideo(subjectId: number, videoId: number, video: FormData): Observable<any> {
    const url = `${this.apiUrl}/${subjectId}/videos/${videoId}`;
    return this.http.put(url, video);
  }

  deletevideo(subjectId: number, videoId: number): Observable<void> {
    const url = `${this.apiUrl}/${subjectId}/videos/${videoId}`;
    return this.http.delete<void>(url);
  }
}