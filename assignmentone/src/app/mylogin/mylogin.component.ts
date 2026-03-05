import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-mylogin',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './mylogin.component.html',
  styleUrl: './mylogin.component.css'
})
export class MyloginComponent {
  router = inject(Router);
  person = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
onSubmit() {
  const data = localStorage.getItem('userData');
  if (!data) {
    alert('user does not exist.');
    this.router.navigate(['/registration']);
    return;
  }
  const userdata = JSON.parse(data);
  if (userdata.email !== this.person.value.email) {
    alert('email incorrect');
    return;
  }
  if (userdata.password !== this.person.value.password) {
    alert('password incorrect');
    return;
  }
  alert('login successful!');
  this.router.navigate(['/subject']);
}
}