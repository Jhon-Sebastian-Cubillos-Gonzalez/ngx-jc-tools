import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Glow, Skew } from '../../../../libs/effects/src/public-api';

@Component({
  selector: 'ng-doc-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Glow,
    Skew
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'docs';
}
