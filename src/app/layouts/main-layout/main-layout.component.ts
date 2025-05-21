import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd, RouterLinkActive } from '@angular/router';
import { FontawesomeModule } from '../../shared/fontawesome.module';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface MenuItem {
  name: string;
  route: string;
  icon: IconProp;
}

interface MenuSection {
  title: string;
  expanded: boolean;
  items: MenuItem[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontawesomeModule, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = true;
  isSidebarMinimized = false;
  currentPath: string = '/';
  currentPageTitle: string = 'Knowledge Hub';
  notificationCount: number = 8;
  
  // Menu sections for the sidebar navigation
  menuSections: MenuSection[] = [
    {
      title: 'Portfolios',
      expanded: true,
      items: [
        { name: 'Forecasting', route: '/forecasting', icon: 'newspaper' },
        { name: 'Treasury', route: '/treasury', icon: 'newspaper' },
        { name: 'Hedge Accounting', route: '/hedge', icon: 'newspaper' },
        { name: 'MRP', route: '/mrp', icon: 'newspaper' },
        { name: 'ESR', route: '/esr', icon: 'newspaper' },
        { name: 'FP&A', route: '/fpa', icon: 'newspaper' }
      ]
    },
    {
      title: 'AI Content',
      expanded: false,
      items: [
        { name: 'Prompt Library', route: '/prompts', icon: 'newspaper' },
        { name: 'Videos', route: '/videos', icon: 'video' },
      ]
    },
    // {
    //   title: 'Knowledge Base',
    //   expanded: false,
    //   items: [
    //     { name: 'Documentation', route: '/documentation', icon: 'file-alt' },
    //     { name: 'Best Practices', route: '/best-practices', icon: 'award' },
    //     { name: 'FAQs', route: '/faqs', icon: 'question-circle' }
    //   ]
    // }
    
    
  ];
  
  // Static section expanded states
  expandedSections = {
    knowledgeHub: true,
    contentLibrary: false,
    knowledgeBase: false,
    community: false,
    myContributions: false
  };

  constructor(private router: Router) {}
  
  ngOnInit() {
    // Track current route for active menu highlighting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.url;
      this.updatePageTitle(event.url);
      this.checkAndExpandActiveSection(event.url);
    });
    
    // Set initial page title and section expansion based on current URL
    this.updatePageTitle(this.router.url);
    this.checkAndExpandActiveSection(this.router.url);
  }
  
  // Toggle a menu section's expanded state
  toggleMenuSection(section: MenuSection): void {
    // If we're opening a section, close all others first
    if (!section.expanded) {
      this.menuSections.forEach(menuSection => {
        if (menuSection !== section) {
          menuSection.expanded = false;
        }
      });
      
      // Also close all static sections
      Object.keys(this.expandedSections).forEach(key => {
        this.expandedSections[key as keyof typeof this.expandedSections] = false;
      });
    }
    
    // Toggle the clicked section
    section.expanded = !section.expanded;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (!this.isSidebarOpen) {
      this.isSidebarMinimized = false;
    }
  }
  
  toggleSidebarMinimize(): void {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
  
  // Toggle specific static section
  toggleStaticSection(section: string): void {
    // Check if property exists in expandedSections
    if (section in this.expandedSections) {
      // If collapsing current expanded section, just toggle it
      if (this.expandedSections[section as keyof typeof this.expandedSections]) {
        this.expandedSections[section as keyof typeof this.expandedSections] = false;
      } else {
        // Otherwise, collapse all sections first
        Object.keys(this.expandedSections).forEach(key => {
          this.expandedSections[key as keyof typeof this.expandedSections] = false;
        });
        
        // Close all dynamic menu sections too
        this.menuSections.forEach(menuSection => {
          menuSection.expanded = false;
        });
        
        // Then expand only the clicked section
        this.expandedSections[section as keyof typeof this.expandedSections] = true;
      }
    }
  }
  
  // Check if a section is expanded
  isExpanded(section: string): boolean {
    return this.expandedSections[section as keyof typeof this.expandedSections];
  }
  
  // Update page title based on current route
  updatePageTitle(url: string): void {
    if (url === '/' || url === '/dashboard') {
      this.currentPageTitle = 'Dashboard';
    } else if (url === '/prompts') {
      this.currentPageTitle = 'Prompts';
    } else if (url === '/videos') {
      this.currentPageTitle = 'Videos';
    }
  }
  
  // Check if a section contains the current route and expand it
  checkAndExpandActiveSection(url: string): void {
    // Check dynamic menu sections
    let foundInDynamic = false;
    
    this.menuSections.forEach(section => {
      const hasActiveRoute = section.items.some(item => 
        url.startsWith(item.route) || (item.route !== '/' && url.includes(item.route))
      );
      
      if (hasActiveRoute) {
        // Collapse all sections first
        this.menuSections.forEach(s => s.expanded = false);
        Object.keys(this.expandedSections).forEach(key => {
          this.expandedSections[key as keyof typeof this.expandedSections] = false;
        });
        
        // Expand the section with active route
        section.expanded = true;
        foundInDynamic = true;
      }
    });
    
    // If not found in dynamic sections, check static sections
    if (!foundInDynamic) {
      // Check Knowledge Hub static section
      if (url === '/dashboard' || url === '/discover' || url === '/my-learning') {
        Object.keys(this.expandedSections).forEach(key => {
          this.expandedSections[key as keyof typeof this.expandedSections] = false;
        });
        this.expandedSections.knowledgeHub = true;
      }
    }
  }
  
  // Check if section contains the active route for styling
  sectionContainsActiveRoute(section: MenuSection): boolean {
    return section.items.some(item => 
      this.currentPath.startsWith(item.route) || 
      (item.route !== '/' && this.currentPath.includes(item.route))
    );
  }
  
  // Check if static section contains active route
  staticSectionContainsActiveRoute(section: string): boolean {
    if (section === 'knowledgeHub') {
      return ['/dashboard', '/discover', '/my-learning'].some(route => 
        this.currentPath === route
      );
    }
    return false;
  }
}
