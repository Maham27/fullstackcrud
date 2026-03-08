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
  createSubject(subject: any): Observable<Subj> {
    return this.http.post<Subj>(this.apiUrl, subject);
  }
  getSubjects(): Observable<Subj[]> {
    return this.http.get<Subj[]>(this.apiUrl);
  }
  getSubjectById(id: number): Observable<Subj> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Subj>(url);
  }

  updateSubject(id: number, subject: any): Observable<Subj> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Subj>(url, subject);
  }
  deleteSubject(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  createVideo(subjectId: number, video: FormData): Observable<any> {
  const url = `${this.apiUrl}/${subjectId}/videos`;
  return this.http.post(url, video);  // FormData directly post karenge
}

  getVideosBySubjectId(subjectId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${subjectId}/videos`;
    return this.http.get<any[]>(url);
  }
  
 updateVideo(subjectId: number, videoId: number, video: FormData): Observable<any> {
  const url = `${this.apiUrl}/${subjectId}/videos/${videoId}`;
  return this.http.put(url, video); // FormData directly PUT karenge
}
 
  deleteVideo(subjectId: number, videoId: number): Observable<void> {
    const url = `${this.apiUrl}/${subjectId}/videos/${videoId}`;
    return this.http.delete<void>(url);
  }
}