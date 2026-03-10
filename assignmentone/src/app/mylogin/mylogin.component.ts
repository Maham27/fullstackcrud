import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthserviceService } from '../core/services/authservice.service';


@Component({
  selector: 'app-mylogin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './mylogin.component.html',
  styleUrl: './mylogin.component.css'
})
export class MyloginComponent {
  router = inject(Router);
  authservice: AuthserviceService = inject(AuthserviceService);

  person = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  onSubmit() {
    if (this.person.invalid) {
      alert('pls fill form correctly');
      return;
    }
    this.authservice.loginuser(this.person.value).subscribe({
      next: (res) => {
        alert(res.message);
        localStorage.setItem('userData', JSON.stringify(res.user));
        this.router.navigate(['/subject']);
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
}