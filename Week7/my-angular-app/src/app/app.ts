import { Component } from '@angular/core';
import { Student } from './student/student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Student],
  template: `
    <h1>Angular CLI Demonstration</h1>
    <app-student></app-student>
  `,
  styleUrl: './app.css'
})
export class App {
}
