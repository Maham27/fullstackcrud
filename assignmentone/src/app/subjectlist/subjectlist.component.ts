import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Subject } from '../models/subject';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subjectlist',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './subjectlist.component.html',
  styleUrl: './subjectlist.component.css'
})
export class SubjectlistComponent {
  @Input() subj!:Subject;
}
