import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AlertCircle, CheckCircle, Copy, Info, LucideAngularModule, Mail, XCircle } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Mail,
        Copy,
        CheckCircle,
        XCircle,  
        AlertCircle,
        Info
      })
    )
  ]
};
