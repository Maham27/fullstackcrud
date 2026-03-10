import { Component, ElementRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subj, subvideos } from '../models/subject';
import { ServicedataService } from '../core/services/servicedata.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-subjectvideos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subjectvideos.component.html',
  styleUrls: ['./subjectvideos.component.css']
})
export class SubjectvideosComponent {
  route = inject(ActivatedRoute);
  subjservice = inject(ServicedataService);

  subject: Subj | undefined;
  subjectId!: number;
  videos: subvideos[] = [];
  editingid: number | null = null;
  selectedfile: File | null = null;
  @ViewChild('filename') filename!: ElementRef<HTMLInputElement>;

  videoform = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.subjectId = Number(this.route.snapshot.params['id']);
    this.getsubject();
  }

  getsubject() {
    if (!this.subjectId) return;
    this.subjservice.getsubjectbyid(this.subjectId).subscribe({
      next: (data) => {
        this.subject = data;
        this.getallvideos();
      },
      error: (err) => console.error('error', err)
    });
  }

  getallvideos() {
    if (!this.subjectId) return;
    this.subjservice.getvideosbysubjectid(this.subjectId).subscribe({
      next: (data) => this.videos = data,
      error: (err) => console.error('error', err)
    });
  }


  onfileselected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedfile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.videoform.valid || !this.subjectId) return;
    if (!this.selectedfile && !this.editingid) {
      alert("Please upload a video file");
      return;
    }

    const videodata = new FormData();
    videodata.append('title', this.videoform.get('title')?.value ?? '');
    if (this.selectedfile) videodata.append('video', this.selectedfile);
    if (this.editingid) {
      this.subjservice.updatevideo(this.subjectId, this.editingid, videodata).subscribe({
        next: () => {
          this.videoform.reset();
          this.selectedfile = null;
          this.editingid = null;
          this.getallvideos();
        },
        error: (err) => console.error('error', err)
      });
    }
    else {

      this.subjservice.createvideo(this.subjectId, videodata).subscribe({
        next: () => {
          this.videoform.reset();
          this.selectedfile = null;
          this.filename.nativeElement.value = '';
          this.getallvideos();
        },
        error: (err) => console.error('error:', err)
      });
    }
  }

  editvideo(video: subvideos) {
    this.videoform.patchValue({ title: video.title });
    this.editingid = video.id;
    this.selectedfile = null;
  }

  deleteVideo(videoId: number) {
    if (!this.subjectId) return;
    this.subjservice.deletevideo(this.subjectId, videoId).subscribe({
      next: () => this.getallvideos(),
      error: (err) => console.error('error', err)
    });
  }
}