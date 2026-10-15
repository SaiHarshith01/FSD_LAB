import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class Student {
  studentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),
    message: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.studentForm.valid) {
      alert('Form submitted successfully!');
      console.log(this.studentForm.value);
      this.studentForm.reset();
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
}