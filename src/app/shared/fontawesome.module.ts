import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary, FaConfig, FaIconComponent } from '@fortawesome/angular-fontawesome';

// Import icons
import { 
  faHome, 
  faInfoCircle, 
  faSearch, 
  faUser, 
  faBars, 
  faTimes,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faChevronDown,
  faChevronRight,
  faShieldAlt,
  faFileContract,
  faUsers,
  faCompress,
  faExpand,
  // Additional icons needed for the new layout
  faFolder,
  faFileAlt,
  faCheckCircle,
  faArrowUp,
  faArrowDown,
  faComment,
  faCalendar,
  faCircle,
  faUserCircle,
  faPlus,
  faChevronLeft,
  faEllipsisV,
  faBook,
  faQuestionCircle,
  faComments,
  faBolt,
  faTachometerAlt,  // Added tachometer-alt icon
  // New Knowledge Hub icons
  faVideo,
  faCompass,
  faRoad,        // Added road icon
  faGraduationCap,
  faNewspaper,
  faChalkboardTeacher,
  faScroll,
  faBookOpen,
  faClipboardList,
  faCalendarAlt,
  faQuestion,
  faCloudUploadAlt,
  faEdit,
  faChartLine,
  faChartBar,    // Added chart-bar icon
  faBookmark,
  faClock,
  faAward,       // Added award icon
  faPencilAlt,   // Added pencil-alt icon
  faUserTie,     // Added user-tie icon
  // Dashboard specific icons
  faBookReader,  // Added book-reader icon
  faBrain,       // Added brain icon
  faMedal,       // Added medal icon
  faHandsHelping, // Added hands-helping icon
  faEye,          // Added eye icon
  faThumbsUp,     // Added thumbs-up icon
  faTasks,        // Added tasks icon
  faGlobe,        // Corrected from faGlobal to faGlobe
  faHandPointer,   // Added hand-pointer icon for interactive elements
  // Prompts page additional icons
  faSpinner,      // Added spinner icon for loading states
  faHeart,        // Added heart icon for favorites
  faHeartBroken,  // Added heart-broken icon for non-favorites
  faExclamationCircle,  // Added for error states
  faTimesCircle,  // Added for clear search button
  faThLarge,      // Added for card view option
  faList,         // Added for list view option
  faLandmark,     // Added for treasury category
  faBalanceScale, // Added for hedge accounting category
  faIndustry,     // Added for MRP category
  faLeaf,         // Added for ESR category
  faCalculator,   // Added for FP&A category
  // Prompt detail page icons
  faArrowLeft,    // Added arrow-left icon for back button
  faPlay,         // Added play icon for use prompt button
  faCopy,         // Added copy icon for copying prompt content
  faLink,         // Added link icon for URL copying
  faSyncAlt       // Added sync-alt icon for flip indicator
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
  declarations: []
})
export class FontawesomeModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add icons to the library
    library.addIcons(
      // Solid icons
      faHome,
      faInfoCircle,
      faSearch,
      faUser,
      faBars,
      faTimes,
      faEnvelope,
      faPhone,
      faMapMarkerAlt,
      faChevronDown,
      faChevronRight,
      faShieldAlt,
      faFileContract,
      faUsers,
      faCompress,
      faExpand,
      
      // Additional icons for new layout
      faFolder,
      faFileAlt,
      faCheckCircle,
      faArrowUp,
      faArrowDown,
      faComment,
      faCalendar,
      faCircle,
      faUserCircle,
      faPlus,
      faChevronLeft,
      faEllipsisV,
      faBook,
      faQuestionCircle,
      faComments,
      faBolt,
      faTachometerAlt,
      
      // New Knowledge Hub icons
      faVideo,
      faCompass,
      faRoad,
      faGraduationCap,
      faNewspaper,
      faChalkboardTeacher,
      faScroll,
      faBookOpen,
      faClipboardList,
      faCalendarAlt,
      faQuestion,
      faCloudUploadAlt,
      faEdit,
      faChartLine,
      faChartBar,
      faBookmark,
      faClock,
      faAward,
      faPencilAlt,
      faUserTie,
      
      // Dashboard specific icons
      faBookReader,
      faBrain,
      faMedal,
      faHandsHelping,
      faEye,
      faThumbsUp,
      faTasks,
      faGlobe,      
      faHandPointer,
      
      // Prompts page additional icons
      faSpinner,
      faHeart,
      faHeartBroken,
      faExclamationCircle,
      faTimesCircle,
      faThLarge,
      faList,
      faLandmark,
      faBalanceScale,
      faIndustry,
      faLeaf,
      faCalculator,
      
      // Prompt detail page icons
      faArrowLeft,
      faPlay,
      faCopy,
      faLink,
      faSyncAlt,
      
      // Brand icons
      faFacebook,
      faTwitter,
      faInstagram,
      faLinkedin,
      faGithub
    );
    
    // Set default configurations if needed
    faConfig.fallbackIcon = faQuestion;
  }
}