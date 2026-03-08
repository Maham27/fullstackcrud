import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subj, subvideos } from '../models/subject';
import { ServicedataService } from '../core/services/servicedata.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

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
  editingId: number | undefined| null = null;

  selectedFile: File | null = null;

  videoForm = new FormGroup({
    title: new FormControl('')
  });

  ngOnInit() {
    this.subjectId = Number(this.route.snapshot.params['id']);
    this.loadSubject();
  }

  loadSubject() {
    if (!this.subjectId) return;
    this.subjservice.getSubjectById(this.subjectId).subscribe({
      next: (subjectData) => {
        this.subject = subjectData;
        this.getVideos();
      },
      error: (err) => console.error('Error fetching subject:', err)
    });
  }

  getVideos() {
    if (!this.subjectId) return;
    this.subjservice.getVideosBySubjectId(this.subjectId).subscribe({
      next: (data) => this.videos = data,
      error: (err) => console.error('Error fetching videos:', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.videoForm.valid || !this.subjectId) return;

    const formData = new FormData();
formData.append('title', this.videoForm.get('title')?.value ?? '');
    if (this.selectedFile) formData.append('video', this.selectedFile);

    if (this.editingId) {
  this.subjservice.updateVideo(this.subjectId, this.editingId, formData).subscribe({
    next: () => {
      this.videoForm.reset();
      this.selectedFile = null;
      this.editingId = null;
      this.getVideos();
    },
    error: (err) => console.error('Error updating video:', err)
  });
}
 else {
      // Create new video
      this.subjservice.createVideo(this.subjectId, formData).subscribe({
        next: () => {
          this.videoForm.reset();
          this.selectedFile = null;
          this.getVideos();
        },
        error: (err) => console.error('Error creating video:', err)
      });
    }
  }

editVideo(video: subvideos) {
  this.videoForm.patchValue({ title: video.title });
  this.editingId = video.id;
  this.selectedFile = null; // agar user file upload nahi kare, existing video rehne do
}

  deleteVideo(videoId: number | undefined) {
    if (!this.subjectId || videoId === undefined) return;
    this.subjservice.deleteVideo(this.subjectId, videoId).subscribe({
      next: () => this.getVideos(),
      error: (err) => console.error('Error deleting video:', err)
    });
  }
}