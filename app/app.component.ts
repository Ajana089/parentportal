import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from './components/shared/services/spinner.service';
import { ProgressSpinnerComponent } from './components/shared/components/progress-spinner/progress-spinner.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './components/shared/interceptor/custom-interceptor';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressSpinnerComponent, CommonModule ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
  },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {ngSkipHydration: 'true'},
})

export class AppComponent {
  title: any = 'Uniform App';
  color: any = 'primary';
  mode: any = 'indeterminate';
  value: any = 50;

  loading: any = false;

  constructor(public spinnerService: SpinnerService) {
    //this.loading = spinnerService.visibility;

    this.spinnerService.visibility.subscribe((value)=> this.loading = value)
    
    this.spinnerService.visibility.subscribe(event => {
      // if (!event)
      //  this.visibility = event;
    });  
  }


  


}
