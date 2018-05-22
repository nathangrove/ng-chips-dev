import {Directive, Renderer, ElementRef, OnInit, AfterViewInit, Input} from '@angular/core';

@Directive({
  selector: '[focusOnInit]'
})
export class FocusOnInitDirective implements OnInit, AfterViewInit {
  @Input('focusOnInit') priority: number = 0;

  static instances: FocusOnInitDirective[] = [];

  constructor(public renderer: Renderer, public elementRef: ElementRef) {
  }

  ngOnInit(): void {
    FocusOnInitDirective.instances.push(this)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      FocusOnInitDirective.instances.splice(FocusOnInitDirective.instances.indexOf(this), 1);
    });

    if (FocusOnInitDirective.instances.every((i) => this.priority >= i.priority)) {
      this.renderer.invokeElementMethod(
        this.elementRef.nativeElement, 'focus', []);
    }
  }
}
