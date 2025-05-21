import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PromptsComponent } from './pages/prompts/prompts.component';
import { PromptDetailComponent } from './pages/prompts/prompt-detail/prompt-detail.component';
import { CreatePromptComponent } from './pages/prompts/create-prompt/create-prompt.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'prompts',
        component: PromptsComponent
      },
      {
        path: 'prompts/create',
        component: CreatePromptComponent
      },
      {
        path: 'prompts/:id',
        component: PromptDetailComponent
      }
      // Additional routes will go here
    ]
  }
];
