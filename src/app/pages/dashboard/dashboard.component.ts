import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomeModule } from '../../shared/fontawesome.module';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Activity {
  id: number;
  type: string;
  title: string;
  date: Date;
  icon: IconProp;
}

interface PopularContent {
  id: number;
  title: string;
  type: string;
  views: number;
  likes: number;
  category: string;
  icon: IconProp;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FontawesomeModule, NgChartsModule]
})
export class DashboardComponent implements OnInit {
  notificationCount = 3;
  username = 'John Doe';
  lastLoginDate = new Date(2025, 4, 18); // May 18, 2025
  
  // Key metrics
  totalArticlesRead = 47;
  coursesCompleted = 8;
  knowledgeScore = 725;
  contributionPoints = 320;
  certificatesEarned = 3;
  
  // Activities
  recentActivities: Activity[] = [
    { id: 1, type: 'article', title: 'Financial Risk Assessment Techniques', date: new Date(2025, 4, 19), icon: 'book-reader' },
    { id: 2, type: 'video', title: 'Treasury Management Fundamentals', date: new Date(2025, 4, 18), icon: 'video' },
    { id: 3, type: 'course', title: 'Hedge Accounting Basics', date: new Date(2025, 4, 17), icon: 'graduation-cap' },
    { id: 4, type: 'discussion', title: 'ESG Considerations in Finance', date: new Date(2025, 4, 16), icon: 'comments' },
    { id: 5, type: 'quiz', title: 'MRP Knowledge Assessment', date: new Date(2025, 4, 15), icon: 'tasks' }
  ];

  // Popular content
  popularContent: PopularContent[] = [
    { id: 1, title: 'Advanced Forecasting Techniques', type: 'article', views: 2541, likes: 187, category: 'Forecasting', icon: 'newspaper' },
    { id: 2, title: 'Treasury Analytics Dashboard', type: 'tutorial', views: 1893, likes: 142, category: 'Treasury', icon: 'chalkboard-teacher' },
    { id: 3, title: 'Hedge Accounting Explained', type: 'video', views: 2105, likes: 156, category: 'Hedge Accounting', icon: 'video' },
    { id: 4, title: 'MRP Implementation Guide', type: 'guide', views: 1762, likes: 129, category: 'MRP', icon: 'file-alt' }
  ];
  
  // Progress by category data
  public categoryProgressData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Forecasting', 'Treasury', 'Hedge Accounting', 'MRP', 'ESR', 'FP&A'],
    datasets: [
      {
        data: [85, 72, 63, 54, 48, 70],
        label: 'Your Progress',
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      },
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Team Average',
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  public categoryProgressOptions: ChartOptions<'radar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Knowledge Progress by Category',
        color: '#333',
        font: {
          size: 16
        }
      }
    },
    scales: {
      r: {
        pointLabels: {
          color: '#555'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };
  
  // Monthly learning activity data
  public monthlyActivityData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [12, 19, 15, 17, 22, 24, 20, 18, 24, 25, 28, 30],
        label: 'Articles',
        fill: false,
        tension: 0.3,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)'
      },
      {
        data: [5, 8, 6, 9, 12, 15, 13, 11, 14, 16, 17, 18],
        label: 'Videos',
        fill: false,
        tension: 0.3,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)'
      },
      {
        data: [2, 3, 4, 3, 5, 6, 5, 4, 7, 8, 7, 9],
        label: 'Courses',
        fill: false,
        tension: 0.3,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)'
      }
    ]
  };

  public monthlyActivityOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Learning Activity',
        color: '#333',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  // Content type distribution
  public contentTypeData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Articles', 'Videos', 'Courses', 'Guides', 'Quizzes'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ]
      }
    ]
  };

  public contentTypeOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Content Type Distribution',
        color: '#333',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'right'
      }
    }
  };

  // Recommended content
  recommendations = [
    { title: 'Advanced Treasury Risk Management', type: 'course', duration: '2h 15m', match: '95%', thumbnail: 'assets/placeholder.jpg' },
    { title: 'Implementing ESG in Financial Reporting', type: 'article', duration: '10m', match: '92%', thumbnail: 'assets/placeholder.jpg' },
    { title: 'FP&A Dashboard Development', type: 'tutorial', duration: '45m', match: '89%', thumbnail: 'assets/placeholder.jpg' },
    { title: 'Hedge Accounting Standard Updates', type: 'webinar', duration: '1h', match: '87%', thumbnail: 'assets/placeholder.jpg' }
  ];

  ngOnInit(): void {
    // You could fetch real data here from a service
  }

  getActivityIcon(type: string): IconProp {
    switch (type.toLowerCase()) {
      case 'article': return 'book-reader' as IconProp;
      case 'video': return 'video' as IconProp;
      case 'course': return 'graduation-cap' as IconProp;
      case 'discussion': return 'comments' as IconProp;
      case 'quiz': return 'tasks' as IconProp;
      default: return 'file' as IconProp;
    }
  }

  formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }
}
