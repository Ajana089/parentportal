import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AppSettings } from '../../shared/helper/appsettings';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

   private hubConnection!: signalR.HubConnection;
   public messages: { user: string; message: string }[] = [];
   refreshQueue$ = new Subject<void>();


   startConnection() {

    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   //.withUrl('https://localhost:1055/offers', {
    //   .withUrl(AppSettings.signalRUrl + 'offers', {
    //     withCredentials: true,
    //     transport: signalR.HttpTransportType.WebSockets,
    //     skipNegotiation: true
    //   })
    //   .withAutomaticReconnect()
    //   .build();

    // this.hubConnection
    //   .start()
    //   .then(() => console.log('SignalR connected'))
    //   .catch(err => console.error('SignalR error:', err));

    // this.hubConnection.on('SendRefresh', () => {
    //   //console.log('SendRefresh called');
      
    //   this.refreshQueue$.next();
    // });

  }

  addMessageListener() {
    this.hubConnection.on('SendOffersToUser', (user: string, message: string) => {
      this.messages.push({ user, message });
    });

  }

  addQueueRefreshListener() {
    this.hubConnection.on('SendRefresh', (user: string, message: string) => {
      this.messages.push({ user, message });
    });

  }

  sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }

}
