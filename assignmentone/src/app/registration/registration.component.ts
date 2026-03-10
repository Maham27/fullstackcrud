import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../core/services/authservice.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  router = inject(Router);
  authservice: AuthserviceService = inject(AuthserviceService);
  user = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  onSubmit() {
    if (this.user.valid) {
      this.authservice.createuser(this.user.value).subscribe({
        next: (res) => {
          console.log('user created', res);
          alert('registration successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('error', err);
          alert('registration failed: ' + (err.error?.message || 'Unknown error'));
        }
      })
    }
    else {
      console.log('invalid form');
      alert('fill the form correctly');
    }
  }
}
