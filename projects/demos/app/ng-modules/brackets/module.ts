import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoComponent, WeekViewComponent } from './component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }])
  ],
  declarations: [DemoComponent, WeekViewComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
