import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; 
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  {path: 'inicio', component: HomeComponent},
  { path: 'sobre', component: About },
  { path: 'contato', component: Contact },
  { path: 'politica-de-privacidade', component: PrivacyPolicy},
  
  { path: '**', redirectTo: '' } 
];