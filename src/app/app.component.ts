import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { RegidtrationFormComponent } from './regidtration-form/regidtration-form.component';
import { WaitingpageComponent } from './waitingpage/waitingpage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parentportal';
}
