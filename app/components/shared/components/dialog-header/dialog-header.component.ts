import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent implements OnInit {

  constructor() { }
  @Input() dialog: any;
  @Input() dialogTitle: any = '';
  ngOnInit(): void {
  }
  closeDialog() {
    if(this.dialog){
      this.dialog.close()
    }
  }
}
