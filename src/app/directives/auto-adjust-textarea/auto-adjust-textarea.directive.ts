import { Directive, HostListener, ElementRef, Renderer } from "@angular/core";

@Directive({
  selector: "[appAutoAdjustTextarea]"
})
export class AutoAdjustTextareaDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {}

  @HostListener("keyup")
  public onKeyup(): void {
    this.renderer.setElementStyle(this.el.nativeElement, "height", "auto");
    this.renderer.setElementStyle(
      this.el.nativeElement,
      "height",
      `${this.el.nativeElement.scrollHeight}px`
    );
  }
}
