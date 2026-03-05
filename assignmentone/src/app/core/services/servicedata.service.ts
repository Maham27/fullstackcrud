import { Injectable } from '@angular/core';
import { Subject } from '../../models/subject';

@Injectable({
  providedIn: 'root'
})
export class ServicedataService {

Subjectsdata: Subject[] = [
  {
    id: 1,
    subjectname: 'Maths',
    videos: [
      { title: 'Lesson 1', url: 'assets/math/Mathlesson1.mp4' },
      { title: 'Lesson 2', url: 'assets/math/Mathlesson2.mp4' },
      { title: 'Lesson 3', url: 'assets/math/mathlesson3.mp4' }
    ]
  },

  {
    id: 2,
    subjectname: 'English',
    videos: [
      { title: 'Lesson 1', url: 'assets/English/Englishlesson.mp4' },
      { title: 'Lesson 2', url: 'assets/English/Englishlesson2.mp4' },
      { title: 'Lesson 3', url: 'assets/English/Englishlesson3.mp4' }
    ]
  },

  {
    id: 3,
    subjectname: 'Physics',
    videos: [
      { title: 'Lesson 1', url: 'assets/physics/physicslesson1.mp4' },
      { title: 'Lesson 2', url: 'assets/physics/physicslesson2.mp4' },
      { title: 'Lesson 3', url: 'assets/physics/physicslesson3.mp4' }
    ]
  }
];
 
 getAllsubjects():Subject[]{
  return this.Subjectsdata;
 }
 getvideosofsubject(id:number):Subject | undefined
  {
    return this.Subjectsdata.find((subj)=>subj.id===id)
  }                        
}
