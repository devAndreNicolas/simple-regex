import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; 
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  {path: 'inicio', component: HomeComponent},
  { path: 'sobre', component: About },
  { path: 'contato', component: Contact },
  
  { path: '**', redirectTo: '' } 
];