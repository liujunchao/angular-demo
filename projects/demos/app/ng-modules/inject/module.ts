import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoComponent, ApiService } from './component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }])
  ],
  providers: [
    //ApiService
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
