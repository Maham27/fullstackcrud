import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule,FormControl,FormGroup ,Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  router = inject(Router);
user = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
});

onSubmit(){
 if (this.user.valid) {
    localStorage.setItem('userData', JSON.stringify(this.user.value)); 
  console.log('data saved to local storage');
      console.log(this.user.value);
      alert('registration Successful')
      this.router.navigate(['/login']);  
    } else {
      console.log('form is invalid!');
    }
  }
}
