import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from './components/auth/guard/auth.gaurd';
import { AuthService } from './components/auth/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';




export const appConfig: ApplicationConfig = {
  providers: [AuthGuard, AuthService,
    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    importProvidersFrom(HttpClientModule),
    provideRouter(routes), provideClientHydration(), provideAnimationsAsync()]
};
