import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbTabsetModule,
  NgbCollapseModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { DemoAppComponent } from './demo-app.component'; 
import { environment } from '../environments/environment';
import { CustomHammerConfig } from './hammer-config';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [DemoAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbTabsetModule,
    NgbCollapseModule,
    NgbTooltipModule,
    DragAndDropModule,
    Angulartics2Module.forRoot({
      developerMode: !environment.production
    }),
    PerfectScrollbarModule,
    ClipboardModule,
    RouterModule.forRoot(
      [ 
        {
          path: 'brackets',
          loadChildren: () =>
            import('./ng-modules/brackets/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'brackets'
          }
        }, 
        {
          path: 'ng-template-outlet',
          loadChildren: () =>
            import('./ng-modules/ng-template-outlet/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'ng-template-outlet'
          }
        }, 
        {
          path: '**',
          redirectTo: 'brackets'
        }
      ],
      {
        useHash: true
      }
    )
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {}
