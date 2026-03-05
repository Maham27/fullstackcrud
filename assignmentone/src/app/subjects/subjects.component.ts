import { Component } from '@angular/core';
import { Subject } from '../models/subject';
import { ServicedataService } from '../core/services/servicedata.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectlistComponent } from '../subjectlist/subjectlist.component';
@Component({
  selector: 'app-subjects',
  standalone:true,
  imports: [CommonModule,SubjectlistComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  subjectslist:Subject[]=[]

  subjectdata:ServicedataService=inject(ServicedataService)

  constructor()
{
  this.subjectslist=this.subjectdata.getAllsubjects();
}

}
