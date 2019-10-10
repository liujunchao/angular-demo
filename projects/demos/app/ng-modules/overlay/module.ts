import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { OverlayPanelComponent } from './overlay-panel.component';
import { CdkOverlayComponent } from './cdk-overlay.component';
import { OverlayModule } from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";

@NgModule({
  imports: [    
    CommonModule,
    OverlayModule,     
    PortalModule, 
    RouterModule.forChild([{ path: '', component: CdkOverlayComponent }])
  ],
  declarations: [OverlayPanelComponent,CdkOverlayComponent],
  entryComponents:[OverlayPanelComponent],
  exports: [OverlayPanelComponent,CdkOverlayComponent]
})
export class DemoModule {}
