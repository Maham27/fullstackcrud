import { Component } from '@angular/core';
import { Subj} from '../models/subject';
import { ServicedataService } from '../core/services/servicedata.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectlistComponent } from '../subjectlist/subjectlist.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-subjects',
  standalone:true,
  imports: [CommonModule,SubjectlistComponent,ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

 subjectForm = new FormGroup({
    name: new FormControl('')
  });

  subjs: Subj[] = [];
  editingId: number | null = null; 
  subjectService: ServicedataService = inject(ServicedataService);

  ngOnInit() {
    this.getSubjects();
  }

  // Get all subjects
  getSubjects() {
    this.subjectService.getSubjects().subscribe({
      next: (data) => this.subjs = data,
      error: (err) => console.error('Error:', err.message)
    });
  }

  // Create or update subject
  onSubmit() {
    if (!this.subjectForm.valid) return;
    if (this.editingId) {
      this.subjectService.updateSubject(this.editingId, this.subjectForm.value).subscribe({
        next: () => {
          this.subjectForm.reset();
          this.editingId = null; // reset editing mode
          this.getSubjects();
        },
        error: (err) => console.error('Error:', err.message)
      });
    } else {
      this.subjectService.createSubject(this.subjectForm.value).subscribe({
        next: () => {
          this.subjectForm.reset();
          this.getSubjects();
        },
        error: (err) => console.error('Error:', err.message)
      });
    }
  }

  // Load subject data into form for editing
  editSubject(subject: Subj) {
    this.subjectForm.patchValue({ name: subject.name });
    this.editingId = subject.id; // set editing id
  }

  // Delete subject
  deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe({
      next: () => this.getSubjects(),
      error: (err) => console.error(err)
    });
  }
}
