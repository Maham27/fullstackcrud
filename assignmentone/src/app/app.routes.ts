import { Routes } from '@angular/router';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectvideosComponent } from './subjectvideos/subjectvideos.component';
import { MyloginComponent } from './mylogin/mylogin.component';
import { RegistrationComponent } from './registration/registration.component';
import { SubjComponent } from './subj/subj.component';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full',
    },
    {
        path:'registration',component:RegistrationComponent
    },
    {
        path:'subject',component:SubjectsComponent
    },
    {
        path:'subject/:id',component:SubjectvideosComponent
    },
    {
        path:'login',component:MyloginComponent
    },
    {
        path:'subj',component:SubjComponent
    },
    {
    path: '**',
    redirectTo: 'login'
    }

];
