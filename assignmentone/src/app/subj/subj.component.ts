import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ServicedataService } from '../core/services/servicedata.service';

@Component({
  selector: 'app-subj',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subj.component.html',
  styleUrls: ['./subj.component.css'] // 
})
export class SubjComponent {
  subjectForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private subjectService: ServicedataService) {}

  onSubmit() {
    if (!this.subjectForm.valid) return;

    this.subjectService.createSubject(this.subjectForm.value).subscribe({
      next: () => this.subjectForm.reset(),
      error: (err) => console.error('Error:', err.message)
    });
  }
}

