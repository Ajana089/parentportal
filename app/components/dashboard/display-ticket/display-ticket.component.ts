import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../shared/models/user.model';
import { SignalrService } from '../../auth/services/signalr.service';
import { TextToSpeechService } from '../../auth/services/text-to-speech.service';

@Component({
  selector: 'app-display-ticket',
  templateUrl: './display-ticket.component.html',
  styleUrl: './display-ticket.component.css'
})
export class DisplayTicketComponent implements OnInit {

   loggedInUser: User;
   tickets: any[] = [];
   school_name: any = '';
   textList = Array(5).fill(0);
   schoolVideo: any = '';
   totaltickets: any = 0;

   @ViewChild('videoPlayer') videoPlayer!: ElementRef;

    ngAfterViewInit() {
      this.videoPlayer.nativeElement.play();
    }

      constructor(
        private dashboardService: DashboardService,
         private authService: AuthService,
         private signalRService: SignalrService,
         private tts: TextToSpeechService
      ) {
      }

      ngOnInit() { 

        this.loggedInUser = this.authService.getLoggedInUser();
        // this.school_name = this.loggedInUser.School_Name;
        // this.schoolVideo =  this.loggedInUser.SchoolVideo;
        this.loadData();
        
        this.signalRService.startConnection();

        this.signalRService.refreshQueue$.subscribe(() => {       
          this.loadData();
        });

     }

     currentBlinkIndex = -1;
     blinkDuration = 10000; // 10 seconds

      startSequentialBlink() {

        if (!this.tickets || this.tickets.length === 0) return;

        this.currentBlinkIndex = 0;
        this.blinkNext();
      }

       blinkNext() {
          // Stop if finished
          if (this.currentBlinkIndex >= this.tickets.length) {
            return;
        }

        // Blink current ticket
        const ticket = this.tickets[this.currentBlinkIndex];

        if (ticket.IsDisplayOnScreen) {
          this.blinkNext();
        }

        ticket.isCalled = true;

        // 🔊 Voice Announcement
        // await this.speak(
        //   `Token ${ticket.TicketNo}, please proceed to ${ticket.CounterName}`
        // );

        this.tts.speak( `Token ${ticket.TicketNo}, please proceed to ${ticket.CounterName}`);

        setTimeout(() => {
            ticket.isCalled = false;
            
            this.dashboardService.updateTicketDisplayScreen(ticket.ID).subscribe((res: any) => {
             });

            this.currentBlinkIndex++;
            this.blinkNext();

          }, this.blinkDuration);
      }

     loadData() {
      this.dashboardService.getDisplayTickets().subscribe((res: any) => {
        var result = res;
          this.tickets = res;

          this.totaltickets = this.tickets.length;

          if (result && result.length > 0) {

             this.startSequentialBlink();
          }
        });
     }

    speak(text: string): Promise<void> {
        return new Promise((resolve) => {
          const speech = new SpeechSynthesisUtterance(text);

          speech.lang = 'en-US'; // change if needed
          speech.rate = 0.9;     // speed (0.5 slow – 1 normal – 1.5 fast)
          speech.pitch = 1;      // voice tone
          speech.volume = 1;     // max volume

          speech.onend = () => {
            resolve(); // Continue after speaking finishes
          };

          window.speechSynthesis.speak(speech);
        });
  }

}
