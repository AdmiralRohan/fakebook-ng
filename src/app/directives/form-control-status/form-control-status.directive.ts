import { Directive, HostBinding } from "@angular/core";
import { FormControlName } from "@angular/forms";

@Directive({
  selector: "[formControlName]"
})
export class FormControlStatusDirective {
  constructor(public control: FormControlName) {}

  @HostBinding("class.is-valid") get valid() {
    return this.control.valid && this.control.dirty;
  }

  @HostBinding("class.is-invalid") get invalid() {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
