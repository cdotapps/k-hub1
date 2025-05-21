import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontawesomeModule } from '../../shared/fontawesome.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FontawesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
}
