import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './component';
import { PopoverComponent } from "./popover.component"; 
import { OverlayModule } from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import { PopoverDirective } from "./popover.directive";
import { StringTemplateOutletDirective } from "./string-template-outlet";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }]),
    OverlayModule,
    PortalModule
  ],
  declarations: [DemoComponent,PopoverComponent,PopoverDirective,StringTemplateOutletDirective],
  exports: [DemoComponent,PopoverComponent,PopoverDirective,StringTemplateOutletDirective],
  entryComponents:[PopoverComponent]
})
export class DemoModule {}
