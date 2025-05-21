import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import './app/chart-config'; // Import Chart.js configuration

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
