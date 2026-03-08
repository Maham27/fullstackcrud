import { Component } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core';
import { Subj } from '../models/subject';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subjectlist',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './subjectlist.component.html',
  styleUrl: './subjectlist.component.css'
})
export class SubjectlistComponent {
  @Input() subj!:Subj;
   @Output() edit = new EventEmitter<Subj>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.subj);
  }

  onDelete() {
    this.delete.emit(this.subj.id);
  }
}

