import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FontawesomeModule } from '../../shared/fontawesome.module';
import { PromptService } from '../../services/prompt.service';
import { Prompt, PromptCategory } from '../../core/models/prompt.model';
import { debounceTime, distinctUntilChanged, Subject, finalize, catchError, EMPTY } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PromptCardComponent } from '../../components/prompt-card/prompt-card.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PageContainerComponent } from '../../shared/components/page-container/page-container.component';

@Component({
  selector: 'app-prompts',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    FontawesomeModule, 
    PromptCardComponent,
    PageContainerComponent
  ],
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.css'],
})
export class PromptsComponent implements OnInit {
  // Search and filter properties
  searchTerm: string = '';
  selectedCategory: string = 'all';
  sortOption: string = 'newest';

  // Data properties
  prompts: Prompt[] = [];
  filteredPrompts: Prompt[] = [];
  categories: PromptCategory[] = [];
  
  // UI state properties
  isLoading: boolean = true;
  isCategoriesLoading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 12;
  viewType: 'grid' | 'list' = 'grid'; // Track current view type
  
  // RxJS subjects for cleanup and search debouncing
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(private promptService: PromptService, private router: Router) {}

  ngOnInit(): void {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.filterPrompts();
    });
    
    // Load initial data
    this.loadCategoriesFromApi();
    this.loadPromptsFromApi();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPromptsFromApi(): void {
    this.isLoading = true;
    this.error = null;
    
    this.promptService.getPrompts(
      this.selectedCategory !== 'all' ? this.selectedCategory : undefined,
      this.searchTerm || undefined
    ).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.error = `Failed to load prompts: ${error.message}`;
        console.error('Error in API call:', error);
        return EMPTY;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (prompts) => {
        this.prompts = prompts;
        this.sortPrompts();
      }
    });
  }

  loadCategoriesFromApi(): void {
    this.isCategoriesLoading = true;
    
    this.promptService.getCategories().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading categories:', error);
        return EMPTY;
      }),
      finalize(() => {
        this.isCategoriesLoading = false;
      })
    )
    .subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }

  searchPrompts(): void {
    this.searchSubject.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject.next('');
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.loadPromptsFromApi();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.loadPromptsFromApi();
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getCategoryIcon(categoryId: string): IconProp {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.iconName as IconProp : 'folder' as IconProp;
  }

  filterPrompts(): void {
    // This is now handled by the API service
    this.loadPromptsFromApi();
  }

  sortPrompts(): void {
    if (!this.prompts.length) return;

    // Create a copy of the prompts array to sort
    this.filteredPrompts = [...this.prompts];

    switch (this.sortOption) {
      case 'newest':
        this.filteredPrompts.sort((a, b) => 
          new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
        break;
      case 'popular':
        this.filteredPrompts.sort((a, b) => b.likes - a.likes);
        break;
      case 'mostUsed':
        this.filteredPrompts.sort((a, b) => b.usageCount - a.usageCount);
        break;
      case 'alphabetical':
        this.filteredPrompts.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Update pagination
    this.totalPages = Math.ceil(this.filteredPrompts.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  toggleFavorite(prompt: Prompt): void {
    prompt.isFavorite = !prompt.isFavorite; // Optimistic update
    
    this.promptService.toggleFavorite(prompt.id).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        // Revert the optimistic update on error
        prompt.isFavorite = !prompt.isFavorite;
        console.error('Error toggling favorite:', error);
        return EMPTY;
      })
    )
    .subscribe();
  }

  viewPrompt(prompt: Prompt): void {
    // Navigate to prompt detail page
    this.router.navigate(['/prompts', prompt.id]);
  }

  usePrompt(prompt: Prompt): void {
    // Optimistic update
    prompt.usageCount += 1;
    
    this.promptService.incrementUsageCount(prompt.id).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        // Revert the optimistic update on error
        prompt.usageCount -= 1;
        console.error('Error incrementing usage count:', error);
        return EMPTY;
      })
    )
    .subscribe();
  }
  
  switchView(viewType: 'grid' | 'list'): void {
    this.viewType = viewType;
  }
}