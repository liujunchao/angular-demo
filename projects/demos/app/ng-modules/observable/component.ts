import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html'
})
export class DemoComponent {
  result = 0;
  strResult = '';

  constructor() {
    let observable = Observable.create(function(observer) {
      observer.next(1);

      setTimeout(() => {
        observer.next(2);
        observer.complete();
      }, 4000);
    });

    observable.subscribe({
      next: x => (this.result = x),
      error: err => console.log('error'),
      complete: () => console.log('done')
    });

    let subscription = observable.subscribe({
      next: x => (this.strResult += x)
    });

    setTimeout(() => {
      subscription.unsubscribe();
    }, 3000);
  }
}
