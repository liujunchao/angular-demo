import { Component, Output, EventEmitter } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
  query
} from '@angular/animations';

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html',
  styles: [``],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      // keyframes多阶段动画(任何状态切换的时候都使用该动画)
      transition('* => *', [
        animate(
          14000,
          keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            // 多往右边移除一点
            style({ opacity: 1, transform: 'translateX(50%)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
          ])
        )
      ])
    ]),
    trigger('flyInOutB', [
       // state('out', style({opacity: 1, transform: 'translateX(0) scale(1)'})),
        // 进场动画
        transition('void => *', [
            style({opacity: 0, transform: 'translateX(-100%) scale(0)'}),
            animate(500)
        ]),
        // 出场动画
        transition('* => void', [
            animate(500, style({opacity: 0, transform: 'translateX(100%) scale(0)'}))
        ])
    ]),
    trigger('queryAnimation', [
      // 入场的时候对子元素采用动画
      transition('* => goAnimate', [
          // hide the inner elements
          query('h1', style({
              opacity: 0
          })),
          query('.content', style({
              opacity: 0
          })),
          // 动画作用于内容元素
          query('h1', animate(1000, style({
              opacity: 1
          }))),
          query('.content', animate(1000, style({
              opacity: 1
          })))
      ])
  ])

  ]
})
export class DemoComponent {
  isVisible = false;
}
