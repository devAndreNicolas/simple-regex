import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; 
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

declare const $localize: any;

export const routes: Routes = [
  { 
        path: '', 
        component: HomeComponent,
        title: $localize`:@@routeTitleHome:Início`
    },
  

  { 
        path: $localize`:@@routePathHome:inicio`, 
        component: HomeComponent,
        title: $localize`:@@routeTitleHome:Início`
    },

  { 
        path: $localize`:@@routePathAbout:sobre`, 
        component: About,
        title: $localize`:@@routeTitleAbout:Sobre`
    },

  { 
        path: $localize`:@@routePathContact:contato`, 
        component: Contact,
        title: $localize`:@@routeTitleContact:Contato`
    },

  { 
        path: $localize`:@@routePathPrivacy:politica-de-privacidade`, 
        component: PrivacyPolicy,
        title: $localize`:@@routeTitlePrivacy:Política de Privacidade`
    },
  
  { path: '**', redirectTo: '' } 
];