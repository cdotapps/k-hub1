import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomeModule } from '../../shared/fontawesome.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontawesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
