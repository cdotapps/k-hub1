import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prompt } from '../../core/models/prompt.model';
import { FontawesomeModule } from '../../shared/fontawesome.module';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-prompt-card',
  standalone: true,
  imports: [CommonModule, FontawesomeModule],
  templateUrl: './prompt-card.component.html',
  styleUrls: ['./prompt-card.component.css']
})
export class PromptCardComponent {
  @Input() prompt!: Prompt;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Input() categoryName: string = '';
  @Input() categoryIcon: IconProp = 'folder';
  @Output() favoriteToggled = new EventEmitter<Prompt>();
  @Output() viewClicked = new EventEmitter<Prompt>();
  @Output() useClicked = new EventEmitter<Prompt>();

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.favoriteToggled.emit(this.prompt);
  }

  view(event: Event): void {
    event.stopPropagation();
    this.viewClicked.emit(this.prompt);
  }

  use(event: Event): void {
    event.stopPropagation();
    this.useClicked.emit(this.prompt);
  }
}
