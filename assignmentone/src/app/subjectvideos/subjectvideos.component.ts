import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Subject } from '../models/subject';
import { ServicedataService } from '../core/services/servicedata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subjectvideos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subjectvideos.component.html',
  styleUrl: './subjectvideos.component.css'
})
export class SubjectvideosComponent {
  route = inject(ActivatedRoute);
  subjservice = inject(ServicedataService)
  subjectId: number | undefined;
  subject: Subject | undefined;

    ngOnInit() { {
    this.subjectId = Number(this.route.snapshot.params['id']);
    this.subject = this.subjservice.getvideosofsubject(this.subjectId);
  }
}
}
