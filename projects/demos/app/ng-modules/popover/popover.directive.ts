import {
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
  OnInit,
  TemplateRef,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy  
} from '@angular/core';
import { PopoverComponent } from './popover.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TooltipTrigger } from './trigger-types';


@Directive({
  selector: '[popover]',
  exportAs: 'popover',
  host: {
    
  }
})
export class PopoverDirective implements OnInit, OnChanges, AfterViewInit,OnDestroy {
  @Input('popoverTitle') specificTitle: TemplateRef<void>;
  @Input('popoverContent') specificContent: TemplateRef<void>;
  @Input('popoverTrigger') specificTrigger: TooltipTrigger;
  @Input('popoverPlacement') specificPlacement: string;
  @Input('popoverVisible') specificVisible: boolean = false;
  @Output() popoverVisibleChange = new EventEmitter<boolean>();
  @Input() mouseEnterDelay = 0.15; // second
  @Input() mouseLeaveDelay = 0.1; // second

  componentFactory: ComponentFactory<PopoverComponent> = this.resolver.resolveComponentFactory(PopoverComponent);

  tooltip: PopoverComponent;

  triggerUnlisteners: Array<() => void> = [];

  delayTimer:any = null;

  constructor(
    public elementRef: ElementRef,
    private hostView: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.createDynamicTooltipComponent();     
    this.tooltip.specificVisibleChange.subscribe((value: boolean) => {
      this.popoverVisibleChange.emit(value);
    });
  }

  ngOnDestroy(){
    this.triggerUnlisteners.forEach(obj=>obj());
  }

  show() {
    this.tooltip.show();
  }

  hide() {
    this.tooltip.hide();
  }

  ngAfterViewInit() {
    this.triggerListeners();
  }

  triggerListeners() {
    const el = this.elementRef.nativeElement;
    if (this.tooltip.specificTrigger === 'hover') {
      let overlayElement: HTMLElement;
      this.triggerUnlisteners.push(
        this.renderer.listen(el, 'mouseenter', () => {
          this.delayEnterLeave(true, true,this.mouseEnterDelay);
        })
      );
      this.triggerUnlisteners.push(
        this.renderer.listen(el, 'mouseleave', () => {
          this.delayEnterLeave(true, false,this.mouseLeaveDelay);
          if (this.tooltip.overlay.overlayRef && !overlayElement) {
            overlayElement = this.tooltip.overlay.overlayRef.overlayElement;
            this.triggerUnlisteners.push(
              this.renderer.listen(overlayElement, 'mouseenter', () => {
                this.delayEnterLeave(false, true);
              })
            );
            this.triggerUnlisteners.push(
              this.renderer.listen(overlayElement, 'mouseleave', () => {
                this.delayEnterLeave(false, false);
              })
            );
          }
        })
      );
    } else if (this.tooltip.specificTrigger === 'focus') {
      this.triggerUnlisteners.push(
        this.renderer.listen(el, 'focus', () => this.show())
      );
      this.triggerUnlisteners.push(
        this.renderer.listen(el, 'blur', () => this.hide())
      );
    } else if (this.tooltip.specificTrigger === 'click') {
      this.triggerUnlisteners.push(
        this.renderer.listen(el, 'click', e => {
          e.preventDefault(); 
          if (this.tooltip.specificVisible) {
            this.tooltip.hide();
          } else {
            this.tooltip.show();
          }
        })
      );
    }
  }

  private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = undefined;
    } else if (delay > 0) {
      this.delayTimer = setTimeout(() => {
        this.delayTimer = undefined;
        isEnter ? this.show() : this.hide();
      }, delay * 1000);
    } else {
      // `isOrigin` is used due to the tooltip will not hide immediately
      // (may caused by the fade-out animation).
      isEnter && isOrigin ? this.show() : this.hide();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tooltip) {
      this.updateChangedProperties(changes);
    }
  }

  protected createDynamicTooltipComponent(): void {
    const tooltipRef = this.hostView.createComponent(this.componentFactory);
    this.tooltip = tooltipRef.instance;
    this.renderer.removeChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      tooltipRef.location.nativeElement
    ); // Remove the component's DOM because it should be in the overlay container.
    this.tooltip.setOverlayOrigin(this as CdkOverlayOrigin);
    // Update all properties to the component.
    this.updateChangedProperties([
      'specificTitle',
      'specificContent',
      'specificTrigger',
      'specificPlacement',
      'specificVisible'
    ]);
  }

  protected updateChangedProperties(
    propertiesOrChanges: string[] | SimpleChanges
  ): void {
    const isArray = Array.isArray(propertiesOrChanges);
    const keys_ = isArray
      ? (propertiesOrChanges as string[])
      : Object.keys(propertiesOrChanges);
    keys_.forEach((property: any) => {
      this.updateComponentValue(property, this[property]);
    });
    this.tooltip.updateByDirective();
  }

  private updateComponentValue(key: string, value: any): void {
    if (value != null) {
      this.tooltip[key] = value;
    }
  }
}
