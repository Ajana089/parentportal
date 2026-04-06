import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guard/auth.gaurd';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [AuthService, AuthGuard
  ]
})
export class AuthModule { }
