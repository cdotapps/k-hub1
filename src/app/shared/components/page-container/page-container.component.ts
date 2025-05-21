import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showHeader: boolean = true;
  @Input() cardStyle: boolean = true;
  @Input() fullWidth: boolean = false;
}
