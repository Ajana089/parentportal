import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
 
  // imports: [
  //   BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
  //   HttpClientModule,
  //   BrowserAnimationsModule,
  //   FormsModule,
  //   SharedModule,
  //   AuthModule,
  //   NgbModule
  // ],
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
