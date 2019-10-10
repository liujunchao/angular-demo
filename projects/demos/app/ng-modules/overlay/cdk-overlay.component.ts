import {Component, ViewContainerRef, ViewEncapsulation,Inject,ViewChild,ElementRef} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {OverlayPanelComponent} from './overlay-panel.component';
import {DOCUMENT} from '@angular/common';
import {TemplatePortalDirective} from '@angular/cdk/portal';

@Component({
    selector: 'app-cdk-overlay',
    template: `
        <!-- 全局显示 页面中心显示 (点击的时候显示) -->
        <button (click)="showOverlayGlobalPanelCenter()">页面中心显示</button>



        <!-- 全局显示 页面中显示位置自己控制 -->
        <button style="margin-left: 10px"  (click)="showOverlayGlobalPanelPosition()">页面中显示，自己控制位置</button>



        <!-- 鼠标移入的时候显示 ng-template对应的内容，移出的时候不显示 -->
        <button style="margin-left: 10px" (mouseenter)="showOverlayPanelTemplate()"
                (mouseleave)="dismissOverlayPanelTemplate()">
            显示 ng-template 内容
        </button>
        <!-- ng-template overlay 将要显示的内容 -->
        <ng-template cdk-portal #overlayGlobalTemplate="cdkPortal">
            <p class="template-overlay-pane"> ng-temtortelliniTemplateplate显示 </p>
        </ng-template>


        <!-- 依附某个组件或者template显示,鼠标移入的时候显示，移出来的时候不显示 -->
        <button style="margin-left: 10px" #connectComponentOrigin
                (mouseenter)="showOverlayPanelConnectComponent()"
                (mouseleave)="dismissOverlayPanelConnectComponent()">
            overlay connect 组件显示
        </button>



        <button  style="margin-left: 10px"   cdk-overlay-origin #trigger="cdkOverlayOrigin" (click)="isMenuOpen = !isMenuOpen">
            指令实现
        </button>

        <ng-template cdk-connected-overlay
                    [cdkConnectedOverlayOrigin]="trigger"
                    [cdkConnectedOverlayWidth]="500"
                    cdkConnectedOverlayHasBackdrop
                    [cdkConnectedOverlayOpen]="isMenuOpen"
                    (backdropClick)="isMenuOpen=false">
            <div class="menu-wrap">
                我是通过指令实现的Overlay
            </div>
        </ng-template>

    `,
    styles: [`
    .template-overlay-pane {
        padding: 10px;
        border: 1px solid black;
        background-color: skyblue;
    }`],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})
export class CdkOverlayComponent {

    globalOverlayPosition = 0;
    private _overlayTemplateRef: OverlayRef;

    @ViewChild('overlayGlobalTemplate',{static:false}) templateGlobalPortals: TemplatePortalDirective;

    private _overlayConnectRef: OverlayRef;

    @ViewChild('connectComponentOrigin',{static:false}) _overlayConnectComponentOrigin: ElementRef;
 
    
    /**
     * overlay是否显示
     */
    isMenuOpen = false;


    constructor(public overlay: Overlay
        , public viewContainerRef: ViewContainerRef, @Inject(DOCUMENT) public _document: any) {
    }

    /**
     * overlay 在整个屏幕的中间显示
     */
    showOverlayGlobalPanelCenter() {
        // config: OverlayConfig overlay的配置，配置显示位置，和滑动策略
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global() // 全局显示
            .centerHorizontally() // 水平居中
            .centerVertically(); // 垂直居中
        config.hasBackdrop = true; // 设置overlay后面有一层背景, 当然你也可以设置backdropClass 来设置这层背景的class
        const overlayRef = this.overlay.create(config); // OverlayRef, overlay层
        overlayRef.backdropClick().subscribe(() => {
            // 点击了backdrop背景
            overlayRef.dispose();
        });
        // OverlayPanelComponent是动态组件
        // 创建一个ComponentPortal，attach到OverlayRef，这个时候我们这个overlay层就显示出来了。
        overlayRef.attach(new ComponentPortal(OverlayPanelComponent, this.viewContainerRef));
        // 监听overlayRef上的键盘按键事件
        overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
            console.log(overlayRef._keydownEventSubscriptions + ' times');
            console.log(event);
        });
    }

    
    /**
     * overlay 在整个屏幕位置，自己控制位置
     */
    showOverlayGlobalPanelPosition() {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global()
            .left(`${this.globalOverlayPosition}px`) // 自己控制位置
            .top(`${this.globalOverlayPosition}px`);
        this.globalOverlayPosition += 30;
        config.hasBackdrop = true;
        const overlayRef = this.overlay.create(config);
        overlayRef.backdropClick().subscribe(() => {
            overlayRef.dispose(); // 点击背景关掉弹窗
        });
        overlayRef.attach(new ComponentPortal(OverlayPanelComponent, this.viewContainerRef));
    }


        /**
     * 显示 ng-template 的内容
     */
    showOverlayPanelTemplate() {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .top(`${this.globalOverlayPosition}px`);
        this.globalOverlayPosition += 30;
        this._overlayTemplateRef = this.overlay.create(config);
        this._overlayTemplateRef.attach(this.templateGlobalPortals);
    }

    /**
     * 移除 ng-template 内容
     */
    dismissOverlayPanelTemplate() {
        if (this._overlayTemplateRef && this._overlayTemplateRef.hasAttached()) {
            this._overlayTemplateRef.dispose();
        }
    }



    
    /**
     * overlay connect origin 显示，依附某个组件显示
     */
    showOverlayPanelConnectComponent() {
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this._overlayConnectComponentOrigin.nativeElement)
            .withPositions([{
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
                offsetX: 0,
                offsetY: 0
            }]); // 这么理解 origin 组件(依附空组件) 的那个点(originX, originY) 和 overlay组件的点(overlayX, overlayY)
        // 重合，从而确定overlay组件显示的位置
        strategy.withLockedPosition(true);
        const config = new OverlayConfig({positionStrategy: strategy});
        config.scrollStrategy = this.overlay.scrollStrategies.reposition(); // 更随滑动的策略
        this._overlayConnectRef = this.overlay.create(config);
        this._overlayConnectRef.attach(new ComponentPortal(OverlayPanelComponent, this.viewContainerRef));
    }

    dismissOverlayPanelConnectComponent() {
        if (this._overlayConnectRef && this._overlayConnectRef.hasAttached()) {
            this._overlayConnectRef.dispose();
        }
    }



}

