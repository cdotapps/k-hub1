import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { Prompt, PromptCategory } from '../core/models/prompt.model';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  // API URL - in a real app, this would come from environment config
  private apiUrl = 'https://api.khub.example/api/v1';
  
  // Mock data for prompts
  private mockPrompts: Prompt[] = [
    {
      id: '1',
      title: 'Quarterly Forecast Analysis',
      description: 'Generate a comprehensive analysis of quarterly forecast data with key insights',
      content: 'Analyze the following quarterly forecast data: {{data}}. Provide insights on trends, anomalies, and key drivers. Include a summary of performance against targets and recommendations for adjustments.',
      category: 'forecasting',
      tags: ['financial analysis', 'quarterly review', 'forecasting'],
      dateCreated: new Date('2025-04-15'),
      lastModified: new Date('2025-05-01'),
      authorId: 'user1',
      authorName: 'Jane Smith',
      likes: 24,
      usageCount: 78,
      isFavorite: true,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    },
    {
      id: '2',
      title: 'Treasury Risk Assessment',
      description: 'Evaluate treasury risks and generate mitigation strategies',
      content: 'Based on the following treasury data: {{data}}, identify key risks including liquidity, interest rate, and currency risks. Provide a detailed assessment with risk scores and recommend targeted mitigation strategies for each risk category.',
      category: 'treasury',
      tags: ['risk management', 'treasury', 'mitigation'],
      dateCreated: new Date('2025-03-22'),
      lastModified: new Date('2025-04-18'),
      authorId: 'user2',
      authorName: 'Robert Chen',
      likes: 16,
      usageCount: 42,
      isFavorite: false,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    },
    {
      id: '3',
      title: 'Hedge Effectiveness Testing',
      description: 'Create a comprehensive hedge effectiveness test report',
      content: 'Perform hedge effectiveness testing using the following data: {{data}}. Include prospective and retrospective tests, regression analysis, and dollar offset method. Provide interpretation of results according to accounting standards and recommendations.',
      category: 'hedge',
      tags: ['hedge accounting', 'effectiveness testing', 'regression analysis'],
      dateCreated: new Date('2025-02-10'),
      lastModified: new Date('2025-05-05'),
      authorId: 'user3',
      authorName: 'Maria Garcia',
      likes: 31,
      usageCount: 55,
      isFavorite: true,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    },
    {
      id: '4',
      title: 'MRP Optimization Strategy',
      description: 'Generate an optimized material requirements planning strategy',
      content: 'Analyze the current MRP data: {{data}}. Identify bottlenecks and inefficiencies in the current process. Create an optimized MRP strategy with specific recommendations for inventory levels, lead times, and production scheduling to improve efficiency and reduce costs.',
      category: 'mrp',
      tags: ['material planning', 'optimization', 'supply chain'],
      dateCreated: new Date('2025-01-28'),
      lastModified: new Date('2025-04-12'),
      authorId: 'user4',
      authorName: 'Thomas Williams',
      likes: 19,
      usageCount: 37,
      isFavorite: false,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    },
    {
      id: '5',
      title: 'ESR Compliance Report',
      description: 'Generate a detailed environmental and social responsibility compliance report',
      content: 'Create a comprehensive ESR compliance report using the following data: {{data}}. Include assessment of environmental impact, social responsibility measures, compliance with regulations, gap analysis, and recommendations for improvement areas.',
      category: 'esr',
      tags: ['compliance', 'environmental', 'social responsibility'],
      dateCreated: new Date('2025-03-05'),
      lastModified: new Date('2025-05-10'),
      authorId: 'user5',
      authorName: 'Sarah Johnson',
      likes: 28,
      usageCount: 49,
      isFavorite: true,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    },
    {
      id: '6',
      title: 'FP&A Monthly Review',
      description: 'Generate a comprehensive monthly financial planning and analysis review',
      content: 'Using the provided monthly financial data: {{data}}, prepare an FP&A review that includes variance analysis, key performance indicators, trend analysis, root cause identification for significant variances, and recommendations for corrective actions.',
      category: 'fpa',
      tags: ['financial planning', 'analysis', 'monthly review'],
      dateCreated: new Date('2025-04-02'),
      lastModified: new Date('2025-05-08'),
      authorId: 'user1',
      authorName: 'Jane Smith',
      likes: 22,
      usageCount: 63,
      isFavorite: false,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    },
    {
      id: '7',
      title: 'Revenue Forecasting Model',
      description: 'Create an AI-powered revenue forecasting model with scenario analysis',
      content: 'Develop a revenue forecasting model using the historical data: {{data}}. Include time series analysis, seasonal adjustments, market factor correlations, and generate three scenarios (conservative, baseline, optimistic) with confidence intervals for each prediction.',
      category: 'forecasting',
      tags: ['revenue', 'forecasting', 'scenarios'],
      dateCreated: new Date('2025-04-25'),
      lastModified: new Date('2025-05-12'),
      authorId: 'user2',
      authorName: 'Robert Chen',
      likes: 15,
      usageCount: 31,
      isFavorite: true,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    },
    {
      id: '8',
      title: 'Liquidity Risk Dashboard',
      description: 'Generate a comprehensive treasury liquidity risk dashboard',
      content: 'Using the treasury data: {{data}}, create a liquidity risk dashboard that visualizes key metrics including current ratio, quick ratio, cash conversion cycle, liquidity forecasts, stress test results, and funding concentration risks with actionable insights.',
      category: 'treasury',
      tags: ['liquidity', 'dashboard', 'risk analysis'],
      dateCreated: new Date('2025-03-18'),
      lastModified: new Date('2025-05-07'),
      authorId: 'user3',
      authorName: 'Maria Garcia',
      likes: 26,
      usageCount: 45,
      isFavorite: false,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    }
  ];

  private mockCategories: PromptCategory[] = [
    {
      id: 'forecasting',
      name: 'Forecasting',
      description: 'Prompts for financial and business forecasting',
      count: 2,
      iconName: 'chart-line'
    },
    {
      id: 'treasury',
      name: 'Treasury',
      description: 'Treasury management and analysis prompts',
      count: 2,
      iconName: 'landmark'
    },
    {
      id: 'hedge',
      name: 'Hedge Accounting',
      description: 'Prompts for hedge accounting and effectiveness testing',
      count: 1,
      iconName: 'balance-scale'
    },
    {
      id: 'mrp',
      name: 'MRP',
      description: 'Material requirements planning prompts',
      count: 1,
      iconName: 'industry'
    },
    {
      id: 'esr',
      name: 'ESR',
      description: 'Environmental and social responsibility prompts',
      count: 1,
      iconName: 'leaf'
    },
    {
      id: 'fpa',
      name: 'FP&A',
      description: 'Financial planning and analysis prompts',
      count: 1, 
      iconName: 'calculator'
    }
  ];

  constructor() { }

  /**
   * Get prompts with optional filtering
   * Simulates an API call to a backend server
   */
  getPrompts(category?: string, searchTerm?: string): Observable<Prompt[]> {
    console.log('API Request: GET prompts with filters:', { category, searchTerm });
    
    // Simulate API request parameters
    const params = new URLSearchParams();
    if (category && category !== 'all') {
      params.append('category', category);
    }
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    
    // Log the simulated API call
    console.log(`Making API request to: ${this.apiUrl}/prompts?${params.toString()}`);
    
    // Simulate network activity and potential failure (10% chance of error for demo purposes)
    const shouldFail = Math.random() < 0.1;
    
    if (shouldFail) {
      console.error('API request failed with server error');
      return throwError(() => new Error('Failed to fetch prompts from server'))
        .pipe(delay(800)); // Simulate network delay
    }
    
    // Filter prompts based on category and search term (simulating backend filtering)
    let filteredPrompts = this.mockPrompts;
    
    if (category && category !== 'all') {
      filteredPrompts = filteredPrompts.filter(prompt => prompt.category === category);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredPrompts = filteredPrompts.filter(prompt => 
        prompt.title.toLowerCase().includes(term) || 
        prompt.description.toLowerCase().includes(term) || 
        prompt.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Log successful response
    console.log(`API returned ${filteredPrompts.length} prompts`);
    
    // Return the filtered prompts with a delay to simulate network latency
    return of(filteredPrompts).pipe(
      delay(800),
      tap(() => console.log('API call completed successfully'))
    );
  }

  /**
   * Get prompt categories
   * Simulates an API call to the backend
   */
  getCategories(): Observable<PromptCategory[]> {
    console.log(`Making API request to: ${this.apiUrl}/prompt-categories`);
    
    // Simulate network activity
    return of(this.mockCategories).pipe(
      delay(600),
      tap(() => console.log('Categories API call completed successfully')),
      catchError(error => {
        console.error('Failed to fetch categories:', error);
        return throwError(() => new Error('Failed to load categories'));
      })
    );
  }

  /**
   * Get a specific prompt by ID
   * Simulates an API call to fetch a single prompt
   */
  getPromptById(id: string): Observable<Prompt | undefined> {
    console.log(`Making API request to: ${this.apiUrl}/prompts/${id}`);
    
    const prompt = this.mockPrompts.find(p => p.id === id);
    
    if (!prompt) {
      console.error(`Prompt with ID ${id} not found`);
      return throwError(() => new Error(`Prompt with ID ${id} not found`))
        .pipe(delay(300));
    }
    
    return of(prompt).pipe(
      delay(500),
      tap(() => console.log(`Successfully fetched prompt: ${prompt.title}`))
    );
  }

  /**
   * Toggle the favorite status of a prompt
   * Simulates an API PUT request
   */
  toggleFavorite(id: string): Observable<boolean> {
    console.log(`Making API request to: ${this.apiUrl}/prompts/${id}/toggle-favorite (PUT)`);
    
    const prompt = this.mockPrompts.find(p => p.id === id);
    if (!prompt) {
      return throwError(() => new Error(`Prompt with ID ${id} not found`))
        .pipe(delay(300));
    }
    
    // Toggle favorite status
    prompt.isFavorite = !prompt.isFavorite;
    
    // Return the new status
    return of(prompt.isFavorite).pipe(
      delay(400),
      tap(isFavorite => console.log(`Prompt favorite status updated to: ${isFavorite}`))
    );
  }

  /**
   * Increment the usage count for a prompt
   * Simulates an API POST request
   */
  incrementUsageCount(id: string): Observable<number> {
    console.log(`Making API request to: ${this.apiUrl}/prompts/${id}/increment-usage (POST)`);
    
    const prompt = this.mockPrompts.find(p => p.id === id);
    if (!prompt) {
      return throwError(() => new Error(`Prompt with ID ${id} not found`))
        .pipe(delay(300));
    }
    
    // Increment usage count
    prompt.usageCount += 1;
    
    // Return the new usage count
    return of(prompt.usageCount).pipe(
      delay(300),
      tap(count => console.log(`Prompt usage count updated to: ${count}`))
    );
  }

  /**
   * Create a new prompt
   * Simulates an API POST request
   */
  createPrompt(promptData: Partial<Prompt>): Observable<Prompt> {
    console.log(`Making API request to: ${this.apiUrl}/prompts (POST)`, promptData);
    
    // Simulate network latency and potential failure (10% chance)
    const shouldFail = Math.random() < 0.1;
    
    if (shouldFail) {
      console.error('API request failed with server error');
      return throwError(() => new Error('Failed to create prompt'))
        .pipe(delay(800));
    }
    
    // In a real application, the backend would generate an ID and timestamps
    const newPrompt: Prompt = {
      id: `new-${Date.now()}`,  // Generate a temporary ID
      title: promptData.title || '',
      description: promptData.description || '',
      content: promptData.content || '',
      category: promptData.category || '',
      tags: promptData.tags || [],
      dateCreated: new Date(),
      lastModified: new Date(),
      authorId: 'current-user', // In a real app, this would come from auth
      authorName: 'Current User', // In a real app, this would come from auth
      likes: 0,
      usageCount: 0,
      isFavorite: false,
      catalogId: 'cat-prompts',
      catalogName: 'Prompts Catalog',
      catalogDescription: 'Collection of all prompts for finance professionals'
    };
    
    // Add to our mock data
    this.mockPrompts.unshift(newPrompt);
    
    // Update category count
    const category = this.mockCategories.find(c => c.id === newPrompt.category);
    if (category) {
      category.count += 1;
    }
    
    return of(newPrompt).pipe(
      delay(1000),
      tap(() => console.log('Successfully created new prompt:', newPrompt))
    );
  }
}