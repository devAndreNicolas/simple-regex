import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AlertCircle, CalendarDays, CheckCircle, Copy, CreditCard, Globe, Info, LucideAngularModule, Mail, MapPin, Phone, XCircle } from 'lucide-angular';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

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
        Info,
        Phone,
        CreditCard,
        MapPin,
        CalendarDays,
        Globe
      })
    ), provideClientHydration(withEventReplay())
  ]
};
