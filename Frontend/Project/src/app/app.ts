import { Component } from '@angular/core';
import { Registration } from './registration/registration';

@Component({
  selector: 'app-root',
  imports: [Registration],
  template: '<app-registration></app-registration>',
  styleUrl: './app.css'
})
export class App {
}
