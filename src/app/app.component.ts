import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontawesomeModule } from './shared/fontawesome.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontawesomeModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'K-Hub';
}
