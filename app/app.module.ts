import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  importProvidersFrom,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { CustomHttpInterceptor } from './components/shared/interceptor/custom-interceptor';
import { NbMenuService } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from './components/auth/guard/auth.gaurd';
import { OrdersComponent } from './components/orders/orders.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProgressSpinnerComponent } from './components/shared/components/progress-spinner/progress-spinner.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SlicePairsPipe } from './components/dashboard/services/slice-pairs.pipe';
import { TermsConditionsComponentComponent } from './components/master-setup/organization/terms-and-conditions/terms-conditions-component/terms-conditions-component.component';
import { TermsConditionsAddComponent } from './components/master-setup/organization/terms-and-conditions/terms-conditions-add/terms-conditions-add.component';
import { TermsConditionsComponent } from './components/master-setup/organization/terms-and-conditions/terms-conditions/terms-conditions.component';
import { LocationMasterComponent } from './components/master-setup/organization/LocationMaster/location-master/location-master.component';
import { LocationMasterAddComponent } from './components/master-setup/organization/LocationMaster/location-master-add/location-master-add.component';
import { OtherAdditionalChargesComponent } from './components/master-setup/organization/Other-Additional-ChargesMaster/other-additional-charges/other-additional-charges.component';
import { OtherAdditionalChargesAddComponent } from './components/master-setup/organization/Other-Additional-ChargesMaster/other-additional-charges-add/other-additional-charges-add.component';
@NgModule({
  declarations: [AppComponent, SlicePairsPipe, TermsConditionsComponentComponent, TermsConditionsAddComponent, TermsConditionsComponent, LocationMasterComponent, LocationMasterAddComponent, OtherAdditionalChargesComponent, OtherAdditionalChargesAddComponent],
  imports: [
    // BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    AuthModule,
    NgbModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterOutlet,
    ProgressSpinnerComponent,
    RouterModule,
    NgxChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    NbMenuService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
