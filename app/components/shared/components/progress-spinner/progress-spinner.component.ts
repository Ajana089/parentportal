import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, DoCheck } from '@angular/core';
import { OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ThemePalette } from '@angular/material/core';
import { OverlayService } from '../../services/overlay.service';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  providers: [OverlayService],
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {
  @Input() color?: ThemePalette;
  @Input() diameter?: number = 100;
  @Input() mode?: ProgressSpinnerMode = 'determinate';
  @Input() strokeWidth?: number;
  @Input() value?: number;
  @Input() backdropEnabled? = true;
  @Input() positionGloballyCenter?: any = true;
  @Input() displayProgressSpinner?: any = false;

  @ViewChild('tpl') tpl: TemplateRef<any>;

  @ViewChild('progressSpinnerRef') progressSpinnerRef : TemplateRef<any>;
  private progressSpinnerOverlayConfig: OverlayConfig;
  private overlayRef: OverlayRef;
  constructor(private vcRef: ViewContainerRef, private overlayService: OverlayService) {
   }
  ngOnInit() {
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig['positionStrategy'] = this.overlayService.positionGloballyCenter();
    }
    
    this.overlayRef = this.overlayService.createOverlay(this.progressSpinnerOverlayConfig);
  }


  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.displayProgressSpinner && !this.overlayRef.hasAttached()) {
      this.overlayService.attachTemplatePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }


  @ViewChild('container', { read: ViewContainerRef }) _vcr;



  ngAfterViewInit() {
    // console.info(this.vcRef);
    // console.info(this._vcr);

    // this._vcr.createEmbeddedView(this.progressSpinnerRef);
    // this.vcRef.createEmbeddedView(this.progressSpinnerRef);
  }


}