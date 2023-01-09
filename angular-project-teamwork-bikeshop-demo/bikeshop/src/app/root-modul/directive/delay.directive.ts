import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective {

  constructor(
    private vc: ViewContainerRef,
    private tr: TemplateRef<any>
  ) { }

  @Input() set appDelay(time: number) {
    let delayTimeOut = setTimeout(() => {
      clearTimeout(delayTimeOut);
      this.vc.createEmbeddedView(this.tr)
    }, time)

  }


}
