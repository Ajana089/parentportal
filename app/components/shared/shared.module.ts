import { NgModule } from '@angular/core';
//import { ComponentInteractionService } from './services/component-interaction.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { AgGridModule } from 'ag-grid-angular';
import { DynamicGridComponent } from './components/dynamic-grid/dynamic-grid.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseHttpService } from './services/base-http.service';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from './services/toast.service';
import { MatTableComponent } from './components/mat-table/mat-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { OverlayService } from './services/overlay.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DialogsService } from './services/dialog.service';
import { CustomHttpInterceptor } from './interceptor/custom-interceptor';
import { MatTreeModule } from '@angular/material/tree';
// import { Ng2IziToastModule } from 'ng2-izitoast';
import { GridModalComponent } from './components/grid-modal/grid-modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { DateTemplateComponent } from './components/dynamic-grid/date-template/date-template.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { ActiveFlagTemplateComponent } from './components/dynamic-grid/active-flag-template/active-flag-template.component';
import { CommentsDialogComponent } from './components/comments-dialog/comments-dialog.component';
import { MenuItemNameTemplateComponent } from './components/dynamic-grid/menu-item-name-template/menu-item-name-template.component';
import { ComponentInteractionService } from './services/component-interaction.service';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { NbToastrService } from '@nebular/theme';
// import {NgxPrintModule} from 'ngx-print';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { SpinnerService } from './services/spinner.service';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        DialogComponent,
        DynamicGridComponent,
        DialogHeaderComponent,
        ActiveFlagTemplateComponent,
        MatTableComponent,
        ConfirmDialogComponent,
        ActiveFlagTemplateComponent,
        DateTemplateComponent,
        GridModalComponent,
        MenuItemNameTemplateComponent,
        CommentsDialogComponent,
        UploadFilesComponent
    ],
    exports: [
        DialogComponent,
        //GridModalComponent,
        DialogHeaderComponent,
        DynamicGridComponent,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        AgGridModule,
        HttpClientModule,
        RouterModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatTableComponent,
        CdkTableModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        ConfirmDialogComponent,
        MatTreeModule,
        MatTooltipModule,
        //Ng2IziToastModule,
        MatChipsModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        CommentsDialogComponent,
        UploadFilesComponent,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule
    ],
    imports: [
        MatTableModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        FormsModule,
        PortalModule,
        HttpClientModule,
        RouterModule,
        MatSnackBarModule,
        MatCheckboxModule,
        CdkTableModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatTreeModule,
        CommonModule,
        MatChipsModule,
        MatTooltipModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        NgbModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,
        MatSelectModule,
        MatTableExporterModule,
        MatSortModule,
        MatPaginatorModule,
        MatRippleModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatInputModule,
        MatRippleModule,
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableExporterModule,
    ],
    providers: [
        ComponentInteractionService,
        BaseHttpService,
        ToastService,
        OverlayService,
        DatePipe,
        DialogsService,
        NbToastrService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [],
    //entryComponents: [DialogComponent],
})
export class SharedModule { }
