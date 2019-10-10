import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoComponent,MyIf } from './component';
@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild([{ path: '', component: DemoComponent }])
  ],
  declarations: [MyIf,DemoComponent],
  exports: [DemoComponent] 
})
export class DemoModule {}
