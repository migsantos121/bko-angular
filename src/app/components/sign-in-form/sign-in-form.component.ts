import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'bo-sign-in-form',
  styleUrls: ['./sign-in-form.component.css'],
  template: `
  <form class="form-container" id="form-login" class="form-container" role="form" (ngSubmit)="onSubmit()" [formGroup]="signInForm">
      <h4 class="ks-header">Login</h4>
      <div class="form-group">
          <div class="input-icon icon-left icon-lg icon-color-primary">
              <input type="text" name="username" formControlName="username" class="form-control" placeholder="Username">
              <span class="icon-addon">
                  <span class="la la-at"></span>
              </span>
          </div>
      </div>
      <div class="form-group">
          <div class="input-icon icon-left icon-lg icon-color-primary">
              <input type="password" name="password" formControlName="password" class="form-control" placeholder="Password">
              <span class="icon-addon">
                  <span class="la la-key"></span>
              </span>
          </div>
      </div>
      <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block" [disabled]="isPending">Login</button>
      </div>
      <div class="ks-text-center">
          <a href="pages-forgot-password.html">Forgot your password?</a>
      </div>

  </form>
  `
})
export class SignInFormComponent {

  @Input() isPending;
  @Output() onFormSubmit = new EventEmitter();

  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.signInForm.status === 'VALID') {
      this.onFormSubmit.emit(this.signInForm.value);
    }
  }
}
