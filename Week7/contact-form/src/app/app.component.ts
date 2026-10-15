import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contactForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]+$')
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    phone: ['', [
      Validators.required,
      Validators.pattern('^[6-9][0-9]{9}$')
    ]],

    message: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]]
  });

  constructor(private fb: FormBuilder) {}

  submitForm() {
    if (this.contactForm.valid) {
      alert('Form submitted successfully!');
      console.log(this.contactForm.value);
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}