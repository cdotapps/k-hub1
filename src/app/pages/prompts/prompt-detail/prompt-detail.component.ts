import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontawesomeModule } from '../../../shared/fontawesome.module';
import { PromptService } from '../../../services/prompt.service';
import { Prompt, PromptCategory } from '../../../core/models/prompt.model';
import { Subject } from 'rxjs';
import { takeUntil, catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PageContainerComponent } from '../../../shared/components/page-container/page-container.component';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FontawesomeModule, PageContainerComponent],
  templateUrl: './prompt-detail.component.html',
  styleUrls: ['./prompt-detail.component.css']
})
export class PromptDetailComponent implements OnInit, OnDestroy {
  promptId: string = '';
  prompt: Prompt | undefined;
  categories: PromptCategory[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private promptService: PromptService
  ) { }

  ngOnInit(): void {
    // Get the prompt ID from the route parameters
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.promptId = params['id'];
      if (this.promptId) {
        this.loadPrompt();
        this.loadCategories();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPrompt(): void {
    this.isLoading = true;
    this.error = null;
    
    this.promptService.getPromptById(this.promptId).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.error = `Failed to load prompt: ${error.message}`;
        console.error('Error loading prompt:', error);
        return EMPTY;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(prompt => {
      if (prompt) {
        this.prompt = prompt;
      }
    });
  }

  loadCategories(): void {
    this.promptService.getCategories().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading categories:', error);
        return EMPTY;
      })
    ).subscribe(categories => {
      this.categories = categories;
    });
  }

  toggleFavorite(): void {
    if (!this.prompt) return;
    
    this.prompt.isFavorite = !this.prompt.isFavorite; // Optimistic update
    
    this.promptService.toggleFavorite(this.prompt.id).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        // Revert on error
        if (this.prompt) {
          this.prompt.isFavorite = !this.prompt.isFavorite;
        }
        console.error('Error toggling favorite:', error);
        return EMPTY;
      })
    ).subscribe();
  }

  usePrompt(): void {
    if (!this.prompt) return;
    
    // Optimistic update
    this.prompt.usageCount += 1;
    
    this.promptService.incrementUsageCount(this.prompt.id).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        // Revert on error
        if (this.prompt) {
          this.prompt.usageCount -= 1;
        }
        console.error('Error incrementing usage count:', error);
        return EMPTY;
      })
    ).subscribe();
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getCategoryIcon(categoryId: string): IconProp {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.iconName as IconProp : 'folder' as IconProp;
  }

  goBack(): void {
    this.router.navigate(['/prompts']);
  }
}
