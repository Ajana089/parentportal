import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  speak(text: string, lang: string = 'en-US') {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech not supported in this browser');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.7;   // 0.1 to 10
    utterance.pitch = 1; // 0 to 2
    utterance.volume = 1; // 0 to 1

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}