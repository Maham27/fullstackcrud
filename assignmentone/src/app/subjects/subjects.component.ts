import { Component } from '@angular/core';
import { Subj } from '../models/subject';
import { ServicedataService } from '../core/services/servicedata.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectlistComponent } from '../subjectlist/subjectlist.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, SubjectlistComponent, ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

  subjectform = new FormGroup({
    name: new FormControl('')
  });

  subjs: Subj[] = [];
  editingid: number | null = null;
  subjectService: ServicedataService = inject(ServicedataService);

  ngOnInit() {
    this.getallsubjects();
  }
  getallsubjects() {
    this.subjectService.getsubjects().subscribe({
      next: (data) => this.subjs = data,
      error: (err) => console.error('error', err.message)
    });
  }
  onSubmit() {
    if (!this.subjectform.valid) return;
    if (this.editingid) {
      this.subjectService.updatesubject(this.editingid, this.subjectform.value).subscribe({
        next: () => {
          this.subjectform.reset();
          this.editingid = null;
          this.getallsubjects();
        },
        error: (err) => console.error('error', err.message)
      });
    } else {
      this.subjectService.createsubject(this.subjectform.value).subscribe({
        next: () => {
          this.subjectform.reset();
          this.getallsubjects();
        },
        error: (err) => console.error('error', err.message)
      });
    }
  }

  editsubject(subject: Subj) {
    this.subjectform.patchValue({ name: subject.name });
    this.editingid = subject.id;
  }

  deleteSubject(id: number) {
    this.subjectService.deletesubject(id).subscribe({
      next: () => this.getallsubjects(),
      error: (err) => console.error('error', err.message)
    });
  }
}
