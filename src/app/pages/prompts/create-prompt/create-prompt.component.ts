import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, EMPTY } from 'rxjs';
import { takeUntil, finalize, catchError } from 'rxjs/operators';
import { FontawesomeModule } from '../../../shared/fontawesome.module';
import { PromptService } from '../../../services/prompt.service';
import { Prompt, PromptCategory } from '../../../core/models/prompt.model';
import { PageContainerComponent } from '../../../shared/components/page-container/page-container.component';

@Component({
  selector: 'app-create-prompt',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FontawesomeModule,
    PageContainerComponent
  ],
  templateUrl: './create-prompt.component.html',
  styleUrls: ['./create-prompt.component.css']
})
export class CreatePromptComponent implements OnInit, OnDestroy {
  promptForm!: FormGroup;
  categories: PromptCategory[] = [];
  isLoading = false;
  isSaving = false;
  error: string | null = null;
  tagsInput = '';
  placeholderExample = '{{data}}'; // Add this property for template binding
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.promptForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required],
      tags: [[]]
    });
  }

  loadCategories(): void {
    this.isLoading = true;
    
    this.promptService.getCategories()
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.error = `Failed to load categories: ${error.message}`;
          console.error('Error loading categories:', error);
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });
  }

  // Handle tags input
  addTag(): void {
    if (!this.tagsInput.trim()) return;
    
    const currentTags = this.promptForm.get('tags')?.value || [];
    const newTag = this.tagsInput.trim();
    
    if (!currentTags.includes(newTag)) {
      this.promptForm.get('tags')?.setValue([...currentTags, newTag]);
    }
    
    this.tagsInput = '';
  }

  removeTag(tagToRemove: string): void {
    const currentTags = this.promptForm.get('tags')?.value || [];
    this.promptForm.get('tags')?.setValue(
      currentTags.filter((tag: string) => tag !== tagToRemove)
    );
  }

  onSubmit(): void {
    if (this.promptForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.promptForm.controls).forEach(key => {
        const control = this.promptForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSaving = true;
    this.error = null;
    
    const formValues = this.promptForm.value;
    
    this.promptService.createPrompt(formValues)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.error = `Failed to create prompt: ${error.message}`;
          console.error('Error creating prompt:', error);
          return EMPTY;
        }),
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (createdPrompt) => {
          console.log('Prompt created successfully:', createdPrompt);
          // Navigate to the newly created prompt detail page
          this.router.navigate(['/prompts', createdPrompt.id]);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/prompts']);
  }
}
