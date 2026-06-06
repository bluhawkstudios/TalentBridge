// Global App State
const state = {
  currentUser: null,
  currentRole: "Business", // "Business", "Candidate", or "Admin"
  activePage: "home",
  currentHiringModel: null, // "Permanent", "Resource Augment", "Hire by Hour"
  currentRequirement: {
    role: "",
    experience: "all",
    skills: [],
    budget: "",
    availability: "all"
  },
  requests: [],
  chatHistory: [],
  
  // Business Profile State
  companyProfile: {
    companyName: "Global Tech Corp.",
    industry: "SaaS & Cloud Computing",
    email: "hiring@techcorp.com",
    location: "San Francisco, CA"
  },
  companyInterviews: [],

  // Candidate Profile State
  candidateProfile: {
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
    degree: "",
    passingYear: "",
    gradType: "Fulltime",
    mbaMode: "Online",
    mbaOfflineType: "Fulltime",
    institute: "",
    jobs: [], // Array of { company, startDate, endDate, reason, location, title }
    ctcFixed: "",
    ctcVar: "",
    expectedCtc: "",
    noticePeriod: "",
    jobType: "Fulltime",
    lastDay: "",
    resumeName: "",
    gapReasons: {}
  },
  candidateApplications: [],
  candidateStatuses: {},
  statusTimelines: {},
  activeTimelineCandidateId: null,
  assignments: {},
  sourcedSearchResults: [],
  customIntegrations: [],
  integrations: {
    linkedin: { name: "LinkedIn Talent Solutions", active: true, apiKey: "li_live_839210", description: "Fetch profiles directly from LinkedIn recruiter network.", logo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0a66c2; width: 18px; height: 18px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>` },
    naukri: { name: "Naukri Job Board API", active: true, apiKey: "nk_auth_901824", description: "Search and retrieve CV databases from Naukri portal.", logo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0b2f61; width: 18px; height: 18px;"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>` },
    timesjobs: { name: "TimesJobs Recruiter API", active: false, apiKey: "", description: "Access timesjobs premium candidate directory search.", logo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #e21c24; width: 18px; height: 18px;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>` },
    indeed: { name: "Indeed Jobs API", active: false, apiKey: "", description: "Connect Indeed resume search integration.", logo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #2164f3; width: 18px; height: 18px;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>` }
  }
};

// Mock Identity and Company details for Sourced CVs
const candidateMockDetails = {
  "TB-101": { name: "Aarav Mehta", company: "TechMahindra" },
  "TB-102": { name: "Priya Sharma", company: "Infosys" },
  "TB-103": { name: "Rohan Das", company: "Wipro" },
  "TB-104": { name: "Ananya Iyer", company: "HCL Technologies" },
  "TB-105": { name: "Vikram Malhotra", company: "L&T Infotech" },
  "TB-106": { name: "Sneha Patel", company: "Capgemini" },
  "TB-107": { name: "Aditya Roy", company: "Accenture" },
  "TB-108": { name: "Meera Nair", company: "Genpact" },
  "TB-109": { name: "Kabir Singh", company: "Mindtree" },
  "TB-110": { name: "Divya Reddy", company: "Mphasis" },
  "TB-111": { name: "Sanjay Sen", company: "Persistent Systems" },
  "TB-112": { name: "Kriti Joshi", company: "Zensar Technologies" },
  "TB-113": { name: "Amit Verma", company: "Coforge" },
  "TB-114": { name: "Neha Gupta", company: "Hexaware Technologies" },
  "TB-115": { name: "Rahul Bose", company: "Birlasoft" },
  "TB-999": { name: "Alex Mercer", company: "Global Tech Corp." }
};

// Location Data Matrix
const locationData = {
  "United States": {
    "California": ["San Francisco", "Los Angeles", "San Jose", "San Diego"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    "Texas": ["Austin", "Houston", "Dallas", "San Antonio"]
  },
  "India": {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"],
    "Karnataka": ["Bengaluru", "Mysore", "Hubli", "Mangaluru"],
    "Delhi": ["New Delhi", "Dwarka", "Noida", "Gurugram"]
  },
  "United Kingdom": {
    "England": ["London", "Manchester", "Birmingham", "Leeds"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"],
    "Wales": ["Cardiff", "Swansea", "Newport", "Bangor"]
  }
};

// Mock Sourced Job Openings
const mockOpeningsData = [
  {
    id: "JOB-001",
    role: "Senior React Developer",
    model: "Resource Augment",
    pricing: 12000,
    company: "Global Tech Corp.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    desc: "Join our product sprint team augmenting a high-traffic e-commerce dashboard. Billed monthly with immediate onboarding."
  },
  {
    id: "JOB-002",
    role: "Full-Stack Node.js Engineer",
    model: "Permanent",
    pricing: 120000,
    company: "DataShield Inc.",
    skills: ["Node.js", "Express", "MongoDB", "React"],
    desc: "Seeking full-time backend and full-stack engineer to build scalable API endpoints and live data synchronization networks."
  },
  {
    id: "JOB-003",
    role: "Lead UI/UX Designer",
    model: "Hire by Hour",
    pricing: 70,
    company: "Studio Labs",
    skills: ["Figma", "Design Systems", "Prototyping"],
    desc: "Hourly consultation contract to construct client dashboard wireframes and clean typography layout designs."
  },
  {
    id: "JOB-004",
    role: "DevOps & Cloud Engineer",
    model: "Resource Augment",
    pricing: 13600,
    company: "ScaleGrid Cloud Solutions",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    desc: "Deploy Infrastructure as Code (IaC) models and configure containerized multi-zone Kubernetes clusters."
  },
  {
    id: "JOB-005",
    role: "Product Manager (Technical)",
    model: "Permanent",
    pricing: 125000,
    company: "Innovate AI Ltd",
    skills: ["Product Roadmap", "SQL", "Agile/Scrum"],
    desc: "Full-time PM driving engineering roadmaps, customer requirements, and product sprints for client AI integrations."
  }
];

// Chatbot messages templates
const chatbotGreetings = {
  "Permanent": "Welcome to AI Sourcing Permanent Hiring. I can help you search our anonymized database for long-term employees. What kind of full-time role are you looking to fill? Tell me the key technologies, experience level, and your budget (approximate annual salary).",
  "Resource Augment": "Hello! Ready to augment your team? I can match you with dedicated contractors available for monthly or project-based sprints. Let me know the primary skills, duration required, and monthly target budget.",
  "Hire by Hour": "Hi there! Looking for quick hourly expertise? I can pair you with elite freelancers for part-time, ad-hoc, or hourly consultations. Tell me the scope of work, key technical skills needed, and your target hourly rate."
};

// DOM Element Selections
const elements = {
  // Navigation / Header
  navLogo: document.getElementById("nav-logo"),
  roleBadge: document.getElementById("current-role-badge"),
  roleTextDisplay: document.getElementById("role-text-display"),
  toggleRoleBtn: document.getElementById("toggle-role-btn"),
  logoutBtn: document.getElementById("logout-btn"),
  roleSimulatorDropdown: document.getElementById("role-simulator-dropdown"),
  navbarRoleIndicator: document.getElementById("navbar-role-indicator"),
  
  // Navigation Tabs Groups
  businessNavLinks: document.getElementById("business-nav-links"),
  candidateNavLinks: document.getElementById("candidate-nav-links"),
  
  // Navigation Tabs Links
  linkBusinessHome: document.getElementById("link-business-home"),
  linkBusinessTracker: document.getElementById("link-business-tracker"),
  linkCandidateDashboard: document.getElementById("link-candidate-dashboard"),
  linkCandidateProfile: document.getElementById("link-candidate-profile"),
  linkCandidateJobs: document.getElementById("link-candidate-jobs"),
  linkCandidateSupport: document.getElementById("link-candidate-support"),
  
  // Views
  homeView: document.getElementById("home-view"),
  reqView: document.getElementById("requirement-view"),
  candidatesView: document.getElementById("candidates-view"),
  adminView: document.getElementById("admin-view"),
  candidateDashboardView: document.getElementById("candidate-dashboard-view"),
  candidateProfileView: document.getElementById("candidate-profile-view"),
  candidateJobsView: document.getElementById("candidate-jobs-view"),
  candidateSupportView: document.getElementById("candidate-support-view"),
  
  // Home View Containers
  unauthContainer: document.getElementById("unauth-container"),
  businessContainer: document.getElementById("business-container"),
  adminRedirectContainer: document.getElementById("admin-redirect-container"),
  
  // Authentication Forms
  authSelectBusiness: document.getElementById("auth-select-business"),
  authSelectCandidate: document.getElementById("auth-select-candidate"),
  authSelectAdmin: document.getElementById("auth-select-admin"),
  authLoginForm: document.getElementById("auth-login-form"),
  loginEmailInput: document.getElementById("login-email"),
  
  // Home Model Buttons
  modePermanentCard: document.getElementById("mode-permanent-card"),
  modeAugmentCard: document.getElementById("mode-augment-card"),
  modeHourlyCard: document.getElementById("mode-hourly-card"),
  
  // Client Request Tracker
  userRequestsTable: document.getElementById("user-requests-table"),
  userRequestsListBody: document.getElementById("user-requests-list-body"),
  myRequestsCount: document.getElementById("my-requests-count"),
  userRequestsPanel: document.getElementById("user-requests-panel"),
  
  // Requirements Specification
  reqViewTitle: document.getElementById("requirement-view-title"),
  backToHomeBtn: document.getElementById("back-to-home-btn"),
  reqFormPanel: document.getElementById("req-form-panel"),
  reqChatPanel: document.getElementById("req-chat-panel"),
  
  // Requirements Form
  reqForm: document.getElementById("requirement-structured-form"),
  reqRole: document.getElementById("req-role"),
  reqExperience: document.getElementById("req-experience"),
  reqBudget: document.getElementById("req-budget"),
  reqAvailability: document.getElementById("req-availability"),
  budgetInputLabel: document.getElementById("budget-input-label"),
  
  // Requirement Chat
  chatMessagesDisplay: document.getElementById("chat-messages-display"),
  chatUserTextbox: document.getElementById("chat-user-textbox"),
  chatSendActionBtn: document.getElementById("chat-send-action-btn"),
  
  // Candidates View
  backToReqBtn: document.getElementById("back-to-requirements-btn"),
  candidateResultsGrid: document.getElementById("candidate-results-grid"),
  candidateCountIndicator: document.getElementById("candidate-count-indicator"),
  
  // Admin Panel
  adminStatTotal: document.getElementById("admin-stat-total"),
  adminStatProcessing: document.getElementById("admin-stat-processing"),
  adminStatFulfilled: document.getElementById("admin-stat-fulfilled"),
  adminRequestsListBody: document.getElementById("admin-requests-list-body"),
  adminClearDataBtn: document.getElementById("admin-clear-data-btn"),
  goToAdminDashboardBtn: document.getElementById("go-to-admin-dashboard-btn"),

  // Candidate Module Dashboard
  candidateProfilePercent: document.getElementById("candidate-profile-percent"),
  candidateProfileProgressBar: document.getElementById("candidate-profile-progress-bar"),
  candidateProfileChecklist: document.getElementById("candidate-profile-checklist"),
  resumeDropZone: document.getElementById("resume-drop-zone"),
  resumeUploadStatus: document.getElementById("resume-upload-status"),
  resumeFileInput: document.getElementById("resume-file-input"),
  resumeFileDetails: document.getElementById("resume-file-details"),
  resumeFileName: document.getElementById("resume-file-name"),
  deleteResumeBtn: document.getElementById("delete-resume-btn"),
  candidateApplicationsListBody: document.getElementById("candidate-applications-list-body"),

  // Candidate Module Edit Profile
  candidateProfileForm: document.getElementById("candidate-profile-form"),
  candFirstname: document.getElementById("cand-firstname"),
  candLastname: document.getElementById("cand-lastname"),
  candCountry: document.getElementById("cand-country"),
  candState: document.getElementById("cand-state"),
  candCity: document.getElementById("cand-city"),
  addEducationBtn: document.getElementById("add-education-btn"),
  educationQualificationsListContainer: document.getElementById("education-qualifications-list-container"),
  noEducationHelperText: document.getElementById("no-education-helper-text"),
  addJobExperienceBtn: document.getElementById("add-job-experience-btn"),
  workExperienceListContainer: document.getElementById("work-experience-list-container"),
  noJobsHelperText: document.getElementById("no-jobs-helper-text"),
  candCtcfixed: document.getElementById("cand-ctcfixed"),
  candCtcvar: document.getElementById("cand-ctcvar"),
  candExpectedctc: document.getElementById("cand-expectedctc"),
  candJobtype: document.getElementById("cand-jobtype"),
  candNotice: document.getElementById("cand-notice"),
  noticeResignedDatePanel: document.getElementById("notice-resigned-date-panel"),
  candLastday: document.getElementById("cand-lastday"),

  // Candidate Browse Jobs & AI Support
  candidateJobsCountIndicator: document.getElementById("candidate-jobs-count-indicator"),
  candidateOpeningsGrid: document.getElementById("candidate-openings-grid"),
  triggerAnalyzerBtn: document.getElementById("trigger-analyzer-btn"),
  analyzerResultsPanel: document.getElementById("analyzer-results-panel"),
  analyzerScoreBadge: document.getElementById("analyzer-score-badge"),
  analyzerTextAnalysis: document.getElementById("analyzer-text-analysis"),
  themeToggleBtn: document.getElementById("theme-toggle-btn"),
  candidateLayoutWrapper: document.getElementById("candidate-layout-wrapper"),
  mainContainer: document.getElementById("main-container"),
  mainHeader: document.querySelector(".main-header"),
  candidateInterviewsView: document.getElementById("candidate-interviews-view"),
  candidateInterviewsListBody: document.getElementById("candidate-interviews-list-body"),
  candidateInterviewsCountIndicator: document.getElementById("candidate-interviews-count-indicator"),
  candidateApplicationsView: document.getElementById("candidate-applications-view"),
  candidateApplicationsPageListBody: document.getElementById("candidate-applications-page-list-body"),
  candidateAppsCountIndicator: document.getElementById("candidate-apps-count-indicator"),
  candidateDocumentsView: document.getElementById("candidate-documents-view"),
  documentsResumeDropZone: document.getElementById("documents-resume-drop-zone"),
  documentsResumeUploadStatus: document.getElementById("documents-resume-upload-status"),
  documentsResumeFileInput: document.getElementById("documents-resume-file-input"),
  documentsResumeFileDetails: document.getElementById("documents-resume-file-details"),
  documentsResumeFileName: document.getElementById("documents-resume-file-name"),
  documentsDeleteResumeBtn: document.getElementById("documents-delete-resume-btn"),
  candidateDocumentsListBody: document.getElementById("candidate-documents-list-body"),
  candidateDocsCountIndicator: document.getElementById("candidate-docs-count-indicator"),
  sidebarAvatarCircle: document.getElementById("sidebar-avatar-circle"),
  sidebarProfileName: document.getElementById("sidebar-profile-name"),
  sidebarThemeToggle: document.getElementById("sidebar-theme-toggle"),
  sidebarLogoutBtn: document.getElementById("sidebar-logout-btn"),
  sidebarSettingsBtn: document.getElementById("sidebar-settings-btn"),
  
  // Business Sidebar & Pages Layout View Elements
  businessLayoutWrapper: document.getElementById("business-layout-wrapper"),
  businessDashboardView: document.getElementById("business-dashboard-view"),
  businessHiringModelsView: document.getElementById("business-hiring-models-view"),
  businessTrackerView: document.getElementById("business-tracker-view"),
  businessInterviewsView: document.getElementById("business-interviews-view"),
  businessBillingView: document.getElementById("business-billing-view"),
  businessSettingsView: document.getElementById("business-settings-view"),
  businessSidebarAvatarCircle: document.getElementById("business-sidebar-avatar-circle"),
  businessSidebarProfileName: document.getElementById("business-sidebar-profile-name"),
  businessSidebarThemeToggle: document.getElementById("business-sidebar-theme-toggle"),
  businessSidebarLogoutBtn: document.getElementById("business-sidebar-logout-btn"),
  businessDashboardNewRequestBtn: document.getElementById("business-dashboard-new-request-btn"),
  businessSettingsForm: document.getElementById("business-settings-form"),
  bizSettingsCompanyName: document.getElementById("biz-settings-company-name"),
  bizSettingsCompanyIndustry: document.getElementById("biz-settings-company-industry"),
  bizSettingsCompanyEmail: document.getElementById("biz-settings-company-email"),
  bizSettingsCompanyLocation: document.getElementById("biz-settings-company-location"),
  
  // Admin Sidebar & Pages Layout View Elements
  adminLayoutWrapper: document.getElementById("admin-layout-wrapper"),
  adminSidebarAvatarCircle: document.getElementById("admin-sidebar-avatar-circle"),
  adminSidebarLogoutBtn: document.getElementById("admin-sidebar-logout-btn"),
  adminSidebarThemeToggle: document.getElementById("admin-sidebar-theme-toggle"),
  adminDashboardView: document.getElementById("admin-dashboard-view"),
  adminRequestsQueueView: document.getElementById("admin-requests-queue-view"),
  adminTalentPoolView: document.getElementById("admin-talent-pool-view"),
  adminGlobalInterviewsView: document.getElementById("admin-global-interviews-view"),
  adminSystemSettingsView: document.getElementById("admin-system-settings-view"),
  adminDashboardResetBtn: document.getElementById("admin-dashboard-reset-btn"),
  
  // Admin Funnel KPIs
  adminFunnelCVSourced: document.getElementById("admin-funnel-cv-sourced"),
  adminFunnelCVSubmitted: document.getElementById("admin-funnel-cv-submitted"),
  adminFunnelL1Scheduled: document.getElementById("admin-funnel-l1-scheduled"),
  adminFunnelL1Select: document.getElementById("admin-funnel-l1-select"),
  adminFunnelL2Scheduled: document.getElementById("admin-funnel-l2-scheduled"),
  adminFunnelL2Select: document.getElementById("admin-funnel-l2-select"),
  adminFunnelL3Scheduled: document.getElementById("admin-funnel-l3-scheduled"),
  adminFunnelL3Select: document.getElementById("admin-funnel-l3-select"),
  adminFunnelOffered: document.getElementById("admin-funnel-offered"),
  adminFunnelJoined: document.getElementById("admin-funnel-joined"),
  
  // Admin Donut & Legends
  adminDonutSegmentProcess: document.getElementById("admin-donut-segment-process"),
  adminDonutSegmentFulfilled: document.getElementById("admin-donut-segment-fulfilled"),
  adminDonutCenterTotal: document.getElementById("admin-donut-center-total"),
  adminLegendCountProcess: document.getElementById("admin-legend-count-process"),
  adminLegendCountFulfilled: document.getElementById("admin-legend-count-fulfilled"),
  
  // Logs & Mini Queue
  adminDashboardLogsContainer: document.getElementById("admin-dashboard-logs-container"),
  adminViewQueueLink: document.getElementById("admin-view-queue-link"),
  adminDashboardPendingBody: document.getElementById("admin-dashboard-pending-body"),
  adminSimulateRequestBtn: document.getElementById("admin-simulate-request-btn"),
  adminSimulateCandidateBtn: document.getElementById("admin-simulate-candidate-btn"),
  
  // Placement Requests Queue Page
  adminQueueCountIndicator: document.getElementById("admin-queue-count-indicator"),
  adminQueuePageTable: document.getElementById("admin-queue-page-table"),
  adminQueuePageListBody: document.getElementById("admin-queue-page-list-body"),
  
  // Talent Pool Page
  adminTalentCountIndicator: document.getElementById("admin-talent-count-indicator"),
  adminTalentPageTable: document.getElementById("admin-talent-page-table"),
  adminTalentPageListBody: document.getElementById("admin-talent-page-list-body"),
  
  // Global Interviews Page
  adminInterviewsCountIndicator: document.getElementById("admin-interviews-count-indicator"),
  adminGlobalInterviewsTable: document.getElementById("admin-global-interviews-table"),
  adminGlobalInterviewsListBody: document.getElementById("admin-global-interviews-list-body"),
  
  // System Settings Page Controls
  adminSettingsClearBtn: document.getElementById("admin-settings-clear-btn"),
  adminSettingsSeedBtn: document.getElementById("admin-settings-seed-btn"),
  adminSimLatency: document.getElementById("admin-sim-latency"),
  adminSimTaxrate: document.getElementById("admin-sim-taxrate"),

  // CV Sourced Page Elements
  adminCVSourcedView: document.getElementById("admin-cv-sourced-view"),
  adminCVSourcedCountIndicator: document.getElementById("admin-cv-sourced-count-indicator"),
  cvSourcedSearch: document.getElementById("cv-sourced-search"),
  cvSourcedFilterStatus: document.getElementById("cv-sourced-filter-status"),
  cvSourcedSortBy: document.getElementById("cv-sourced-sort-by"),
  adminCVSourcedBackBtn: document.getElementById("admin-cv-sourced-back-btn"),
  adminCVSourcedTable: document.getElementById("admin-cv-sourced-table"),
  adminCVSourcedListBody: document.getElementById("admin-cv-sourced-list-body"),
  candidateDetailModal: document.getElementById("candidate-detail-modal"),
  closeCandidateModalBtn: document.getElementById("close-candidate-modal-btn"),
  candidateModalBody: document.getElementById("candidate-modal-body"),
  adminStatusTimelineView: document.getElementById("admin-status-timeline-view"),
  requestDetailModal: document.getElementById("request-detail-modal"),
  closeRequestModalBtn: document.getElementById("close-request-modal-btn"),
  requestModalBody: document.getElementById("request-modal-body"),
  adminStatusTimelineBackBtn: document.getElementById("admin-status-timeline-back-btn"),
  adminStatusTimelineBody: document.getElementById("admin-status-timeline-body"),
  
  // Email Composer Modal Elements
  emailComposerModal: document.getElementById("email-composer-modal"),
  closeEmailModalBtn: document.getElementById("close-email-modal-btn"),
  cancelEmailBtn: document.getElementById("cancel-email-btn"),
  emailComposerForm: document.getElementById("email-composer-form"),
  emailCandidateId: document.getElementById("email-candidate-id"),
  emailToAddress: document.getElementById("email-to-address"),
  emailSubject: document.getElementById("email-subject"),
  emailJdAttachment: document.getElementById("email-jd-attachment"),
  emailAttachmentPreviewPanel: document.getElementById("email-attachment-preview-panel"),
  emailAttachmentFilename: document.getElementById("email-attachment-filename"),
  removeEmailAttachmentBtn: document.getElementById("remove-email-attachment-btn"),
  emailBody: document.getElementById("email-body"),
  assignRecruiterModal: document.getElementById("assign-recruiter-modal"),
  closeAssignModalBtn: document.getElementById("close-assign-modal-btn"),
  cancelAssignBtn: document.getElementById("cancel-assign-btn"),
  assignRecruiterForm: document.getElementById("assign-recruiter-form"),
  assignCandidateId: document.getElementById("assign-candidate-id"),
  assignCandidateNameDisplay: document.getElementById("assign-candidate-name-display"),
  assignRecruiterSelect: document.getElementById("assign-recruiter-select"),
  assignCompanySelect: document.getElementById("assign-company-select"),
  adminIntegrationsView: document.getElementById("admin-integrations-view"),
  integrationsListContainer: document.getElementById("integrations-list-container"),
  addCustomIntegrationBtn: document.getElementById("add-custom-integration-btn"),
  customIntegrationModal: document.getElementById("custom-integration-modal"),
  closeIntegrationModalBtn: document.getElementById("close-integration-modal-btn"),
  cancelIntegrationBtn: document.getElementById("cancel-integration-btn"),
  customIntegrationForm: document.getElementById("custom-integration-form"),
  integrationName: document.getElementById("integration-name"),
  integrationUrl: document.getElementById("integration-url"),
  integrationKey: document.getElementById("integration-key"),
  cvSourcedSearchBtn: document.getElementById("cv-sourced-search-btn")
};

// Global Log Out Logic
function logoutUser() {
  sessionStorage.removeItem("ais_currentUser");
  sessionStorage.removeItem("ais_currentRole");
  sessionStorage.removeItem("tb_currentUser");
  sessionStorage.removeItem("tb_currentRole");
  state.currentUser = null;
  state.currentRole = "Business";
  state.activePage = "home";
  
  // Reset Auth/Login Selection UI switcher highlights and input defaults
  if (elements.authSelectBusiness) elements.authSelectBusiness.classList.add("active");
  if (elements.authSelectCandidate) elements.authSelectCandidate.classList.remove("active");
  if (elements.authSelectAdmin) elements.authSelectAdmin.classList.remove("active");
  if (elements.loginEmailInput) elements.loginEmailInput.value = "hiring@techcorp.com";
  
  navigateTo("home");
  checkSession();
  renderAllViews();
}

// Initialize Application
function init() {
  const savedTheme = localStorage.getItem("ais_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }

  loadImportedCandidates();
  loadRequestsFromStorage();
  loadCandidateStatuses();
  loadStatusTimelines();
  loadAssignments();
  loadIntegrations();
  checkSession();
  loadCandidateProfile();
  loadCompanyProfile();
  loadAdminLogs();
  setupEventListeners();
  setupResumeUpload();
  syncThemeUI();
  renderAllViews();
}

// Session state persistence
function checkSession() {
  const savedUser = sessionStorage.getItem("ais_currentUser") || sessionStorage.getItem("tb_currentUser");
  const savedRole = sessionStorage.getItem("ais_currentRole") || sessionStorage.getItem("tb_currentRole") || "Business";
  
  if (savedUser) {
    state.currentUser = savedUser;
    state.currentRole = savedRole;
    elements.logoutBtn.classList.remove("hidden");
    elements.toggleRoleBtn.classList.remove("hidden");
  } else {
    state.currentUser = null;
    state.currentRole = "Business";
    elements.logoutBtn.classList.add("hidden");
    elements.toggleRoleBtn.classList.add("hidden");
  }
}

// LocalStorage Synchronization
function loadRequestsFromStorage() {
  const stored = localStorage.getItem("ai_sourcing_requests") || localStorage.getItem("talent_bridge_requests");
  if (stored) {
    try {
      state.requests = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored requests.", e);
      state.requests = [];
    }
  } else {
    state.requests = [];
  }
}

function saveRequestsToStorage() {
  localStorage.setItem("ai_sourcing_requests", JSON.stringify(state.requests));
  // Clean up old key if exists
  localStorage.removeItem("talent_bridge_requests");
  // Dispatch storage event manually for same-tab updates
  window.dispatchEvent(new Event("storage_updated"));
}

function loadCandidateStatuses() {
  const stored = localStorage.getItem("ai_sourcing_candidate_statuses");
  if (stored) {
    try {
      state.candidateStatuses = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse candidate statuses", e);
      state.candidateStatuses = {};
    }
  } else {
    state.candidateStatuses = {};
  }
  
  // Make sure every candidate has a status (default to "Sourced")
  candidatesData.forEach(c => {
    if (!state.candidateStatuses[c.id]) {
      state.candidateStatuses[c.id] = "Sourced";
    }
  });

  // Align candidate statuses with requests if requests exist
  state.requests.forEach(req => {
    const candId = req.candidateId;
    if (candId) {
      if (req.status === "Fulfilled") {
        state.candidateStatuses[candId] = "Joined";
      } else if (req.status === "Rejected") {
        state.candidateStatuses[candId] = "Rejected";
      } else if (req.status === "In Process" && state.candidateStatuses[candId] === "Sourced") {
        state.candidateStatuses[candId] = "Submitted";
      }
    }
  });
}

function saveCandidateStatuses() {
  localStorage.setItem("ai_sourcing_candidate_statuses", JSON.stringify(state.candidateStatuses));
  
  // Auto-sync status timelines
  if (!state.statusTimelines) state.statusTimelines = {};
  for (const candId in state.candidateStatuses) {
    const currentStatus = state.candidateStatuses[candId];
    if (!state.statusTimelines[candId]) {
      state.statusTimelines[candId] = seedTimelineForCandidate(candId);
    } else {
      const timeline = state.statusTimelines[candId];
      const lastEvent = timeline[timeline.length - 1];
      if (!lastEvent || lastEvent.status !== currentStatus) {
        const user = state.currentUser || "System Administrator";
        timeline.push({
          status: currentStatus,
          timestamp: Date.now(),
          user: user,
          notes: `Transitioned status to ${currentStatus}`
        });
      }
    }
  }
  saveStatusTimelines();
  
  window.dispatchEvent(new Event("storage_updated"));
}

function loadStatusTimelines() {
  const stored = localStorage.getItem("ai_sourcing_status_timelines");
  if (stored) {
    try {
      state.statusTimelines = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse status timelines", e);
      state.statusTimelines = {};
    }
  } else {
    state.statusTimelines = {};
  }
  
  // Seed status timelines if empty or missing for any candidate
  candidatesData.forEach(c => {
    if (!state.statusTimelines[c.id] || state.statusTimelines[c.id].length === 0) {
      state.statusTimelines[c.id] = seedTimelineForCandidate(c.id);
    }
  });
  
  saveStatusTimelines();
}

function saveStatusTimelines() {
  localStorage.setItem("ai_sourcing_status_timelines", JSON.stringify(state.statusTimelines));
}

function loadAssignments() {
  const stored = localStorage.getItem("ai_sourcing_assignments");
  if (stored) {
    try {
      state.assignments = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse assignments", e);
      state.assignments = {};
    }
  } else {
    state.assignments = {};
  }
}

function saveAssignments() {
  localStorage.setItem("ai_sourcing_assignments", JSON.stringify(state.assignments));
  window.dispatchEvent(new Event("storage_updated"));
}

function loadImportedCandidates() {
  const stored = localStorage.getItem("ai_sourcing_imported_candidates");
  if (stored) {
    try {
      const importedList = JSON.parse(stored);
      importedList.forEach(cand => {
        if (!candidatesData.some(c => c.id === cand.id)) {
          candidatesData.push(cand);
        }
        candidateMockDetails[cand.id] = {
          name: cand.name,
          company: cand.company || "N/A"
        };
      });
    } catch (e) {
      console.error("Failed to load imported candidates", e);
    }
  }
}

function saveImportedCandidates() {
  const importedList = candidatesData.filter(c => c.id.startsWith("EXT-"));
  localStorage.setItem("ai_sourcing_imported_candidates", JSON.stringify(importedList));
}

function loadIntegrations() {
  const stored = localStorage.getItem("ai_sourcing_integrations");
  if (stored) {
    try {
      const data = JSON.parse(stored);
      for (const key in data.integrations) {
        if (state.integrations[key]) {
          state.integrations[key].active = data.integrations[key].active;
          state.integrations[key].apiKey = data.integrations[key].apiKey;
        }
      }
      state.customIntegrations = data.customIntegrations || [];
    } catch (e) {
      console.error("Failed to parse integrations", e);
    }
  }

  const storedResults = localStorage.getItem("ai_sourcing_sourced_results");
  if (storedResults) {
    try {
      state.sourcedSearchResults = JSON.parse(storedResults);
    } catch (e) {
      console.error("Failed to parse sourced results", e);
      state.sourcedSearchResults = [];
    }
  } else {
    state.sourcedSearchResults = [];
  }
}

function saveIntegrations() {
  const data = {
    integrations: {},
    customIntegrations: state.customIntegrations
  };
  for (const key in state.integrations) {
    data.integrations[key] = {
      active: state.integrations[key].active,
      apiKey: state.integrations[key].apiKey
    };
  }
  localStorage.setItem("ai_sourcing_integrations", JSON.stringify(data));
  localStorage.setItem("ai_sourcing_sourced_results", JSON.stringify(state.sourcedSearchResults));
  window.dispatchEvent(new Event("storage_updated"));
}

const externalMockPool = [
  {
    id: "EXT-101",
    name: "Neha Patil",
    role: "Senior React Developer",
    skills: ["React", "TypeScript", "Redux Toolkit", "Next.js", "Jest"],
    experience: 6,
    company: "Cognizant",
    email: "neha.patil@cognizant.com",
    mobile: "+91 98765 43210",
    source: "naukri",
    availability: "Immediate",
    hourlyRate: 80,
    annualSalary: 125000,
    education: "B.E. in Computer Science",
    bio: "Senior React Developer with 6 years of expertise in building enterprise dashboard interfaces, design systems, and highly optimized frontend apps.",
    matchRating: 97
  },
  {
    id: "EXT-102",
    name: "Rohan Sharma",
    role: "Lead Python & Django Backend Engineer",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    experience: 7,
    company: "TCS",
    email: "rohan.sharma@tcs.com",
    mobile: "+91 91234 56789",
    source: "naukri",
    availability: "Immediate",
    hourlyRate: 90,
    annualSalary: 145000,
    education: "B.Tech in Information Technology",
    bio: "Backend Specialist proficient in Django, microservices architecture, caching strategies, and distributed task queues.",
    matchRating: 95
  },
  {
    id: "EXT-103",
    name: "Arjun Kapoor",
    role: "Senior React Developer",
    skills: ["React", "TypeScript", "Redux", "Next.js", "Tailwind CSS"],
    experience: 5,
    company: "Razorpay",
    email: "arjun.kapoor@razorpay.com",
    mobile: "+91 88888 77777",
    source: "linkedin",
    availability: "2 Weeks Notice",
    hourlyRate: 75,
    annualSalary: 115000,
    education: "B.Sc. in Computer Science",
    bio: "Passionate React Engineer focused on interactive user interfaces, responsive layouts, and performance tuning.",
    matchRating: 94
  },
  {
    id: "EXT-104",
    name: "Pooja Hegde",
    role: "DevOps & Cloud Infrastructure Engineer",
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD"],
    experience: 8,
    company: "Amazon Web Services",
    email: "pooja.hegde@aws.com",
    mobile: "+91 77777 66666",
    source: "linkedin",
    availability: "Immediate",
    hourlyRate: 100,
    annualSalary: 160000,
    education: "B.E. in Electronics & Communication",
    bio: "DevOps Architect specializing in Infrastructure as Code, Kubernetes deployments, and automated CI/CD pipeline structures.",
    matchRating: 96
  },
  {
    id: "EXT-105",
    name: "Sonia Gupta",
    role: "Manual & Automated QA Specialist",
    skills: ["Selenium", "Cypress", "JavaScript", "Manual Testing", "Postman"],
    experience: 5,
    company: "Infosys",
    email: "sonia.gupta@infosys.com",
    mobile: "+91 99999 88888",
    source: "timesjobs",
    availability: "1 Week Notice",
    hourlyRate: 65,
    annualSalary: 95000,
    education: "B.C.A. in Computer Applications",
    bio: "Detail-oriented QA Specialist experienced in automation frameworks, cross-browser compatibility testing, and API verification.",
    matchRating: 92
  },
  {
    id: "EXT-106",
    name: "Vikram Singh",
    role: "Senior Angular & RxJS Developer",
    skills: ["Angular", "RxJS", "TypeScript", "NGRX", "SCSS"],
    experience: 6,
    company: "Wipro",
    email: "vikram.singh@wipro.com",
    mobile: "+91 90000 10000",
    source: "timesjobs",
    availability: "Immediate",
    hourlyRate: 85,
    annualSalary: 130000,
    education: "B.Tech in Computer Science",
    bio: "Expert Angular developer with strong RxJS state-management skills, specialized in enterprise portal modularization.",
    matchRating: 93
  },
  {
    id: "EXT-107",
    name: "Amit Sen",
    role: "Product Manager (Technical)",
    skills: ["Product Roadmap", "Jira", "Agile/Scrum", "Data Analytics"],
    experience: 6,
    company: "Paytm",
    email: "amit.sen@paytm.com",
    mobile: "+91 93333 44444",
    source: "indeed",
    availability: "2 Weeks Notice",
    hourlyRate: 95,
    annualSalary: 150000,
    education: "M.B.A. in Product Management",
    bio: "Technical Product Manager with a strong software engineering foundation, experienced in managing agile cycles and product roadmaps.",
    matchRating: 94
  }
];

function seedTimelineForCandidate(candidateId) {
  const currentStatus = state.candidateStatuses[candidateId] || "Sourced";
  const timeline = [];
  
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  const statusesOrdered = [
    "Sourced", "Submitted", "L1 Scheduled", "L1 Select", 
    "L2 Scheduled", "L2 Select", "L3 Scheduled", "L3 Select", 
    "Offered", "Joined"
  ];
  
  if (currentStatus === "Rejected") {
    timeline.push({
      status: "Sourced",
      timestamp: now - 8 * oneDay,
      user: "System",
      notes: "CV imported into sourcing system"
    });
    timeline.push({
      status: "Submitted",
      timestamp: now - 6 * oneDay,
      user: "System",
      notes: "CV submitted to the hiring manager"
    });
    timeline.push({
      status: "L1 Scheduled",
      timestamp: now - 4 * oneDay,
      user: "System Administrator",
      notes: "Technical screening scheduled with HR"
    });
    timeline.push({
      status: "Rejected",
      timestamp: now - 3 * oneDay,
      user: "Hiring Team",
      notes: "Does not meet core requirements for current role"
    });
  } else {
    let idx = statusesOrdered.indexOf(currentStatus);
    if (idx === -1) {
      idx = 0;
    }
    
    for (let i = 0; i <= idx; i++) {
      const statusName = statusesOrdered[i];
      const daysAgo = (idx - i) * 1.5 + 1;
      
      let notes = "";
      if (statusName === "Sourced") notes = "CV imported into sourcing system";
      else if (statusName === "Submitted") notes = "CV submitted to the hiring manager";
      else if (statusName.includes("Scheduled")) notes = `${statusName.split(" ")[0]} interview scheduled`;
      else if (statusName.includes("Select")) notes = `Candidate cleared ${statusName.split(" ")[0]} interview`;
      else if (statusName === "Offered") notes = "Hiring proposal and offer letter sent";
      else if (statusName === "Joined") notes = "Candidate accepted offer and onboarding complete";
      
      timeline.push({
        status: statusName,
        timestamp: now - Math.round(daysAgo * oneDay),
        user: i < 2 ? "System" : "System Administrator",
        notes: notes
      });
    }
  }
  
  return timeline;
}

function getRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.round(diff / (1000 * 60));
  const hours = Math.round(diff / (1000 * 60 * 60));
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Global Event Listeners
function setupEventListeners() {
  // Navigation Logo Click
  elements.navLogo.addEventListener("click", (e) => {
    e.preventDefault();
    if (!state.currentUser) {
      navigateTo("home");
    } else if (state.currentRole === "Admin") {
      navigateTo("admin");
    } else if (state.currentRole === "Candidate") {
      navigateTo("candidate-dashboard");
    } else {
      navigateTo("home");
    }
  });

  // Toggle simulated profile role (legacy button toggle)
  elements.toggleRoleBtn.addEventListener("click", () => {
    if (state.currentRole === "Business") {
      state.currentRole = "Admin";
      sessionStorage.setItem("ais_currentRole", "Admin");
      navigateTo("admin");
    } else {
      state.currentRole = "Business";
      sessionStorage.setItem("ais_currentRole", "Business");
      navigateTo("home");
    }
    renderAllViews();
  });

  // Role simulator dropdown selection changer
  elements.roleSimulatorDropdown.addEventListener("change", (e) => {
    const selectedRole = e.target.value;
    state.currentRole = selectedRole;
    sessionStorage.setItem("ais_currentRole", selectedRole);
    
    if (selectedRole === "Admin") {
      navigateTo("admin");
    } else if (selectedRole === "Candidate") {
      navigateTo("candidate-dashboard");
    } else {
      navigateTo("home");
    }
    renderAllViews();
  });

  elements.logoutBtn.addEventListener("click", () => {
    logoutUser();
  });

  // Login Simulator: Select Roles on Auth screen
  elements.authSelectBusiness.addEventListener("click", () => {
    elements.authSelectBusiness.classList.add("active");
    elements.authSelectCandidate.classList.remove("active");
    elements.authSelectAdmin.classList.remove("active");
    state.currentRole = "Business";
    elements.loginEmailInput.value = "hiring@techcorp.com";
  });

  elements.authSelectCandidate.addEventListener("click", () => {
    elements.authSelectCandidate.classList.add("active");
    elements.authSelectBusiness.classList.remove("active");
    elements.authSelectAdmin.classList.remove("active");
    state.currentRole = "Candidate";
    elements.loginEmailInput.value = "candidate@talentsource.com";
  });

  elements.authSelectAdmin.addEventListener("click", () => {
    elements.authSelectAdmin.classList.add("active");
    elements.authSelectBusiness.classList.remove("active");
    elements.authSelectCandidate.classList.remove("active");
    state.currentRole = "Admin";
    elements.loginEmailInput.value = "admin@aisourcing.com";
  });

  // Login Simulator Form submit
  elements.authLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = elements.loginEmailInput.value.trim();
    if (email) {
      state.currentUser = email;
      sessionStorage.setItem("ais_currentUser", email);
      sessionStorage.setItem("ais_currentRole", state.currentRole);
      
      elements.logoutBtn.classList.remove("hidden");
      
      if (state.currentRole === "Admin") {
        navigateTo("admin");
      } else if (state.currentRole === "Candidate") {
        navigateTo("candidate-dashboard");
      } else {
        navigateTo("home");
      }
      renderAllViews();
    }
  });

  // Business Navigation Links
  elements.linkBusinessHome.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("home");
  });

  elements.linkBusinessTracker.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("home");
    if (elements.userRequestsPanel) {
      elements.userRequestsPanel.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Candidate Navigation Links
  elements.linkCandidateDashboard.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("candidate-dashboard");
  });

  elements.linkCandidateProfile.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("candidate-profile");
  });

  elements.linkCandidateJobs.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("candidate-jobs");
  });

  elements.linkCandidateSupport.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("candidate-support");
  });

  // Home card selections (Business)
  elements.modePermanentCard.addEventListener("click", () => selectHiringModel("Permanent"));
  elements.modeAugmentCard.addEventListener("click", () => selectHiringModel("Resource Augment"));
  elements.modeHourlyCard.addEventListener("click", () => selectHiringModel("Hire by Hour"));

  // Navigation backs
  elements.backToHomeBtn.addEventListener("click", () => {
    if (state.currentRole === "Business") {
      navigateTo("business-hiring-models");
    } else {
      navigateTo("home");
    }
  });
  elements.backToReqBtn.addEventListener("click", () => navigateTo("requirement"));

  // Requirement Form Submit
  elements.reqForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Capture values
    const checkedSkills = [];
    document.querySelectorAll("input[name='skills']:checked").forEach(checkbox => {
      checkedSkills.push(checkbox.value);
    });

    state.currentRequirement = {
      role: elements.reqRole.value,
      experience: elements.reqExperience.value,
      skills: checkedSkills,
      budget: elements.reqBudget.value,
      availability: elements.reqAvailability.value
    };

    displayCandidateGrid();
  });

  // Chat message send events
  elements.chatSendActionBtn.addEventListener("click", handleUserChatMessage);
  elements.chatUserTextbox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserChatMessage();
  });

  // Admin clear state
  elements.adminClearDataBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all platform requests?")) {
      state.requests = [];
      saveRequestsToStorage();
      renderAllViews();
    }
  });

  // Redirect link inside Admin notice
  elements.goToAdminDashboardBtn.addEventListener("click", () => {
    navigateTo("admin");
  });

  // Candidate Cascading Location Dropdowns
  elements.candCountry.addEventListener("change", (e) => {
    updateLocationStateOptions(e.target.value);
  });
  elements.candState.addEventListener("change", (e) => {
    updateLocationCityOptions(elements.candCountry.value, e.target.value);
  });

  // Candidate Conditional Profile Form Fields
  elements.candNotice.addEventListener("change", (e) => {
    toggleNoticeDatePanel(e.target.value);
  });

  // Candidate Repeating Education Qualifications
  elements.addEducationBtn.addEventListener("click", () => {
    state.candidateProfile.educations.push({
      degree: "",
      passingYear: "",
      gradType: "Fulltime",
      mbaMode: "Online",
      mbaOfflineType: "Fulltime",
      institute: ""
    });
    renderEducationHistoryInputs();
    updateProfileCompleteness();
  });

  // Candidate Repeating Employment Histories
  elements.addJobExperienceBtn.addEventListener("click", () => {
    state.candidateProfile.jobs.push({
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      location: "",
      reason: ""
    });
    renderJobsHistoryInputs();
    updateProfileCompleteness();
  });

  // Candidate Profile Save Submission
  elements.candidateProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Verify employment gaps before saving
    const gaps = findEmploymentGaps();
    for (const gap of gaps) {
      const gapKey = `${gap.prevCompany}_to_${gap.nextCompany}_gap`;
      if (!state.candidateProfile.gapReasons) {
        state.candidateProfile.gapReasons = {};
      }
      const existingReason = state.candidateProfile.gapReasons[gapKey];
      if (!existingReason || existingReason.trim() === "") {
        const reason = prompt(`We detected a gap of ${gap.days} days between your employment at ${gap.prevCompany} (ended ${gap.endDateStr}) and ${gap.nextCompany} (started ${gap.startDateStr}).\n\nPlease enter the reason for this gap:`);
        if (reason && reason.trim() !== "") {
          state.candidateProfile.gapReasons[gapKey] = reason.trim();
          renderGapsSection();
        } else {
          alert(`Reason for the employment gap between ${gap.prevCompany} and ${gap.nextCompany} is required.`);
          return;
        }
      }
    }
    
    state.candidateProfile.firstName = elements.candFirstname.value.trim();
    state.candidateProfile.lastName = elements.candLastname.value.trim();
    state.candidateProfile.country = elements.candCountry.value;
    state.candidateProfile.state = elements.candState.value;
    state.candidateProfile.city = elements.candCity.value;
    
    state.candidateProfile.ctcFixed = elements.candCtcfixed.value;
    state.candidateProfile.ctcVar = elements.candCtcvar.value;
    state.candidateProfile.expectedCtc = elements.candExpectedctc.value;
    state.candidateProfile.jobType = elements.candJobtype.value;
    state.candidateProfile.noticePeriod = elements.candNotice.value;
    state.candidateProfile.lastDay = elements.candLastday.value;
    
    addActivityLog("Updated sourcing profile information", "indigo", "view");
    saveCandidateProfile();
    updateProfileCompleteness();
    alert("Profile saved successfully!");
    navigateTo("candidate-dashboard");
  });

  // Candidate Sourcing Analyzer scorecard
  elements.triggerAnalyzerBtn.addEventListener("click", () => {
    runAiProfileAnalyzer();
  });

  // Event listener for tab updates (realtime simulation)
  window.addEventListener("storage", (e) => {
    loadRequestsFromStorage();
    renderAllViews();
  });

  // Listening to custom tab syncing in single window
  window.addEventListener("storage_updated", () => {
    renderAllViews();
  });

  // Theme Toggle click handler
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("ais_theme", isLight ? "light" : "dark");
      
      // Sync sidebar toggle icons
      if (elements.sidebarThemeToggle) {
        const moonIcon = elements.sidebarThemeToggle.querySelector(".moon-icon");
        const sunIcon = elements.sidebarThemeToggle.querySelector(".sun-icon");
        const textSpan = elements.sidebarThemeToggle.querySelector(".theme-text");
        if (isLight) {
          if (moonIcon) moonIcon.classList.add("hidden");
          if (sunIcon) sunIcon.classList.remove("hidden");
          if (textSpan) textSpan.textContent = "Light Mode";
        } else {
          if (moonIcon) moonIcon.classList.remove("hidden");
          if (sunIcon) sunIcon.classList.add("hidden");
          if (textSpan) textSpan.textContent = "Dark Mode";
        }
      }
    });
  }

  // Sidebar Links Navigation Click Bindings
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      
      const page = link.dataset.page;
      
      if (page === "candidate-dashboard") {
        navigateTo("candidate-dashboard");
      } else if (page === "candidate-jobs") {
        navigateTo("candidate-applications");
      } else if (page === "candidate-jobs-browse") {
        navigateTo("candidate-jobs");
      } else if (page === "candidate-support-interviews") {
        navigateTo("candidate-interviews");
      } else if (page === "candidate-support-messages") {
        navigateTo("candidate-support");
      } else if (page === "candidate-profile") {
        navigateTo("candidate-profile");
      } else if (page === "candidate-dashboard-docs") {
        navigateTo("candidate-documents");
      } else if (page === "candidate-dashboard-activity") {
        navigateTo("candidate-dashboard");
        const act = document.getElementById("dashboard-activity-panel");
        if (act) act.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (page && (page.startsWith("business-") || page.startsWith("admin-"))) {
        navigateTo(page);
      }
    });
  });

  // Sidebar controls
  if (elements.sidebarThemeToggle) {
    elements.sidebarThemeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("ais_theme", isLight ? "light" : "dark");
      syncThemeUI();
    });
  }

  if (elements.businessSidebarThemeToggle) {
    elements.businessSidebarThemeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("ais_theme", isLight ? "light" : "dark");
      syncThemeUI();
    });
  }

  if (elements.adminSidebarThemeToggle) {
    elements.adminSidebarThemeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("ais_theme", isLight ? "light" : "dark");
      syncThemeUI();
    });
  }

  if (elements.sidebarLogoutBtn) {
    elements.sidebarLogoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  if (elements.businessSidebarLogoutBtn) {
    elements.businessSidebarLogoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  if (elements.adminSidebarLogoutBtn) {
    elements.adminSidebarLogoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  if (elements.sidebarSettingsBtn) {
    elements.sidebarSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Settings Simulator: Your sourcing credentials and security preferences are active.");
    });
  }

  if (elements.businessSettingsForm) {
    elements.businessSettingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.companyProfile.companyName = elements.bizSettingsCompanyName.value.trim();
      state.companyProfile.industry = elements.bizSettingsCompanyIndustry.value.trim();
      state.companyProfile.email = elements.bizSettingsCompanyEmail.value.trim();
      state.companyProfile.location = elements.bizSettingsCompanyLocation.value.trim();
      
      saveCompanyProfile();
      
      // Update sidebar avatar and name in real-time
      const cName = state.companyProfile.companyName;
      const words = cName.split(/\s+/);
      let initials = "";
      if (words.length > 0 && words[0]) initials += words[0][0];
      if (words.length > 1 && words[1]) initials += words[1][0];
      if (!initials) initials = "TC";
      if (elements.businessSidebarAvatarCircle) elements.businessSidebarAvatarCircle.textContent = initials.toUpperCase();
      if (elements.businessSidebarProfileName) elements.businessSidebarProfileName.textContent = cName;
      
      // Also update dashboard greetings header
      const title = document.getElementById("business-welcome-title");
      if (title) title.textContent = `Welcome back, ${cName}!`;
      
      alert("Company settings saved successfully!");
    });
  }

  if (elements.businessDashboardNewRequestBtn) {
    elements.businessDashboardNewRequestBtn.addEventListener("click", () => {
      navigateTo("business-hiring-models");
    });
  }

  const bizViewInterviewsLink = document.getElementById("biz-view-interviews-link");
  if (bizViewInterviewsLink) {
    bizViewInterviewsLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("business-interviews");
    });
  }
  
  const bizViewTrackerLink = document.getElementById("biz-view-tracker-link");
  if (bizViewTrackerLink) {
    bizViewTrackerLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("business-tracker");
    });
  }
  
  const bizViewTalentCatalogLink = document.getElementById("biz-view-talent-catalog-link");
  if (bizViewTalentCatalogLink) {
    bizViewTalentCatalogLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("business-talent-catalog");
    });
  }

  // Dashboard quick-actions shortcut buttons (Candidates)
  const findJobsBtn = document.getElementById("dashboard-find-jobs-btn");
  if (findJobsBtn) {
    findJobsBtn.addEventListener("click", () => {
      navigateTo("candidate-jobs");
    });
  }

  const viewAppsLink = document.getElementById("view-applications-link");
  if (viewAppsLink) {
    viewAppsLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("candidate-applications");
    });
  }

  const viewInterviewsLinks = ["view-interviews-header-link", "view-interviews-footer-link"];
  viewInterviewsLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo("candidate-interviews");
      });
    }
  });

  const completeProfileLink = document.getElementById("complete-profile-btn-link");
  if (completeProfileLink) {
    completeProfileLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("candidate-profile");
    });
  }

  const viewActivityLink = document.getElementById("view-activity-link");
  if (viewActivityLink) {
    viewActivityLink.addEventListener("click", (e) => {
      e.preventDefault();
      const panel = document.getElementById("dashboard-activity-panel");
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  const viewJobsRecommendLink = document.getElementById("view-jobs-recommend-link");
  if (viewJobsRecommendLink) {
    viewJobsRecommendLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("candidate-jobs");
    });
  }

  // Admin Workspace Event Listeners
  if (elements.adminDashboardResetBtn) {
    elements.adminDashboardResetBtn.addEventListener("click", () => {
      resetPlatformData();
    });
  }

  if (elements.adminSettingsClearBtn) {
    elements.adminSettingsClearBtn.addEventListener("click", () => {
      resetPlatformData();
    });
  }

  if (elements.adminSettingsSeedBtn) {
    elements.adminSettingsSeedBtn.addEventListener("click", () => {
      seedMockPlacements();
    });
  }

  if (elements.adminSimulateRequestBtn) {
    elements.adminSimulateRequestBtn.addEventListener("click", () => {
      simulateMockHiringRequest();
    });
  }

  if (elements.adminSimulateCandidateBtn) {
    elements.adminSimulateCandidateBtn.addEventListener("click", () => {
      registerMockCandidate();
    });
  }

  if (elements.adminViewQueueLink) {
    elements.adminViewQueueLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("admin-requests-queue");
    });
  }

  if (elements.adminSimTaxrate) {
    elements.adminSimTaxrate.addEventListener("input", () => {
      renderAdminDashboard();
    });
  }

  // Interactive Sourced CV navigation for all 10 funnel stage metric cards
  const funnelFilters = [
    { el: elements.adminFunnelCVSourced, val: "all" },
    { el: elements.adminFunnelCVSubmitted, val: "Submitted" },
    { el: elements.adminFunnelL1Scheduled, val: "L1 Scheduled" },
    { el: elements.adminFunnelL1Select, val: "L1 Select" },
    { el: elements.adminFunnelL2Scheduled, val: "L2 Scheduled" },
    { el: elements.adminFunnelL2Select, val: "L2 Select" },
    { el: elements.adminFunnelL3Scheduled, val: "L3 Scheduled" },
    { el: elements.adminFunnelL3Select, val: "L3 Select" },
    { el: elements.adminFunnelOffered, val: "Offered" },
    { el: elements.adminFunnelJoined, val: "Joined" }
  ];

  funnelFilters.forEach(item => {
    if (item.el) {
      item.el.addEventListener("click", () => {
        if (elements.cvSourcedFilterStatus) {
          elements.cvSourcedFilterStatus.value = item.val;
        }
        navigateTo("admin-cv-sourced");
        renderAdminCVSourced();
      });
    }
  });

  if (elements.cvSourcedSearch) {
    elements.cvSourcedSearch.addEventListener("input", () => {
      renderAdminCVSourced();
    });
  }

  if (elements.cvSourcedFilterStatus) {
    elements.cvSourcedFilterStatus.addEventListener("change", () => {
      renderAdminCVSourced();
    });
  }

  if (elements.cvSourcedSortBy) {
    elements.cvSourcedSortBy.addEventListener("change", () => {
      renderAdminCVSourced();
    });
  }

  if (elements.adminCVSourcedBackBtn) {
    elements.adminCVSourcedBackBtn.addEventListener("click", () => {
      navigateTo("admin-dashboard");
    });
  }

  if (elements.adminStatusTimelineBackBtn) {
    elements.adminStatusTimelineBackBtn.addEventListener("click", () => {
      navigateTo("admin-cv-sourced");
    });
  }

  if (elements.closeCandidateModalBtn) {
    elements.closeCandidateModalBtn.addEventListener("click", () => {
      elements.candidateDetailModal.classList.add("hidden");
    });
  }

  if (elements.candidateDetailModal) {
    elements.candidateDetailModal.addEventListener("click", (e) => {
      if (e.target === elements.candidateDetailModal) {
        elements.candidateDetailModal.classList.add("hidden");
      }
    });
  }

  if (elements.closeRequestModalBtn) {
    elements.closeRequestModalBtn.addEventListener("click", () => {
      elements.requestDetailModal.classList.add("hidden");
    });
  }

  if (elements.requestDetailModal) {
    elements.requestDetailModal.addEventListener("click", (e) => {
      if (e.target === elements.requestDetailModal) {
        elements.requestDetailModal.classList.add("hidden");
      }
    });
  }

  // Email Composer listeners
  if (elements.closeEmailModalBtn) {
    elements.closeEmailModalBtn.addEventListener("click", () => {
      elements.emailComposerModal.classList.add("hidden");
    });
  }

  if (elements.cancelEmailBtn) {
    elements.cancelEmailBtn.addEventListener("click", () => {
      elements.emailComposerModal.classList.add("hidden");
    });
  }

  if (elements.emailComposerModal) {
    elements.emailComposerModal.addEventListener("click", (e) => {
      if (e.target === elements.emailComposerModal) {
        elements.emailComposerModal.classList.add("hidden");
      }
    });
  }

  if (elements.emailJdAttachment) {
    elements.emailJdAttachment.addEventListener("change", (e) => {
      const jobId = e.target.value;
      if (jobId) {
        const job = mockOpeningsData.find(j => j.id === jobId);
        if (job) {
          elements.emailAttachmentFilename.textContent = `${job.id}_${job.role.replace(/\s+/g, '_')}_JD.pdf`;
          elements.emailAttachmentPreviewPanel.classList.remove("hidden");
          
          let currentBody = elements.emailBody.value;
          const mentionText = `\n\nI have also attached the Job Description (${job.id}: ${job.role}) for your reference.`;
          
          currentBody = currentBody.replace(/\n\nI have also attached the Job Description.*for your reference\./g, "");
          
          const signOffIndex = currentBody.lastIndexOf("Best regards,");
          if (signOffIndex !== -1) {
            elements.emailBody.value = currentBody.substring(0, signOffIndex) + mentionText + "\n\n" + currentBody.substring(signOffIndex);
          } else {
            elements.emailBody.value = currentBody + mentionText;
          }
        }
      } else {
        elements.emailAttachmentPreviewPanel.classList.add("hidden");
        let currentBody = elements.emailBody.value;
        elements.emailBody.value = currentBody.replace(/\n\nI have also attached the Job Description.*for your reference\./g, "");
      }
    });
  }

  if (elements.removeEmailAttachmentBtn) {
    elements.removeEmailAttachmentBtn.addEventListener("click", () => {
      elements.emailJdAttachment.value = "";
      elements.emailAttachmentPreviewPanel.classList.add("hidden");
      let currentBody = elements.emailBody.value;
      elements.emailBody.value = currentBody.replace(/\n\nI have also attached the Job Description.*for your reference\./g, "");
    });
  }

  if (elements.emailComposerForm) {
    elements.emailComposerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const candidateId = elements.emailCandidateId.value;
      const toAddress = elements.emailToAddress.value;
      const subject = elements.emailSubject.value;
      const jdId = elements.emailJdAttachment.value;
      const body = elements.emailBody.value;
      
      const cand = candidatesData.find(c => c.id === candidateId);
      const name = cand ? (candidateMockDetails[candidateId] ? candidateMockDetails[candidateId].name : cand.name) : "Candidate";
      
      let attachmentName = "None";
      if (elements.emailAttachmentPreviewPanel && !elements.emailAttachmentPreviewPanel.classList.contains("hidden")) {
        attachmentName = elements.emailAttachmentFilename.textContent;
      } else if (jdId) {
        const job = mockOpeningsData.find(j => j.id === jdId);
        if (job) {
          attachmentName = `${job.id}_${job.role.replace(/\s+/g, '_')}_JD.pdf`;
        }
      }
      
      addAdminLog(`Sent email to ${toAddress} with attachment: ${attachmentName}`, "info");
      addAdminLog(`Initiated communication with ${name} via Email`, "info");
      
      alert(`Email successfully sent to ${toAddress}!\nSubject: ${subject}\nAttachment: ${attachmentName}`);
      
      elements.emailComposerModal.classList.add("hidden");
    });
  }

  if (elements.closeAssignModalBtn) {
    elements.closeAssignModalBtn.addEventListener("click", () => {
      elements.assignRecruiterModal.classList.add("hidden");
    });
  }

  if (elements.cancelAssignBtn) {
    elements.cancelAssignBtn.addEventListener("click", () => {
      elements.assignRecruiterModal.classList.add("hidden");
    });
  }

  if (elements.assignRecruiterForm) {
    elements.assignRecruiterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const candidateId = elements.assignCandidateId.value;
      const recruiterName = elements.assignRecruiterSelect.value;
      const companyName = elements.assignCompanySelect.value;
      
      if (!recruiterName || !companyName) {
        alert("Please select both a recruiter and a company.");
        return;
      }
      
      state.assignments[candidateId] = {
        recruiter: recruiterName,
        company: companyName,
        timestamp: Date.now()
      };
      saveAssignments();
      
      const cand = candidatesData.find(c => c.id === candidateId);
      const candName = cand ? (candidateMockDetails[candidateId] ? candidateMockDetails[candidateId].name : cand.name) : "Candidate";
      
      addAdminLog(`Assigned Candidate ${candName} (${candidateId}) to Recruiter ${recruiterName} for ${companyName}`, "info");
      
      alert(`Successfully assigned ${candName} to ${recruiterName} for ${companyName}!`);
      
      elements.assignRecruiterModal.classList.add("hidden");
      renderAdminTalentPool();
      renderAdminCVSourced();
    });
  }

  if (elements.cvSourcedSearchBtn) {
    elements.cvSourcedSearchBtn.addEventListener("click", () => {
      const val = elements.cvSourcedSearch.value;
      executeSourcingSearch(val);
    });
  }
  
  if (elements.cvSourcedSearch) {
    elements.cvSourcedSearch.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        executeSourcingSearch(elements.cvSourcedSearch.value);
      }
    });
  }

  if (elements.addCustomIntegrationBtn) {
    elements.addCustomIntegrationBtn.addEventListener("click", () => {
      elements.integrationName.value = "";
      elements.integrationUrl.value = "";
      elements.integrationKey.value = "";
      elements.customIntegrationModal.classList.remove("hidden");
    });
  }

  if (elements.closeIntegrationModalBtn) {
    elements.closeIntegrationModalBtn.addEventListener("click", () => {
      elements.customIntegrationModal.classList.add("hidden");
    });
  }

  if (elements.cancelIntegrationBtn) {
    elements.cancelIntegrationBtn.addEventListener("click", () => {
      elements.customIntegrationModal.classList.add("hidden");
    });
  }

  if (elements.customIntegrationForm) {
    elements.customIntegrationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = elements.integrationName.value;
      const url = elements.integrationUrl.value;
      const key = elements.integrationKey.value;
      
      const newIntegration = {
        id: "cust_" + Math.floor(10000 + Math.random() * 90000),
        name: name,
        url: url,
        apiKey: key,
        active: true
      };
      
      state.customIntegrations.push(newIntegration);
      saveIntegrations();
      renderAdminIntegrations();
      
      addAdminLog(`Added and activated custom integration for ${name}`, "info");
      
      elements.customIntegrationModal.classList.add("hidden");
    });
  }
}

// Selection of hiring cards
function selectHiringModel(model) {
  state.currentHiringModel = model;
  elements.reqViewTitle.textContent = `${model} Specifications`;
  
  // Format Form labels and placeholders based on selection
  if (model === "Permanent") {
    elements.budgetInputLabel.textContent = "Max Annual Salary ($)";
    elements.reqBudget.placeholder = "e.g. 130000";
  } else if (model === "Resource Augment") {
    elements.budgetInputLabel.textContent = "Max Monthly Budget ($)";
    elements.reqBudget.placeholder = "e.g. 12000";
  } else {
    elements.budgetInputLabel.textContent = "Max Hourly Rate ($/hr)";
    elements.reqBudget.placeholder = "e.g. 80";
  }

  // Clear inputs
  elements.reqForm.reset();
  
  // Clear chat logs and load first bot message
  elements.chatMessagesDisplay.innerHTML = "";
  state.chatHistory = [];
  addChatBubble("bot", chatbotGreetings[model]);

  // Navigate
  navigateTo("requirement");
}

// Chat functions
function addChatBubble(sender, text, htmlContent = null) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  
  if (htmlContent) {
    bubble.innerHTML = htmlContent;
  } else {
    bubble.textContent = text;
  }
  
  elements.chatMessagesDisplay.appendChild(bubble);
  scrollToBottom(elements.chatMessagesDisplay);
  
  state.chatHistory.push({ sender, text });
}

function showTypingIndicator() {
  const indicator = document.createElement("div");
  indicator.className = "chat-bubble bot typing-indicator-bubble";
  indicator.innerHTML = `
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  elements.chatMessagesDisplay.appendChild(indicator);
  scrollToBottom(elements.chatMessagesDisplay);
  return indicator;
}

function scrollToBottom(el) {
  el.scrollTop = el.scrollHeight;
}

// Chat matching and dynamic intelligence
function handleUserChatMessage() {
  const text = elements.chatUserTextbox.value.trim();
  if (!text) return;
  
  // Clear input
  elements.chatUserTextbox.value = "";
  
  // Push user text
  addChatBubble("user", text);
  
  // Processing animation
  const indicator = showTypingIndicator();
  
  setTimeout(() => {
    // Delete indicator
    indicator.remove();
    
    // Parse user specifications
    const lowercase = text.toLowerCase();
    const parsedSkills = [];
    let parsedExp = "";
    
    // Skill tagging patterns
    const skillList = ["React", "TypeScript", "Node.js", "Python", "Figma", "Docker", "AWS", "Kubernetes", "Selenium", "Product Roadmap"];
    skillList.forEach(s => {
      if (lowercase.includes(s.toLowerCase())) {
        parsedSkills.push(s);
      }
    });
    
    // Backup search for abbreviations
    if (lowercase.includes("frontend") || lowercase.includes("web") || lowercase.includes("next.js") || lowercase.includes("nextjs")) {
      if (!parsedSkills.includes("React")) parsedSkills.push("React");
    }
    if (lowercase.includes("backend") || lowercase.includes("express") || lowercase.includes("api")) {
      if (!parsedSkills.includes("Node.js")) parsedSkills.push("Node.js");
    }
    if (lowercase.includes("ai") || lowercase.includes("data science") || lowercase.includes("ml") || lowercase.includes("model")) {
      if (!parsedSkills.includes("Python")) parsedSkills.push("Python");
    }
    if (lowercase.includes("designer") || lowercase.includes("ui") || lowercase.includes("ux") || lowercase.includes("product design")) {
      if (!parsedSkills.includes("Figma")) parsedSkills.push("Figma");
    }
    if (lowercase.includes("cloud") || lowercase.includes("ci/cd") || lowercase.includes("infrastructure") || lowercase.includes("devops")) {
      if (!parsedSkills.includes("AWS")) parsedSkills.push("AWS");
      if (!parsedSkills.includes("Docker")) parsedSkills.push("Docker");
    }
    if (lowercase.includes("qa") || lowercase.includes("test") || lowercase.includes("automate")) {
      if (!parsedSkills.includes("Selenium")) parsedSkills.push("Selenium");
    }
    if (lowercase.includes("pm") || lowercase.includes("product manager") || lowercase.includes("roadmap") || lowercase.includes("agile")) {
      if (!parsedSkills.includes("Product Roadmap")) parsedSkills.push("Product Roadmap");
    }

    // Experience checks
    if (lowercase.includes("senior") || lowercase.includes("lead") || lowercase.includes("expert") || lowercase.includes("architect") || lowercase.includes("years > 7") || lowercase.includes("7+")) {
      parsedExp = "senior";
    } else if (lowercase.includes("junior") || lowercase.includes("entry") || lowercase.includes("associate") || lowercase.includes("years <= 3")) {
      parsedExp = "junior";
    } else if (lowercase.includes("mid") || lowercase.includes("intermediate") || lowercase.includes("middle")) {
      parsedExp = "mid";
    }

    // Update state parameters matching
    state.currentRequirement = {
      role: parsedSkills[0] || "", // guess role based on skills
      experience: parsedExp || "all",
      skills: parsedSkills,
      budget: "",
      availability: "all",
      chatInputQuery: text // Store full query
    };

    // Automatically populate the form below in real-time
    // 1. Core Technical Competencies checkboxes
    document.querySelectorAll("input[name='skills']").forEach(cb => {
      cb.checked = parsedSkills.includes(cb.value);
    });

    // 2. Target Role Dropdown
    if (parsedSkills.includes("React")) elements.reqRole.value = "React Developer";
    else if (parsedSkills.includes("Node.js")) elements.reqRole.value = "Node.js Engineer";
    else if (parsedSkills.includes("Python")) elements.reqRole.value = "Python Data Scientist";
    else if (parsedSkills.includes("Figma")) elements.reqRole.value = "UI/UX Designer";
    else if (parsedSkills.includes("AWS") || parsedSkills.includes("Docker")) elements.reqRole.value = "DevOps Engineer";
    else if (parsedSkills.includes("Selenium")) elements.reqRole.value = "QA Specialist";
    else if (parsedSkills.includes("Product Roadmap")) elements.reqRole.value = "Product Manager";

    // 3. Preferred Experience Dropdown
    if (parsedExp) {
      elements.reqExperience.value = parsedExp;
    }

    // 4. Budget Numeric Matcher
    const budgetMatch = lowercase.match(/(?:budget|rate|salary|pay|under)\s*(?:of|is|around|to)?\s*\$?(\d+)(k)?/i);
    if (budgetMatch) {
      let amt = parseInt(budgetMatch[1]);
      if (budgetMatch[2]) amt *= 1000;
      elements.reqBudget.value = amt;
    }

    // 5. Availability Selection
    if (lowercase.includes("immediate") || lowercase.includes("asap") || lowercase.includes("right away") || lowercase.includes("now")) {
      elements.reqAvailability.value = "Immediate";
    } else if (lowercase.includes("2 weeks") || lowercase.includes("notice")) {
      elements.reqAvailability.value = "2 Weeks Notice";
    }

    // Bot Response formulation
    let responseText = "";
    if (parsedSkills.length > 0) {
      responseText = `Perfect! I've noted down your tech stack specifications: <strong>${parsedSkills.join(", ")}</strong>. `;
      if (parsedExp) {
        responseText += `Preferring a <strong>${parsedExp}</strong> level candidate. `;
      }
      responseText += `<br><br>I've filtered the candidate directory to match these criteria. Click below to review the candidates matching your requirements.`;
      
      addChatBubble("bot", null, responseText);
      
      // Inject clickable match card
      const buttonHtml = `
        <div style="margin-top: 8px;">
          <button class="btn-card-action" onclick="window.appNavigateToCandidates()">View Matching Candidates</button>
        </div>
      `;
      addChatBubble("bot", null, buttonHtml);
    } else {
      responseText = "I received your message, but I wasn't able to extract specific technologies or roles. Try writing something like: <em>'I need a React Developer with Node.js experience'</em> or <em>'Looking for a senior product designer'</em>.";
      addChatBubble("bot", responseText);
    }
  }, 1000);
}

// Hook to allow click action inside chat bubble HTML
window.appNavigateToCandidates = function() {
  displayCandidateGrid();
};

// Candidate Matcher page loader
function displayCandidateGrid() {
  // Clear previous grid
  elements.candidateResultsGrid.innerHTML = "";
  
  // Find candidates based on stored specifications
  const requirements = state.currentRequirement;
  
  // Inject candidate profile dynamic representation into candidatesData if exists
  const currentProfile = state.candidateProfile;
  if (currentProfile && currentProfile.firstName) {
    const formattedId = "TB-999";
    const existingIdx = candidatesData.findIndex(c => c.id === formattedId);
    
    let candSkills = ["React", "TypeScript"];
    let yrsExp = 2;
    if (currentProfile.jobs && currentProfile.jobs.length > 0) {
      yrsExp = currentProfile.jobs.reduce((acc, job) => {
        const start = new Date(job.startDate);
        const end = job.endDate ? new Date(job.endDate) : new Date();
        const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24 * 365)));
        return acc + diff;
      }, 0);
      
      const titleWords = currentProfile.jobs[0].title.split(" ");
      titleWords.forEach(w => {
        if (w.length > 3 && !candSkills.includes(w)) candSkills.push(w);
      });
    }
    
    const customCand = {
      id: formattedId,
      role: currentProfile.jobs[0]?.title || "Software Developer",
      skills: candSkills,
      experience: yrsExp,
      hourlyRate: currentProfile.expectedCtc ? Math.round(parseInt(currentProfile.expectedCtc) / 2000) : 75,
      annualSalary: parseInt(currentProfile.expectedCtc) || 120000,
      education: currentProfile.educations && currentProfile.educations.length > 0
        ? currentProfile.educations.map(e => `${e.degree} from ${e.institute}`).join(", ")
        : "Graduation from UC Berkeley",
      availability: currentProfile.noticePeriod || "Immediate",
      bio: currentProfile.jobs[0] ? `Software engineer with experience at ${currentProfile.jobs.map(j => j.company).join(", ")}. Reason for leaving previous role: ${currentProfile.jobs[0].reason || 'N/A'}.` : "Accomplished developer seeking a new challenge.",
      matchRating: 95
    };
    
    if (existingIdx !== -1) {
      candidatesData[existingIdx] = customCand;
    } else {
      candidatesData.push(customCand);
    }
  }
  
  // Check matching candidate database using utility function in candidates.js
  const matched = matchCandidates(
    state.currentHiringModel, 
    requirements.chatInputQuery || requirements.role || "", 
    requirements.skills, 
    requirements.experience
  );
  
  elements.candidateCountIndicator.textContent = `${matched.length} Matches`;
  
  if (matched.length === 0) {
    elements.candidateResultsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        No candidates found matching your criteria. Try widening your filters.
      </div>
    `;
  } else {
    matched.forEach(candidate => {
      const card = document.createElement("div");
      card.className = "candidate-card glass-panel";
      
      // Select pricing view based on hiring model
      let pricingString = "";
      if (state.currentHiringModel === "Permanent") {
        pricingString = `$${(candidate.annualSalary / 1000).toFixed(0)}k<span>/yr</span>`;
      } else if (state.currentHiringModel === "Resource Augment") {
        const monthlyRate = candidate.hourlyRate * 160;
        pricingString = `$${(monthlyRate / 1000).toFixed(1)}k<span>/mo</span>`;
      } else {
        pricingString = `$${candidate.hourlyRate}<span>/hr</span>`;
      }

      // Check current request state for button disable
      let buttonHtml = "";
      const existingRequest = state.requests.find(
        r => r.candidateId === candidate.id && 
             r.model === state.currentHiringModel && 
             r.client === state.currentUser
      );

      if (existingRequest) {
        if (existingRequest.status === "In Process") {
          buttonHtml = `<button class="btn-card-action selected-processing" disabled>In Process</button>`;
        } else {
          buttonHtml = `<button class="btn-card-action selected-fulfilled" disabled>Fulfilled</button>`;
        }
      } else {
        buttonHtml = `<button class="btn-card-action" onclick="placeHiringRequest('${candidate.id}')">Request Hire</button>`;
      }

      const skillsHtml = candidate.skills.map(s => `<span class="candidate-skill-tag">${s}</span>`).join("");
      
      card.innerHTML = `
        <div>
          <div class="candidate-card-header">
            <span class="candidate-placeholder-name">
              <span class="candidate-placeholder-avatar">C</span>
              Candidate #${candidate.id.replace('TB-', 'AIS-')}
            </span>
            <span class="match-score-pill">${candidate.matchRating}% Match</span>
          </div>
          <h4 class="candidate-title">${candidate.role}</h4>
          
          <div class="candidate-meta-details">
            <div class="candidate-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              <span>${candidate.experience} Yrs Exp</span>
            </div>
            <div class="candidate-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${candidate.availability}</span>
            </div>
          </div>
          
          <p class="candidate-bio-summary">${candidate.bio}</p>
          <div class="candidate-skills-list">
            ${skillsHtml}
          </div>
        </div>
        
        <div class="candidate-card-bottom">
          <div class="candidate-pricing-info">
            <span class="pricing-label">Rate Offer</span>
            <span class="pricing-amount">${pricingString}</span>
          </div>
          ${buttonHtml}
        </div>
      `;
      
      elements.candidateResultsGrid.appendChild(card);
    });
  }

  navigateTo("candidates");
}

// Place Hiring Request (Process Button Triggered)
window.placeHiringRequest = function(candidateId) {
  // Find Candidate info
  const candidate = candidatesData.find(c => c.id === candidateId);
  if (!candidate || !state.currentUser) return;
  
  // Build request ID
  const reqId = "REQ-" + Math.floor(10000 + Math.random() * 90000);
  
  // Format Date
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const newRequest = {
    id: reqId,
    client: state.currentUser,
    model: state.currentHiringModel,
    candidateId: candidate.id,
    candidateRole: candidate.role,
    candidateExperience: candidate.experience,
    candidateRate: state.currentHiringModel === "Permanent" ? candidate.annualSalary : (state.currentHiringModel === "Resource Augment" ? candidate.hourlyRate * 160 : candidate.hourlyRate),
    submittedDate: dateStr,
    status: "In Process" // Initial Status: In Process
  };

  state.requests.unshift(newRequest);
  state.candidateStatuses[candidate.id] = "Submitted";
  saveCandidateStatuses();
  saveRequestsToStorage();
  addAdminLog(`Placement request ${reqId} created by ${state.currentUser} for Candidate #${candidateId.replace('TB-', 'AIS-')}`, "info");
  
  alert(`Hiring request placed successfully for Candidate #${candidateId.replace('TB-', 'AIS-')}. It is currently 'In Process' pending admin fulfillment.`);
  
  navigateTo("business-dashboard");
  renderAllViews();
};

// Admin Actions
window.fulfillAdminRequest = function(requestId) {
  const req = state.requests.find(r => r.id === requestId);
  if (req) {
    req.status = "Fulfilled";
    state.candidateStatuses[req.candidateId] = "Joined";
    saveCandidateStatuses();
    addAdminLog(`Placement request ${requestId} fulfilled by Administrator`, "success");
    saveRequestsToStorage();
    renderAllViews();
  }
};

window.rejectAdminRequest = function(requestId) {
  const req = state.requests.find(r => r.id === requestId);
  if (req) {
    req.status = "Rejected";
    state.candidateStatuses[req.candidateId] = "Rejected";
    saveCandidateStatuses();
    addAdminLog(`Placement request ${requestId} rejected by Administrator`, "warning");
    saveRequestsToStorage();
    renderAllViews();
  }
};

window.sourceCVsForRequest = function(requestId) {
  const req = state.requests.find(r => r.id === requestId);
  if (req) {
    navigateTo("admin-cv-sourced");
    
    document.querySelectorAll(".sidebar-link").forEach(l => {
      if (l.dataset.page === "admin-cv-sourced") {
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });

    if (elements.cvSourcedSearch) {
      elements.cvSourcedSearch.value = req.role || req.candidateRole;
      executeSourcingSearch(elements.cvSourcedSearch.value);
    }
  }
};

window.showRequestDetailsModal = function(requestId) {
  const req = state.requests.find(r => r.id === requestId);
  if (!req) return;
  
  const cand = candidatesData.find(c => c.id === req.candidateId);
  const mock = candidateMockDetails[req.candidateId] || { name: `Candidate #${req.candidateId.replace('TB-', 'AIS-')}`, company: "N/A" };
  
  const modal = elements.requestDetailModal;
  const body = elements.requestModalBody;
  if (!modal || !body) return;
  
  let priceLabel = "";
  if (req.model === "Permanent") {
    priceLabel = `$${(req.candidateRate / 1000).toFixed(0)}k/yr`;
  } else if (req.model === "Resource Augment") {
    priceLabel = `$${(req.candidateRate / 1000).toFixed(1)}k/mo`;
  } else {
    priceLabel = `$${req.candidateRate}/hr`;
  }
  
  const locationsMap = {
    "TB-101": "Bengaluru, KA (Hybrid)",
    "TB-102": "Mumbai, MH (On-site)",
    "TB-103": "Pune, MH (Remote)",
    "TB-104": "Chennai, TN (On-site)",
    "TB-105": "Hyderabad, TS (Hybrid)",
    "TB-106": "Noida, UP (Hybrid)",
    "TB-107": "Kolkata, WB (Remote)",
    "TB-108": "Bengaluru, KA (On-site)",
    "TB-109": "Gurugram, HR (On-site)",
    "TB-110": "Pune, MH (Hybrid)",
    "TB-111": "Hyderabad, TS (Hybrid)",
    "TB-112": "Mumbai, MH (On-site)",
    "TB-113": "Bengaluru, KA (Hybrid)",
    "TB-114": "Noida, UP (On-site)",
    "TB-115": "Mumbai, MH (Hybrid)"
  };
  const location = locationsMap[req.candidateId] || "Bengaluru, Hybrid";
  
  const rawId = req.candidateId.replace(/\D/g, "");
  const workMode = (parseInt(rawId) % 2 === 0) ? "Hybrid" : ((parseInt(rawId) % 3 === 0) ? "On-site" : "Remote");
  const workShifts = (parseInt(rawId) % 2 === 0) ? "General Shift (9 AM - 6 PM)" : "Flexible / Night Shift (US/UK hours)";
  
  const skills = cand ? cand.skills.join(", ") : "React, Node.js, JavaScript";
  
  const roleDescriptions = {
    "React Developer": "Responsible for designing and implementing responsive user interfaces using React.js and TypeScript, integrating RESTful APIs, and maintaining modular component libraries.",
    "Node.js Engineer": "Responsible for building high-scale microservices, managing relational/non-relational databases, optimizing serverless function execution times, and structuring API gateways.",
    "Python Data Scientist": "Responsible for building custom NLP classification pipelines, designing recommendation models, training regression algorithms, and structuring real-time analytics dashboards.",
    "UI/UX Designer": "Responsible for creating interactive Figma mockups, organizing user flow diagrams, conducting usability test sessions, and designing modular design systems.",
    "Mobile Engineer": "Responsible for compiling native iOS/Android builds using React Native, handling push notification payloads, and managing app store deployments.",
    "DevOps Engineer": "Responsible for building automated CI/CD pipeline automation scripts, managing Kubernetes pods across AWS/GCP, and monitoring uptime alerts.",
    "QA Specialist": "Responsible for constructing automated Selenium testing scripts, documenting software release bug logs, and running sanity performance checks.",
    "Product Manager": "Responsible for managing the product backlog, aligning engineering timelines, writing user stories, and conducting stakeholder progress meetings."
  };
  const roleAndResponsibilities = roleDescriptions[req.candidateRole] || "Responsible for designing, building, and optimizing key software solutions, coordinating with technical teams, and ensuring overall delivery quality.";
  
  let graduation = cand ? cand.education : "B.Tech in Computer Science";
  if (cand && (cand.education.includes("M.S.") || cand.education.includes("M.B.A.") || cand.education.includes("Ph.D."))) {
    graduation = cand.education + " (Highest Qualification)";
  } else if (cand) {
    graduation = cand.education + " (B.S./B.Tech Equivalent)";
  }
  const highestQualification = graduation;
  
  body.innerHTML = `
    <div class="modal-candidate-header" style="margin-bottom: 20px;">
      <div>
        <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Hiring Request Details</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Request ID: <span style="color: var(--accent-indigo); font-weight: 600;">${req.id}</span> &bull; Client: <strong>${req.client}</strong></p>
      </div>
      <span class="badge ${req.status === 'Fulfilled' ? 'badge-emerald' : (req.status === 'Rejected' ? 'badge-rose' : 'badge-amber')}" style="font-size: 0.75rem; text-transform: uppercase;">${req.status}</span>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.9rem; line-height: 1.6;">
      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="color: var(--text-secondary); font-weight: 600; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Offered Salary</span>
        <strong style="color: var(--text-primary); font-size: 1.1rem;">${priceLabel}</strong> <span style="font-size: 0.8rem; color: var(--text-muted);">(${req.model} Hiring Model)</span>
      </div>

      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="color: var(--text-secondary); font-weight: 600; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Location</span>
        <strong style="color: var(--text-primary);">${location}</strong>
      </div>

      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="color: var(--text-secondary); font-weight: 600; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Work Mode</span>
        <strong style="color: var(--text-primary);">${workMode}</strong>
      </div>

      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="color: var(--text-secondary); font-weight: 600; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Work Shifts</span>
        <strong style="color: var(--text-primary);">${workShifts}</strong>
      </div>

      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="color: var(--text-secondary); font-weight: 600; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Skills</span>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
          ${skills.split(", ").map(s => `<span class="candidate-skill-tag" style="background: rgba(99, 102, 241, 0.08); color: var(--accent-indigo); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 500;">${s}</span>`).join("")}
        </div>
      </div>

      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="color: var(--text-secondary); font-weight: 600; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Role and Responsibilities</span>
        <strong style="color: var(--text-primary); font-size: 1rem; display: block; margin-bottom: 6px;">${req.candidateRole}</strong>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0; font-style: italic;">${roleAndResponsibilities}</p>
      </div>

      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="color: var(--text-secondary); font-weight: 600; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Highest Qualification</span>
        <strong style="color: var(--text-primary);">${highestQualification}</strong>
      </div>
    </div>
    
    <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid var(--border-glass); padding-top: 16px;">
      ${req.status === 'In Process' ? `
        <button class="btn-nav-action primary" onclick="sourceCVsForRequest('${req.id}'); document.getElementById('request-detail-modal').classList.add('hidden');" style="padding: 8px 16px; font-size: 0.85rem; height: 38px; cursor: pointer;">Source CVs</button>
        <button class="btn-nav-action secondary" onclick="rejectAdminRequest('${req.id}'); document.getElementById('request-detail-modal').classList.add('hidden');" style="padding: 8px 16px; font-size: 0.85rem; height: 38px; background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #f87171; cursor: pointer;">Reject</button>
      ` : ''}
      <button class="btn-nav-action secondary" onclick="document.getElementById('request-detail-modal').classList.add('hidden')" style="padding: 8px 16px; font-size: 0.85rem; height: 38px; cursor: pointer;">Close</button>
    </div>
  `;
  
  modal.classList.remove("hidden");
};

// Router View Switcher
function navigateTo(pageName) {
  state.activePage = pageName;
  
  // Hide all screens
  elements.homeView.classList.add("hidden");
  elements.reqView.classList.add("hidden");
  elements.candidatesView.classList.add("hidden");
  elements.adminView.classList.add("hidden");
  elements.candidateDashboardView.classList.add("hidden");
  elements.candidateProfileView.classList.add("hidden");
  elements.candidateJobsView.classList.add("hidden");
  elements.candidateSupportView.classList.add("hidden");
  if (elements.candidateInterviewsView) {
    elements.candidateInterviewsView.classList.add("hidden");
  }
  if (elements.candidateApplicationsView) {
    elements.candidateApplicationsView.classList.add("hidden");
  }
  if (elements.candidateDocumentsView) {
    elements.candidateDocumentsView.classList.add("hidden");
  }
  
  // Hide business views
  if (elements.businessDashboardView) elements.businessDashboardView.classList.add("hidden");
  if (elements.businessHiringModelsView) elements.businessHiringModelsView.classList.add("hidden");
  if (elements.businessTrackerView) elements.businessTrackerView.classList.add("hidden");
  if (elements.businessInterviewsView) elements.businessInterviewsView.classList.add("hidden");
  if (elements.businessBillingView) elements.businessBillingView.classList.add("hidden");
  if (elements.businessSettingsView) elements.businessSettingsView.classList.add("hidden");

  // Hide admin views
  if (elements.adminDashboardView) elements.adminDashboardView.classList.add("hidden");
  if (elements.adminRequestsQueueView) elements.adminRequestsQueueView.classList.add("hidden");
  if (elements.adminTalentPoolView) elements.adminTalentPoolView.classList.add("hidden");
  if (elements.adminGlobalInterviewsView) elements.adminGlobalInterviewsView.classList.add("hidden");
  if (elements.adminSystemSettingsView) elements.adminSystemSettingsView.classList.add("hidden");
  if (elements.adminCVSourcedView) elements.adminCVSourcedView.classList.add("hidden");
  if (elements.adminStatusTimelineView) elements.adminStatusTimelineView.classList.add("hidden");
  if (elements.requestDetailModal) elements.requestDetailModal.classList.add("hidden");
  if (elements.assignRecruiterModal) elements.assignRecruiterModal.classList.add("hidden");
  if (elements.emailComposerModal) elements.emailComposerModal.classList.add("hidden");
  if (elements.adminIntegrationsView) elements.adminIntegrationsView.classList.add("hidden");
  if (elements.customIntegrationModal) elements.customIntegrationModal.classList.add("hidden");

  if (pageName === "home") {
    if (state.currentUser) {
      if (state.currentRole === "Candidate") {
        navigateTo("candidate-dashboard");
        return;
      } else if (state.currentRole === "Business") {
        navigateTo("business-dashboard");
        return;
      } else if (state.currentRole === "Admin") {
        navigateTo("admin-dashboard");
        return;
      }
    }
    elements.homeView.classList.remove("hidden");
  } else if (pageName === "requirement") {
    elements.reqView.classList.remove("hidden");
  } else if (pageName === "candidates") {
    elements.candidatesView.classList.remove("hidden");
  } else if (pageName === "admin" || pageName === "admin-dashboard") {
    if (elements.adminDashboardView) {
      elements.adminDashboardView.classList.remove("hidden");
      renderAdminDashboard();
    }
  } else if (pageName === "admin-requests-queue") {
    if (elements.adminRequestsQueueView) {
      elements.adminRequestsQueueView.classList.remove("hidden");
      renderAdminRequestsQueue();
    }
  } else if (pageName === "admin-talent-pool") {
    if (elements.adminTalentPoolView) {
      elements.adminTalentPoolView.classList.remove("hidden");
      renderAdminTalentPool();
    }
  } else if (pageName === "admin-global-interviews") {
    if (elements.adminGlobalInterviewsView) {
      elements.adminGlobalInterviewsView.classList.remove("hidden");
      renderAdminGlobalInterviews();
    }
  } else if (pageName === "admin-system-settings") {
    if (elements.adminSystemSettingsView) {
      elements.adminSystemSettingsView.classList.remove("hidden");
    }
  } else if (pageName === "admin-cv-sourced") {
    if (elements.adminCVSourcedView) {
      elements.adminCVSourcedView.classList.remove("hidden");
      renderAdminCVSourced();
    }
  } else if (pageName === "admin-status-timeline") {
    if (elements.adminStatusTimelineView) {
      elements.adminStatusTimelineView.classList.remove("hidden");
      renderAdminStatusTimeline();
    }
  } else if (pageName === "admin-integrations") {
    if (elements.adminIntegrationsView) {
      elements.adminIntegrationsView.classList.remove("hidden");
      renderAdminIntegrations();
    }
  } else if (pageName === "candidate-dashboard") {
    elements.candidateDashboardView.classList.remove("hidden");
    renderCandidateDashboard();
  } else if (pageName === "candidate-profile") {
    elements.candidateProfileView.classList.remove("hidden");
    loadProfileIntoForm();
  } else if (pageName === "candidate-jobs") {
    elements.candidateJobsView.classList.remove("hidden");
    renderCandidateOpenings();
  } else if (pageName === "candidate-support") {
    elements.candidateSupportView.classList.remove("hidden");
  } else if (pageName === "candidate-interviews" || pageName === "candidate-support-interviews") {
    if (elements.candidateInterviewsView) {
      elements.candidateInterviewsView.classList.remove("hidden");
      renderInterviewsPage();
    }
  } else if (pageName === "candidate-applications") {
    if (elements.candidateApplicationsView) {
      elements.candidateApplicationsView.classList.remove("hidden");
      renderApplicationsPage();
    }
  } else if (pageName === "candidate-documents") {
    if (elements.candidateDocumentsView) {
      elements.candidateDocumentsView.classList.remove("hidden");
      renderDocumentsPage();
    }
  } else if (pageName === "business-dashboard") {
    if (elements.businessDashboardView) {
      elements.businessDashboardView.classList.remove("hidden");
      renderBusinessDashboard();
    }
  } else if (pageName === "business-hiring-models") {
    if (elements.businessHiringModelsView) {
      elements.businessHiringModelsView.classList.remove("hidden");
    }
  } else if (pageName === "business-talent-catalog") {
    if (elements.candidatesView) {
      elements.candidatesView.classList.remove("hidden");
      renderTalentCatalog();
    }
  } else if (pageName === "business-tracker") {
    if (elements.businessTrackerView) {
      elements.businessTrackerView.classList.remove("hidden");
      renderBusinessTracker();
    }
  } else if (pageName === "business-interviews") {
    if (elements.businessInterviewsView) {
      elements.businessInterviewsView.classList.remove("hidden");
      renderBusinessInterviews();
    }
  } else if (pageName === "business-billing") {
    if (elements.businessBillingView) {
      elements.businessBillingView.classList.remove("hidden");
      renderBusinessBilling();
    }
  } else if (pageName === "business-settings") {
    if (elements.businessSettingsView) {
      elements.businessSettingsView.classList.remove("hidden");
      loadCompanyProfile();
    }
  }

  // Update navigation highlighting
  updateNavHighlight(pageName);

  // Scroll to top on view changes
  window.scrollTo(0, 0);
}

// Update Active Highlights on Nav Tabs
function updateNavHighlight(pageName) {
  const links = [
    elements.linkBusinessHome,
    elements.linkBusinessTracker,
    elements.linkCandidateDashboard,
    elements.linkCandidateProfile,
    elements.linkCandidateJobs,
    elements.linkCandidateSupport
  ];
  
  links.forEach(link => {
    if (link) {
      link.classList.remove("active");
      link.style.color = "var(--text-secondary)";
      link.style.borderBottomColor = "transparent";
    }
  });

  // Sync sidebar active links
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.classList.remove("active");
    const page = link.dataset.page;
    if (pageName === "candidate-dashboard" && page === "candidate-dashboard") {
      link.classList.add("active");
    } else if (pageName === "candidate-jobs" && page === "candidate-jobs-browse") {
      link.classList.add("active");
    } else if (pageName === "candidate-applications" && page === "candidate-jobs") {
      link.classList.add("active");
    } else if (pageName === "candidate-documents" && page === "candidate-dashboard-docs") {
      link.classList.add("active");
    } else if (pageName === "candidate-profile" && page === "candidate-profile") {
      link.classList.add("active");
    } else if (pageName === "candidate-support" && page === "candidate-support-messages") {
      link.classList.add("active");
    } else if ((pageName === "candidate-interviews" || pageName === "candidate-support-interviews") && page === "candidate-support-interviews") {
      link.classList.add("active");
    } else if (pageName === page) {
      link.classList.add("active");
    } else if (pageName === "candidates" && page === "business-talent-catalog") {
      link.classList.add("active");
    } else if (pageName === "requirement" && page === "business-hiring-models") {
      link.classList.add("active");
    }
  });

  let activeLink = null;
  if (pageName === "home" && state.currentRole === "Business") {
    activeLink = elements.linkBusinessHome;
  } else if (pageName === "candidate-dashboard") {
    activeLink = elements.linkCandidateDashboard;
  } else if (pageName === "candidate-profile") {
    activeLink = elements.linkCandidateProfile;
  } else if (pageName === "candidate-jobs") {
    activeLink = elements.linkCandidateJobs;
  } else if (pageName === "candidate-support") {
    activeLink = elements.linkCandidateSupport;
  }

  if (activeLink) {
    activeLink.classList.add("active");
    activeLink.style.color = "var(--text-primary)";
    activeLink.style.borderBottomColor = "var(--accent-indigo)";
  }
}

// Master Render functions
function renderAllViews() {
  const role = state.currentRole;
  const user = state.currentUser;

  // Header display config
  if (user) {
    elements.roleBadge.classList.remove("hidden");
    elements.roleSimulatorDropdown.classList.remove("hidden");
    elements.roleSimulatorDropdown.value = role;
    elements.toggleRoleBtn.classList.add("hidden"); // Use simulator dropdown instead of binary button
    elements.logoutBtn.classList.remove("hidden");
    
    // Display names
    if (role === "Admin") {
      elements.roleTextDisplay.textContent = `Admin Profile`;
      elements.navbarRoleIndicator.className = "role-indicator admin";
      elements.navbarRoleIndicator.style.background = "var(--accent-amber)";
    } else if (role === "Candidate") {
      elements.roleTextDisplay.textContent = `Cand: ${user}`;
      elements.navbarRoleIndicator.className = "role-indicator business";
      elements.navbarRoleIndicator.style.background = "var(--accent-cyan)";
    } else {
      elements.roleTextDisplay.textContent = `Client: ${user}`;
      elements.navbarRoleIndicator.className = "role-indicator business";
      elements.navbarRoleIndicator.style.background = "var(--accent-indigo)";
    }
  } else {
    elements.roleBadge.classList.add("hidden");
    elements.roleSimulatorDropdown.classList.add("hidden");
    elements.toggleRoleBtn.classList.add("hidden");
    elements.logoutBtn.classList.add("hidden");
  }

  // Nav Groups visibility
  if (user) {
    if (role === "Business") {
      elements.businessNavLinks.classList.remove("hidden");
      elements.candidateNavLinks.classList.add("hidden");
    } else if (role === "Candidate") {
      elements.candidateNavLinks.classList.remove("hidden");
      elements.businessNavLinks.classList.add("hidden");
    } else {
      elements.businessNavLinks.classList.add("hidden");
      elements.candidateNavLinks.classList.add("hidden");
    }
  } else {
    elements.businessNavLinks.classList.add("hidden");
    elements.candidateNavLinks.classList.add("hidden");
  }

  // View Containers config
  if (!user) {
    elements.unauthContainer.classList.remove("hidden");
    if (elements.businessContainer) elements.businessContainer.classList.add("hidden");
    elements.adminRedirectContainer.classList.add("hidden");
    
    if (elements.mainHeader) elements.mainHeader.classList.remove("hidden");
    if (elements.mainContainer) elements.mainContainer.classList.remove("hidden");
    if (elements.candidateLayoutWrapper) elements.candidateLayoutWrapper.classList.add("hidden");
    if (elements.businessLayoutWrapper) elements.businessLayoutWrapper.classList.add("hidden");
    if (elements.adminLayoutWrapper) elements.adminLayoutWrapper.classList.add("hidden");
  } else {
    elements.unauthContainer.classList.add("hidden");
    
    if (role === "Admin") {
      if (elements.mainHeader) elements.mainHeader.classList.add("hidden");
      if (elements.mainContainer) elements.mainContainer.classList.add("hidden");
      if (elements.candidateLayoutWrapper) elements.candidateLayoutWrapper.classList.add("hidden");
      if (elements.businessLayoutWrapper) elements.businessLayoutWrapper.classList.add("hidden");
      if (elements.adminLayoutWrapper) elements.adminLayoutWrapper.classList.remove("hidden");
      
      if (elements.businessContainer) elements.businessContainer.classList.add("hidden");
      elements.adminRedirectContainer.classList.add("hidden");
      
      // Update Admin Sidebar Initials Avatar
      const initials = "AD";
      if (elements.adminSidebarAvatarCircle) elements.adminSidebarAvatarCircle.textContent = initials;
      
      // Load and render active admin page
      if (state.activePage === "admin" || state.activePage === "admin-dashboard") {
        renderAdminDashboard();
      } else if (state.activePage === "admin-requests-queue") {
        renderAdminRequestsQueue();
      } else if (state.activePage === "admin-talent-pool") {
        renderAdminTalentPool();
      } else if (state.activePage === "admin-global-interviews") {
        renderAdminGlobalInterviews();
      } else if (state.activePage === "admin-cv-sourced") {
        renderAdminCVSourced();
      } else if (state.activePage === "admin-status-timeline") {
        renderAdminStatusTimeline();
      }
    } else if (role === "Candidate") {
      if (elements.mainHeader) elements.mainHeader.classList.add("hidden");
      if (elements.mainContainer) elements.mainContainer.classList.add("hidden");
      if (elements.candidateLayoutWrapper) elements.candidateLayoutWrapper.classList.remove("hidden");
      if (elements.businessLayoutWrapper) elements.businessLayoutWrapper.classList.add("hidden");
      if (elements.adminLayoutWrapper) elements.adminLayoutWrapper.classList.add("hidden");
      
      // Update Sidebar profile dynamically
      const pf = state.candidateProfile;
      const fName = pf.firstName || "Alex";
      const lName = pf.lastName || "Mercer";
      const initials = (fName[0] || "") + (lName[0] || "");
      if (elements.sidebarAvatarCircle) elements.sidebarAvatarCircle.textContent = initials.toUpperCase() || "AM";
      if (elements.sidebarProfileName) elements.sidebarProfileName.textContent = `${fName} ${lName}`;
      
      if (elements.businessContainer) elements.businessContainer.classList.add("hidden");
      elements.adminRedirectContainer.classList.add("hidden");
      renderCandidateDashboard();
    } else {
      if (elements.mainHeader) elements.mainHeader.classList.add("hidden");
      if (elements.mainContainer) elements.mainContainer.classList.add("hidden");
      if (elements.candidateLayoutWrapper) elements.candidateLayoutWrapper.classList.add("hidden");
      if (elements.businessLayoutWrapper) elements.businessLayoutWrapper.classList.remove("hidden");
      if (elements.adminLayoutWrapper) elements.adminLayoutWrapper.classList.add("hidden");
      
      // Update Sidebar profile dynamically from state.companyProfile
      const cp = state.companyProfile || {
        companyName: "Global Tech Corp.",
        industry: "SaaS & Cloud Computing",
        email: "hiring@techcorp.com",
        location: "San Francisco, CA"
      };
      const cName = cp.companyName || "Global Tech Corp.";
      const words = cName.split(/\s+/);
      let initials = "";
      if (words.length > 0 && words[0]) initials += words[0][0];
      if (words.length > 1 && words[1]) initials += words[1][0];
      if (!initials) initials = "TC";
      if (elements.businessSidebarAvatarCircle) elements.businessSidebarAvatarCircle.textContent = initials.toUpperCase();
      if (elements.businessSidebarProfileName) elements.businessSidebarProfileName.textContent = cName;
      
      // Also update dashboard greetings header
      const title = document.getElementById("business-welcome-title");
      if (title) title.textContent = `Welcome back, ${cName}!`;
      
      if (elements.businessContainer) elements.businessContainer.classList.add("hidden");
      elements.adminRedirectContainer.classList.add("hidden");
      renderBusinessDashboard();
    }
  }
}

// Render client-side dashboard tracker
function renderBusinessDashboard() {
  // We must still support the legacy tracker if elements exist
  if (elements.userRequestsListBody) {
    elements.userRequestsListBody.innerHTML = "";
    const userRequestsLegacy = state.requests.filter(r => r.client === state.currentUser);
    if (elements.myRequestsCount) {
      elements.myRequestsCount.textContent = `${userRequestsLegacy.length} Total`;
    }
    if (userRequestsLegacy.length > 0) {
      userRequestsLegacy.forEach(req => {
        const row = document.createElement("tr");
        const statusClass = req.status === "In Process" ? "processing" : "fulfilled";
        const badgeClass = req.status === "In Process" ? "badge-amber" : "badge-emerald";
        row.innerHTML = `
          <td style="font-weight:600; color:var(--accent-indigo);">${req.id}</td>
          <td><span class="badge ${req.model === 'Permanent' ? 'badge-indigo' : (req.model === 'Resource Augment' ? 'badge-cyan' : 'badge-amber')}">${req.model}</span></td>
          <td>Candidate #${req.candidateId.replace('TB-', 'AIS-')}</td>
          <td>${req.candidateRole}</td>
          <td>${req.submittedDate}</td>
          <td>
            <div class="status-indicator-box">
              <span class="status-dot ${statusClass}"></span>
              <span class="badge ${badgeClass}" style="border:none; padding:0; background:transparent;">${req.status}</span>
            </div>
          </td>
        `;
        elements.userRequestsListBody.appendChild(row);
      });
    } else {
      elements.userRequestsListBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px;">No hiring requests placed yet. Select a model above to begin.</td>
        </tr>
      `;
    }
  }

  const userRequests = state.requests.filter(r => r.client === state.currentUser);
  const inProcessCount = userRequests.filter(r => r.status === "In Process").length;
  const fulfilledCount = userRequests.filter(r => r.status === "Fulfilled").length;
  const monthlySpend = calculateMonthlySpending();

  // Load and render stats cards
  const elTotalRequested = document.getElementById("biz-stats-total-requested");
  if (elTotalRequested) elTotalRequested.textContent = userRequests.length;

  const elTotalSubtext = document.getElementById("biz-stats-total-subtext");
  if (elTotalSubtext) elTotalSubtext.textContent = `${inProcessCount} pending reviews`;

  const elActiveHires = document.getElementById("biz-stats-active-hires");
  if (elActiveHires) elActiveHires.textContent = fulfilledCount;

  const elActiveSubtext = document.getElementById("biz-stats-active-subtext");
  if (elActiveSubtext) elActiveSubtext.textContent = "Onboarded talent";

  const elInterviews = document.getElementById("biz-stats-interviews");
  if (elInterviews) elInterviews.textContent = state.companyInterviews.length;

  const elInterviewsSubtext = document.getElementById("biz-stats-interviews-subtext");
  if (elInterviewsSubtext) elInterviewsSubtext.textContent = state.companyInterviews.length > 0 ? "Upcoming scheduled" : "No scheduled calls";

  const elMonthlySpend = document.getElementById("biz-stats-monthly-spend");
  if (elMonthlySpend) elMonthlySpend.textContent = `$${monthlySpend.toLocaleString()}`;

  const elSpendSubtext = document.getElementById("biz-stats-spend-subtext");
  if (elSpendSubtext) elSpendSubtext.textContent = "Active contract budgets";

  // Update donut chart
  updateBusinessDonutChart(inProcessCount, fulfilledCount);

  // Render upcoming interviews
  const interviewsContainer = document.getElementById("biz-dashboard-interviews-list-container");
  if (interviewsContainer) {
    interviewsContainer.innerHTML = "";
    if (state.companyInterviews.length === 0) {
      interviewsContainer.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted); font-size:0.85rem;">No upcoming interviews.</div>`;
    } else {
      state.companyInterviews.slice(0, 3).forEach(int => {
        const item = document.createElement("div");
        item.className = "interview-item-card";
        const initial = int.candidateId.replace('TB-', '').substring(0, 2);
        item.innerHTML = `
          <div class="interview-company-logo logo-acme">${initial}</div>
          <div class="interview-details">
            <h5 class="interview-company-name">Candidate #${int.candidateId.replace('TB-', 'AIS-')}</h5>
            <p class="interview-role-name">${int.role}</p>
            <div class="interview-time-row">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>${int.dateTime}</span>
            </div>
          </div>
          <span class="interview-badge badge-blue">${int.type}</span>
        `;
        interviewsContainer.appendChild(item);
      });
    }
  }

  // Render placements table
  const placementsBody = document.getElementById("biz-dashboard-placements-body");
  if (placementsBody) {
    placementsBody.innerHTML = "";
    const activePlacements = userRequests.filter(r => r.status === "Fulfilled");
    if (activePlacements.length === 0) {
      placementsBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">No active placements yet. Choose a model to hire.</td>
        </tr>
      `;
    } else {
      activePlacements.slice(0, 3).forEach(req => {
        let pricingLabel = "";
        if (req.model === "Permanent") {
          pricingLabel = `$${(req.candidateRate / 12 / 1000).toFixed(1)}k/mo`;
        } else if (req.model === "Resource Augment") {
          pricingLabel = `$${(req.candidateRate / 1000).toFixed(1)}k/mo`;
        } else {
          pricingLabel = `$${req.candidateRate}/hr`;
        }
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>Candidate #${req.candidateId.replace('TB-', 'AIS-')}</strong></td>
          <td>${req.candidateRole}</td>
          <td><span class="badge badge-indigo">${req.model}</span></td>
          <td>${pricingLabel}</td>
          <td><span class="badge badge-emerald">Active</span></td>
        `;
        placementsBody.appendChild(row);
      });
    }
  }

  // Render recommended candidates catalog list
  const recContainer = document.getElementById("biz-dashboard-recommended-list");
  if (recContainer) {
    recContainer.innerHTML = "";
    const topCandidates = candidatesData.slice(0, 2);
    topCandidates.forEach(cand => {
      const card = document.createElement("div");
      card.className = "recommend-job-card";
      card.style.padding = "12px";
      card.style.display = "flex";
      card.style.justifyContent = "space-between";
      card.style.alignItems = "center";
      
      card.innerHTML = `
        <div style="display: flex; gap: 12px; align-items: center;">
          <div class="recommend-job-logo logo-shopify" style="background: var(--accent-indigo);">C</div>
          <div>
            <h5 class="recommend-job-title">${cand.role}</h5>
            <p class="recommend-job-meta">Candidate #${cand.id.replace('TB-', 'AIS-')} &bull; ${cand.experience} Yrs Exp &bull; Match: ${cand.matchRating}%</p>
          </div>
        </div>
        <button class="btn-nav-action primary" onclick="placeHiringRequest('${cand.id}')" style="padding: 4px 10px; font-size: 0.75rem;">Request Hire</button>
      `;
      recContainer.appendChild(card);
    });
  }
}

function calculateMonthlySpending() {
  const userRequests = state.requests.filter(r => r.client === state.currentUser && r.status === "Fulfilled");
  let total = 0;
  userRequests.forEach(req => {
    if (req.model === "Permanent") {
      total += Math.round(req.candidateRate / 12);
    } else if (req.model === "Resource Augment") {
      total += Math.round(req.candidateRate);
    } else if (req.model === "Hire by Hour") {
      total += Math.round(req.candidateRate * 160);
    }
  });
  return total;
}

function updateBusinessDonutChart(inProcess, fulfilled) {
  const total = inProcess + fulfilled;
  const totalIndicator = document.getElementById("biz-donut-center-total");
  if (totalIndicator) totalIndicator.textContent = total;
  
  const processCount = document.getElementById("biz-legend-count-process");
  if (processCount) processCount.textContent = inProcess;
  const fulfilledCount = document.getElementById("biz-legend-count-fulfilled");
  if (fulfilledCount) fulfilledCount.textContent = fulfilled;

  const segProcess = document.getElementById("biz-donut-segment-process");
  const segFulfilled = document.getElementById("biz-donut-segment-fulfilled");
  
  if (total === 0) {
    if (segProcess) segProcess.setAttribute("stroke-dasharray", "0 100");
    if (segFulfilled) segFulfilled.setAttribute("stroke-dasharray", "0 100");
    return;
  }

  const pProcess = (inProcess / total) * 100;
  const pFulfilled = (fulfilled / total) * 100;

  if (segProcess) {
    segProcess.setAttribute("stroke-dasharray", `${pProcess} ${100 - pProcess}`);
    segProcess.setAttribute("stroke-dashoffset", "25");
  }

  if (segFulfilled) {
    let offset = (25 - pProcess + 100) % 100;
    segFulfilled.setAttribute("stroke-dasharray", `${pFulfilled} ${100 - pFulfilled}`);
    segFulfilled.setAttribute("stroke-dashoffset", offset.toFixed(1));
  }
}

function renderBusinessTracker() {
  const userRequests = state.requests.filter(r => r.client === state.currentUser);
  const indicator = document.getElementById("biz-tracker-count-indicator");
  if (indicator) indicator.textContent = `${userRequests.length} Request${userRequests.length !== 1 ? 's' : ''}`;
  
  const body = document.getElementById("biz-tracker-page-list-body");
  if (!body) return;
  body.innerHTML = "";
  if (userRequests.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px;">No sourcing requests placed yet. Select a model to begin.</td>
      </tr>
    `;
    return;
  }
  userRequests.forEach(req => {
    const statusClass = req.status === "In Process" ? "processing" : "fulfilled";
    const badgeClass = req.status === "In Process" ? "badge-amber" : "badge-emerald";
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="font-weight:600; color:var(--accent-indigo);">${req.id}</td>
      <td><span class="badge ${req.model === 'Permanent' ? 'badge-indigo' : (req.model === 'Resource Augment' ? 'badge-cyan' : 'badge-amber')}">${req.model}</span></td>
      <td>Candidate #${req.candidateId.replace('TB-', 'AIS-')}</td>
      <td>${req.candidateRole}</td>
      <td>${req.submittedDate}</td>
      <td>
        <div class="status-indicator-box">
          <span class="status-dot ${statusClass}"></span>
          <span class="badge ${badgeClass}" style="border:none; padding:0; background:transparent;">${req.status}</span>
        </div>
      </td>
    `;
    body.appendChild(row);
  });
}

function renderBusinessInterviews() {
  const interviews = state.companyInterviews || [];
  const indicator = document.getElementById("biz-interviews-count-indicator");
  if (indicator) indicator.textContent = `${interviews.length} Scheduled`;
  
  const body = document.getElementById("biz-interviews-list-body");
  if (!body) return;
  body.innerHTML = "";
  if (interviews.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">No scheduled interviews.</td>
      </tr>
    `;
    return;
  }
  
  interviews.forEach(int => {
    const statusClass = int.status === "Scheduled" ? "processing" : "fulfilled";
    const badgeClass = int.status === "Scheduled" ? "badge-indigo" : "badge-emerald";
    
    const row = document.createElement("tr");
    
    let actionBtn = "";
    if (int.status === "Scheduled") {
      actionBtn = `
        <div style="display:flex; gap:6px;">
          <button class="admin-action-btn" onclick="alert('Starting video call simulator for candidate #${int.candidateId.replace('TB-', 'AIS-')}')">Start Call</button>
          <button class="admin-action-btn secondary" onclick="cancelCompanyInterview('${int.id}')">Cancel</button>
        </div>
      `;
    } else {
      actionBtn = `<span style="color:var(--text-muted); font-size:0.8rem;">Completed</span>`;
    }
    
    row.innerHTML = `
      <td><strong>Candidate #${int.candidateId.replace('TB-', 'AIS-')}</strong></td>
      <td>${int.role}</td>
      <td><strong>${int.dateTime}</strong></td>
      <td><span class="interview-badge badge-blue" style="padding: 4px 8px; border-radius: 4px;">${int.type}</span></td>
      <td>${int.interviewer || 'N/A'}</td>
      <td>
        <div class="status-indicator-box">
          <span class="status-dot ${statusClass}"></span>
          <span class="badge ${badgeClass}" style="border:none; padding:0; background:transparent;">${int.status}</span>
        </div>
      </td>
      <td>${actionBtn}</td>
    `;
    body.appendChild(row);
  });
}

window.cancelCompanyInterview = function(id) {
  if (confirm("Are you sure you want to cancel this interview?")) {
    state.companyInterviews = state.companyInterviews.filter(i => i.id !== id);
    localStorage.setItem("ai_sourcing_company_interviews", JSON.stringify(state.companyInterviews));
    renderBusinessInterviews();
    renderBusinessDashboard();
  }
};

function renderBusinessBilling() {
  const userRequests = state.requests.filter(r => r.client === state.currentUser);
  
  let totalBilledVal = 0;
  let outstandingVal = 0;
  let pendingCount = 0;
  
  const body = document.getElementById("biz-invoices-list-body");
  if (!body) return;
  body.innerHTML = "";
  
  if (userRequests.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">No invoices generated. Place a sourcing request to start billing.</td>
      </tr>
    `;
    const totalEl = document.getElementById("biz-billing-total-billed");
    if (totalEl) totalEl.textContent = "$0";
    const outstandingEl = document.getElementById("biz-billing-outstanding");
    if (outstandingEl) outstandingEl.textContent = "$0";
    const outstandingIndicator = document.getElementById("biz-billing-outstanding-indicator");
    if (outstandingIndicator) outstandingIndicator.textContent = "0 Pending";
    return;
  }
  
  userRequests.forEach(req => {
    let amount = 0;
    let amountStr = "";
    
    if (req.model === "Permanent") {
      amount = req.candidateRate;
      amountStr = `$${(amount / 1000).toFixed(0)}k/yr`;
    } else if (req.model === "Resource Augment") {
      amount = req.candidateRate;
      amountStr = `$${(amount / 1000).toFixed(1)}k/mo`;
    } else {
      amount = req.candidateRate * 160;
      amountStr = `$${req.candidateRate}/hr ($${(amount / 1000).toFixed(1)}k/mo)`;
    }
    
    totalBilledVal += amount;
    
    const isPaid = req.status === "Fulfilled";
    if (!isPaid) {
      outstandingVal += amount;
      pendingCount++;
    }
    
    const invoiceId = `INV-${req.id.replace('REQ-', '')}`;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${invoiceId}</strong></td>
      <td>Candidate #${req.candidateId.replace('TB-', 'AIS-')}</td>
      <td>${req.candidateRole}</td>
      <td><span class="badge ${req.model === 'Permanent' ? 'badge-indigo' : (req.model === 'Resource Augment' ? 'badge-cyan' : 'badge-amber')}">${req.model}</span></td>
      <td>${amountStr}</td>
      <td>${req.submittedDate}</td>
      <td>
        <div class="status-indicator-box">
          <span class="status-dot ${isPaid ? 'fulfilled' : 'processing'}"></span>
          <span class="badge ${isPaid ? 'badge-emerald' : 'badge-amber'}" style="border:none; padding:0; background:transparent;">${isPaid ? 'Paid' : 'Pending'}</span>
        </div>
      </td>
    `;
    body.appendChild(row);
  });
  
  const totalBilledEl = document.getElementById("biz-billing-total-billed");
  if (totalBilledEl) totalBilledEl.textContent = `$${totalBilledVal.toLocaleString()}`;
  const outstandingEl = document.getElementById("biz-billing-outstanding");
  if (outstandingEl) outstandingEl.textContent = `$${outstandingVal.toLocaleString()}`;
  
  const outstandingIndicator = document.getElementById("biz-billing-outstanding-indicator");
  if (outstandingIndicator) {
    outstandingIndicator.textContent = `${pendingCount} Pending`;
  }
}

function loadCompanyProfile() {
  const stored = localStorage.getItem("ai_sourcing_company_profile");
  if (stored) {
    try {
      state.companyProfile = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse company profile", e);
    }
  }
  
  if (elements.bizSettingsCompanyName) {
    elements.bizSettingsCompanyName.value = state.companyProfile.companyName || "";
    elements.bizSettingsCompanyIndustry.value = state.companyProfile.industry || "";
    elements.bizSettingsCompanyEmail.value = state.companyProfile.email || "";
    elements.bizSettingsCompanyLocation.value = state.companyProfile.location || "";
  }

  // Also load company interviews
  const storedInterviews = localStorage.getItem("ai_sourcing_company_interviews");
  if (storedInterviews) {
    try {
      state.companyInterviews = JSON.parse(storedInterviews);
    } catch (e) {
      console.error("Failed to parse company interviews", e);
      state.companyInterviews = [];
    }
  } else {
    state.companyInterviews = [
      {
        id: "INT-B001",
        candidateId: "TB-999",
        role: "Frontend Engineer",
        dateTime: "Jun 10, 2026 • 10:00 AM",
        type: "Video Call",
        interviewer: "Sarah Jenkins (Lead Designer)",
        status: "Scheduled"
      },
      {
        id: "INT-B002",
        candidateId: "TB-002",
        role: "Node.js Engineer",
        dateTime: "Jun 15, 2026 • 11:30 AM",
        type: "Technical Interview",
        interviewer: "Marc Andreessen (VP Engineering)",
        status: "Scheduled"
      }
    ];
    localStorage.setItem("ai_sourcing_company_interviews", JSON.stringify(state.companyInterviews));
  }
}

function saveCompanyProfile() {
  localStorage.setItem("ai_sourcing_company_profile", JSON.stringify(state.companyProfile));
  window.dispatchEvent(new Event("storage_updated"));
}

function renderTalentCatalog() {
  if (!state.currentHiringModel) {
    state.currentHiringModel = "Permanent";
  }
  displayCandidateGrid();
}

function syncThemeUI() {
  const isLight = document.body.classList.contains("light-mode");
  
  if (elements.themeToggleBtn) {
    const moon = elements.themeToggleBtn.querySelector(".moon-icon");
    const sun = elements.themeToggleBtn.querySelector(".sun-icon");
    if (isLight) {
      if (moon) moon.style.display = "none";
      if (sun) sun.style.display = "block";
    } else {
      if (moon) moon.style.display = "block";
      if (sun) sun.style.display = "none";
    }
  }

  if (elements.sidebarThemeToggle) {
    const moon = elements.sidebarThemeToggle.querySelector(".moon-icon");
    const sun = elements.sidebarThemeToggle.querySelector(".sun-icon");
    const text = elements.sidebarThemeToggle.querySelector(".theme-text");
    if (isLight) {
      if (moon) moon.classList.add("hidden");
      if (sun) sun.classList.remove("hidden");
      if (text) text.textContent = "Light Mode";
    } else {
      if (moon) moon.classList.remove("hidden");
      if (sun) sun.classList.add("hidden");
      if (text) text.textContent = "Dark Mode";
    }
  }

  if (elements.businessSidebarThemeToggle) {
    const moon = elements.businessSidebarThemeToggle.querySelector(".moon-icon");
    const sun = elements.businessSidebarThemeToggle.querySelector(".sun-icon");
    const text = elements.businessSidebarThemeToggle.querySelector(".theme-text");
    if (isLight) {
      if (moon) moon.classList.add("hidden");
      if (sun) sun.classList.remove("hidden");
      if (text) text.textContent = "Light Mode";
    } else {
      if (moon) moon.classList.remove("hidden");
      if (sun) sun.classList.add("hidden");
      if (text) text.textContent = "Dark Mode";
    }
  }

  if (elements.adminSidebarThemeToggle) {
    const moon = elements.adminSidebarThemeToggle.querySelector(".moon-icon");
    const sun = elements.adminSidebarThemeToggle.querySelector(".sun-icon");
    const text = elements.adminSidebarThemeToggle.querySelector(".theme-text");
    if (isLight) {
      if (moon) moon.classList.add("hidden");
      if (sun) sun.classList.remove("hidden");
      if (text) text.textContent = "Light Mode";
    } else {
      if (moon) moon.classList.remove("hidden");
      if (sun) sun.classList.add("hidden");
      if (text) text.textContent = "Dark Mode";
    }
  }
}

// Render admin panel request queue
// Admin Activity Logging
function addAdminLog(text, type = "info") {
  if (!state.adminLogs) state.adminLogs = [];
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  state.adminLogs.unshift({ text, type, time });
  if (state.adminLogs.length > 20) state.adminLogs.pop();
  localStorage.setItem("ai_sourcing_admin_logs", JSON.stringify(state.adminLogs));
}

function loadAdminLogs() {
  const stored = localStorage.getItem("ai_sourcing_admin_logs");
  if (stored) {
    try {
      state.adminLogs = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse admin logs", e);
      state.adminLogs = [];
    }
  } else {
    state.adminLogs = [
      { text: "System Administrator logged in", type: "system", time: "11:39:35 AM" },
      { text: "Global talent pool database loaded: 15 profiles active", type: "system", time: "11:30:12 AM" }
    ];
    localStorage.setItem("ai_sourcing_admin_logs", JSON.stringify(state.adminLogs));
  }
}

// Compute Estimated Revenue (10% of monthly spending for active placements)
function calculatePlatformRevenue() {
  let revenue = 0;
  const taxRate = parseFloat(document.getElementById("admin-sim-taxrate")?.value || "10") / 100;
  
  state.requests.forEach(req => {
    if (req.status === "Fulfilled") {
      let monthlySpend = 0;
      const rate = parseFloat(req.candidateRate || "0");
      
      if (req.model === "Permanent") {
        monthlySpend = rate / 12;
      } else if (req.model === "Resource Augment") {
        monthlySpend = rate;
      } else { // Hire by Hour
        monthlySpend = rate * 160;
      }
      revenue += monthlySpend * taxRate;
    }
  });
  return Math.round(revenue);
}

// Render AD1: Admin Dashboard View
function renderAdminDashboard() {
  // Update KPI counters
  const totalSubmissions = state.requests.length;
  const pendingReviews = state.requests.filter(r => r.status === "In Process").length;
  const platformRevenue = calculatePlatformRevenue();
  const vettedTalentCount = candidatesData.length;

  // Calculate Funnel Pipeline Stats
  const cvSourcedCount = candidatesData.length;
  let cvSubmittedCount = 0;
  let l1ScheduledCount = 0;
  let l1SelectCount = 0;
  let l2ScheduledCount = 0;
  let l2SelectCount = 0;
  let l3ScheduledCount = 0;
  let l3SelectCount = 0;
  let offeredCount = 0;
  let joinedCount = 0;

  candidatesData.forEach(cand => {
    const status = state.candidateStatuses[cand.id] || "Sourced";
    
    // Sourced is always true for any candidate in candidatesData
    if (status === "Rejected") {
      // If rejected, does not advance in the active funnel
      return;
    }
    
    if (status === "Submitted") {
      cvSubmittedCount++;
    } else if (status === "L1 Scheduled") {
      cvSubmittedCount++; l1ScheduledCount++;
    } else if (status === "L1 Select") {
      cvSubmittedCount++; l1ScheduledCount++; l1SelectCount++;
    } else if (status === "L2 Scheduled") {
      cvSubmittedCount++; l1ScheduledCount++; l1SelectCount++; l2ScheduledCount++;
    } else if (status === "L2 Select") {
      cvSubmittedCount++; l1ScheduledCount++; l1SelectCount++; l2ScheduledCount++; l2SelectCount++;
    } else if (status === "L3 Scheduled") {
      cvSubmittedCount++; l1ScheduledCount++; l1SelectCount++; l2ScheduledCount++; l2SelectCount++; l3ScheduledCount++;
    } else if (status === "L3 Select") {
      cvSubmittedCount++; l1ScheduledCount++; l1SelectCount++; l2ScheduledCount++; l2SelectCount++; l3ScheduledCount++; l3SelectCount++;
    } else if (status === "Offered") {
      cvSubmittedCount++; l1ScheduledCount++; l1SelectCount++; l2ScheduledCount++; l2SelectCount++; l3ScheduledCount++; l3SelectCount++; offeredCount++;
    } else if (status === "Joined") {
      cvSubmittedCount++; l1ScheduledCount++; l1SelectCount++; l2ScheduledCount++; l2SelectCount++; l3ScheduledCount++; l3SelectCount++; offeredCount++; joinedCount++;
    }
  });

  if (elements.adminFunnelCVSourced) elements.adminFunnelCVSourced.textContent = cvSourcedCount;
  if (elements.adminFunnelCVSubmitted) elements.adminFunnelCVSubmitted.textContent = cvSubmittedCount;
  if (elements.adminFunnelL1Scheduled) elements.adminFunnelL1Scheduled.textContent = l1ScheduledCount;
  if (elements.adminFunnelL1Select) elements.adminFunnelL1Select.textContent = l1SelectCount;
  if (elements.adminFunnelL2Scheduled) elements.adminFunnelL2Scheduled.textContent = l2ScheduledCount;
  if (elements.adminFunnelL2Select) elements.adminFunnelL2Select.textContent = l2SelectCount;
  if (elements.adminFunnelL3Scheduled) elements.adminFunnelL3Scheduled.textContent = l3ScheduledCount;
  if (elements.adminFunnelL3Select) elements.adminFunnelL3Select.textContent = l3SelectCount;
  if (elements.adminFunnelOffered) elements.adminFunnelOffered.textContent = offeredCount;
  if (elements.adminFunnelJoined) elements.adminFunnelJoined.textContent = joinedCount;

  // Render SVG Donut Chart
  const processCount = state.requests.filter(r => r.status === "In Process").length;
  const fulfilledCount = state.requests.filter(r => r.status === "Fulfilled").length;

  if (elements.adminDonutCenterTotal) elements.adminDonutCenterTotal.textContent = totalSubmissions;
  if (elements.adminLegendCountProcess) elements.adminLegendCountProcess.textContent = processCount;
  if (elements.adminLegendCountFulfilled) elements.adminLegendCountFulfilled.textContent = fulfilledCount;

  if (totalSubmissions === 0) {
    if (elements.adminDonutSegmentProcess) elements.adminDonutSegmentProcess.setAttribute("stroke-dasharray", "0 100");
    if (elements.adminDonutSegmentFulfilled) elements.adminDonutSegmentFulfilled.setAttribute("stroke-dasharray", "0 100");
  } else {
    const pctProcess = (processCount / totalSubmissions) * 100;
    const pctFulfilled = (fulfilledCount / totalSubmissions) * 100;

    if (elements.adminDonutSegmentProcess) {
      elements.adminDonutSegmentProcess.setAttribute("stroke-dasharray", `${pctProcess} ${100 - pctProcess}`);
      elements.adminDonutSegmentProcess.setAttribute("stroke-dashoffset", "25");
    }
    if (elements.adminDonutSegmentFulfilled) {
      elements.adminDonutSegmentFulfilled.setAttribute("stroke-dasharray", `${pctFulfilled} ${100 - pctFulfilled}`);
      elements.adminDonutSegmentFulfilled.setAttribute("stroke-dashoffset", `${25 - pctProcess}`);
    }
  }

  // Render system activity logs
  if (elements.adminDashboardLogsContainer) {
    elements.adminDashboardLogsContainer.innerHTML = "";
    const logs = state.adminLogs || [];
    
    if (logs.length === 0) {
      elements.adminDashboardLogsContainer.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted); font-size: 0.85rem;">No platform logs recorded.</div>`;
    } else {
      logs.slice(0, 10).forEach(log => {
        const item = document.createElement("div");
        item.className = "admin-log-entry";
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.gap = "8px";
        item.style.padding = "6px 10px";
        item.style.borderRadius = "4px";
        item.style.background = "rgba(255, 255, 255, 0.02)";
        item.style.border = "1px solid var(--border-glass)";
        item.style.marginBottom = "4px";

        let badgeColor = "badge-indigo";
        if (log.type === "success") badgeColor = "badge-emerald";
        else if (log.type === "warning") badgeColor = "badge-amber";
        else if (log.type === "danger") badgeColor = "badge-rose";
        else if (log.type === "system") badgeColor = "badge-cyan";

        item.innerHTML = `
          <span class="log-time" style="font-family: monospace; font-size: 0.7rem; color: var(--text-muted); flex-shrink: 0;">${log.time}</span>
          <span class="badge ${badgeColor} log-badge" style="font-size: 0.55rem; padding: 2px 4px; text-transform: uppercase; border: none; flex-shrink: 0;">${log.type}</span>
          <span class="log-text" style="color: var(--text-primary); font-size: 0.75rem; flex: 1;">${log.text}</span>
        `;
        elements.adminDashboardLogsContainer.appendChild(item);
      });
    }
  }

  // Render mini pending approvals queue
  if (elements.adminDashboardPendingBody) {
    elements.adminDashboardPendingBody.innerHTML = "";
    const pendingList = state.requests.filter(r => r.status === "In Process");

    if (pendingList.length === 0) {
      elements.adminDashboardPendingBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No pending placements.</td>
        </tr>
      `;
    } else {
      pendingList.slice(0, 5).forEach(req => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td style="font-weight:600; color:var(--accent-indigo);">
            <a href="#" class="request-id-link" data-id="${req.id}" style="color:var(--accent-indigo); text-decoration:none; border-bottom:1px dashed var(--accent-indigo); font-weight:600; cursor:pointer;">${req.id}</a>
          </td>
          <td><strong>${req.client}</strong></td>
          <td>${req.candidateRole}</td>
          <td>Candidate #${req.candidateId.replace('TB-', 'AIS-')}</td>
          <td>
            <button class="btn-nav-action primary" onclick="sourceCVsForRequest('${req.id}')" style="padding: 4px 8px; font-size: 0.75rem;">Source CVs</button>
          </td>
        `;
        elements.adminDashboardPendingBody.appendChild(row);
      });

      // Bind click handlers to request ID links in dashboard
      elements.adminDashboardPendingBody.querySelectorAll(".request-id-link").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const id = link.dataset.id;
          showRequestDetailsModal(id);
        });
      });
    }
  }
}

// Render AD2: Placement Requests Queue Page
function renderAdminRequestsQueue() {
  const container = elements.adminQueuePageListBody;
  if (!container) return;

  container.innerHTML = "";

  const pendingRequests = state.requests.filter(r => r.status === "In Process");
  if (elements.adminQueueCountIndicator) {
    elements.adminQueueCountIndicator.textContent = `${pendingRequests.length} Pending Requests`;
  }

  if (state.requests.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 40px;">No requests currently in the pipeline.</td>
      </tr>
    `;
    return;
  }

  state.requests.forEach(req => {
    const row = document.createElement("tr");

    let badgeClass = "badge-indigo";
    let statusClass = "processing";
    if (req.status === "Fulfilled") {
      badgeClass = "badge-emerald";
      statusClass = "fulfilled";
    } else if (req.status === "Rejected") {
      badgeClass = "badge-rose";
      statusClass = "rejected";
    } else {
      badgeClass = "badge-amber";
      statusClass = "processing";
    }

    let priceLabel = "";
    if (req.model === "Permanent") {
      priceLabel = `$${(req.candidateRate / 1000).toFixed(0)}k/yr`;
    } else if (req.model === "Resource Augment") {
      priceLabel = `$${(req.candidateRate / 1000).toFixed(1)}k/mo`;
    } else {
      priceLabel = `$${req.candidateRate}/hr`;
    }

    let actionBtn = "";
    if (req.status === "In Process") {
      actionBtn = `
        <div style="display:flex; gap:8px;">
          <button class="btn-nav-action primary" onclick="sourceCVsForRequest('${req.id}')" style="padding: 6px 12px; font-size: 0.75rem;">Source CVs</button>
          <button class="btn-nav-action secondary" onclick="rejectAdminRequest('${req.id}')" style="padding: 6px 12px; font-size: 0.75rem; background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #f87171;">Reject</button>
        </div>
      `;
    } else {
      actionBtn = `<span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">${req.status}</span>`;
    }

    row.innerHTML = `
      <td style="font-weight:600; color:var(--accent-indigo);">
        <a href="#" class="request-id-link" data-id="${req.id}" style="color:var(--accent-indigo); text-decoration:none; border-bottom:1px dashed var(--accent-indigo); font-weight:600; cursor:pointer;">${req.id}</a>
      </td>
      <td><strong>${req.client}</strong></td>
      <td><span class="badge ${req.model === 'Permanent' ? 'badge-indigo' : (req.model === 'Resource Augment' ? 'badge-cyan' : 'badge-amber')}">${req.model}</span></td>
      <td><strong>${req.candidateRole}</strong><br><span style="font-size:0.75rem; color:var(--text-muted)">Target: ${priceLabel}</span></td>
      <td style="font-weight:600;">Candidate #${req.candidateId.replace('TB-', 'AIS-')}</td>
      <td>${req.submittedDate}</td>
      <td>
        <div class="status-indicator-box">
          <span class="status-dot ${statusClass}"></span>
          <span class="badge ${badgeClass}" style="border:none; padding:0; background:transparent;">${req.status}</span>
        </div>
      </td>
      <td>${actionBtn}</td>
    `;
    container.appendChild(row);
  });

  // Bind click handlers to request ID links
  container.querySelectorAll(".request-id-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.id;
      showRequestDetailsModal(id);
    });
  });
}

// Render AD3: Global Talent Directory
function renderAdminTalentPool() {
  const container = elements.adminTalentPageListBody;
  if (!container) return;

  container.innerHTML = "";

  if (elements.adminTalentCountIndicator) {
    elements.adminTalentCountIndicator.textContent = `${candidatesData.length} Candidates`;
  }

  candidatesData.forEach(cand => {
    const row = document.createElement("tr");

    let rateLabel = "";
    if (cand.annualSalary) {
      rateLabel += `$${(cand.annualSalary/1000).toFixed(0)}k/yr (Perm)`;
    }
    if (cand.hourlyRate) {
      if (rateLabel) rateLabel += " / ";
      rateLabel += `$${cand.hourlyRate}/hr (Hour)`;
    }
    if (!rateLabel) rateLabel = "N/A";

    const assignment = state.assignments[cand.id];
    let assignHtml = "";
    if (assignment) {
      assignHtml = `
        <div style="font-size:0.85rem; line-height:1.4;">
          <strong style="color: var(--text-primary);">${assignment.recruiter}</strong><br>
          <span style="font-size:0.75rem; color:var(--text-muted)">${assignment.company}</span><br>
          <a href="#" style="font-size:0.75rem; color:var(--accent-indigo); font-weight:600;" onclick="event.preventDefault(); openAssignRecruiterModal('${cand.id}')">Reassign</a>
        </div>
      `;
    } else {
      assignHtml = `
        <button class="btn-nav-action primary" style="padding: 6px 12px; font-size: 0.8rem; cursor: pointer; border-radius: var(--radius-sm);" onclick="event.preventDefault(); openAssignRecruiterModal('${cand.id}')">Assign</button>
      `;
    }

    row.innerHTML = `
      <td style="font-weight: 600; color: var(--accent-indigo);">${cand.id}</td>
      <td><strong>${cand.role}</strong><br><span style="font-size:0.75rem; color:var(--text-muted)">${cand.skills.slice(0, 4).join(", ")}</span></td>
      <td>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="badge badge-emerald" style="font-weight: 700;">${cand.matchRating || 95}%</span>
        </div>
      </td>
      <td>${rateLabel}</td>
      <td><span class="badge ${cand.availability === 'Immediate' ? 'badge-emerald' : 'badge-amber'}">${cand.availability || 'Immediate'}</span></td>
      <td><strong>${cand.experience} yrs</strong><br><span style="font-size:0.75rem; color:var(--text-muted)">${cand.education || 'B.S. Computer Science'}</span></td>
      <td>${assignHtml}</td>
    `;
    container.appendChild(row);
  });
}

// Render AD4: Global Interviews Board
function renderAdminGlobalInterviews() {
  const container = elements.adminGlobalInterviewsListBody;
  if (!container) return;

  container.innerHTML = "";

  const interviews = state.companyInterviews || [];
  if (elements.adminInterviewsCountIndicator) {
    elements.adminInterviewsCountIndicator.textContent = `${interviews.length} Scheduled`;
  }

  if (interviews.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">No scheduled interviews on the platform.</td>
      </tr>
    `;
    return;
  }

  interviews.forEach(int => {
    const row = document.createElement("tr");
    const statusClass = int.status === "Completed" ? "badge-emerald" : "badge-indigo";

    row.innerHTML = `
      <td><strong>${state.companyProfile.companyName || "Global Tech Corp."}</strong><br><span style="font-size:0.75rem; color:var(--text-muted)">Client ID: BIZ-001</span></td>
      <td style="font-weight:600; color:var(--accent-indigo);">Candidate #${int.candidateId.replace('TB-', 'AIS-')}</td>
      <td><strong>${int.role}</strong></td>
      <td>${int.dateTime}</td>
      <td><span class="badge badge-cyan">${int.type}</span></td>
      <td>${int.interviewer}</td>
      <td><span class="badge ${statusClass}">${int.status}</span></td>
    `;
    container.appendChild(row);
  });
}

// Simulation Controls
function simulateMockHiringRequest() {
  const clients = ["Microsoft", "Stripe", "Uber", "Netflix", "Airbnb", "Tesla"];
  const models = ["Permanent", "Resource Augment", "Hire by Hour"];
  const randomClient = clients[Math.floor(Math.random() * clients.length)];
  const randomModel = models[Math.floor(Math.random() * models.length)];
  
  const cand = candidatesData[Math.floor(Math.random() * candidatesData.length)];
  const reqId = "REQ-" + Math.floor(10000 + Math.random() * 90000);
  
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  let rate = 0;
  if (randomModel === "Permanent") {
    rate = cand.annualSalary || 135000;
  } else if (randomModel === "Resource Augment") {
    rate = (cand.hourlyRate || 85) * 160;
  } else {
    rate = cand.hourlyRate || 85;
  }
  
  const newRequest = {
    id: reqId,
    client: randomClient,
    model: randomModel,
    candidateId: cand.id,
    candidateRole: cand.role,
    candidateExperience: cand.experience,
    candidateRate: rate,
    submittedDate: dateStr,
    status: "In Process"
  };
  
  state.requests.unshift(newRequest);
  state.candidateStatuses[cand.id] = "Submitted";
  saveCandidateStatuses();
  saveRequestsToStorage();
  addAdminLog(`Simulated hiring request ${reqId} created by ${randomClient} for Candidate #${cand.id.replace('TB-', 'AIS-')}`, "info");
  renderAllViews();
  alert(`Simulated mock request ${reqId} successfully!`);
}

function registerMockCandidate() {
  const roles = ["Senior Fullstack Developer", "AI Product Designer", "Cloud Infrastructure Expert", "Data Platform Architect", "Mobile Swift Developer"];
  const skillsPool = [
    ["React", "Node.js", "Docker", "PostgreSQL"],
    ["Figma", "Design Systems", "User Research", "Webflow"],
    ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    ["Python", "Apache Spark", "Snowflake", "ETL"],
    ["Swift", "SwiftUI", "iOS", "CoreData"]
  ];
  const educations = ["B.S. in Computer Science", "M.S. in Information Systems", "B.S. in Software Engineering", "M.S. in Computer Science", "B.A. in Interaction Design"];
  
  const idx = Math.floor(Math.random() * roles.length);
  const newId = `TB-${100 + candidatesData.length + 1}`;
  
  const mockCand = {
    id: newId,
    role: roles[idx],
    skills: skillsPool[idx],
    experience: Math.floor(3 + Math.random() * 8),
    hourlyRate: Math.floor(60 + Math.random() * 60),
    annualSalary: Math.floor(100000 + Math.random() * 80000),
    education: educations[Math.floor(Math.random() * educations.length)],
    availability: Math.random() > 0.5 ? "Immediate" : "2 Weeks Notice",
    bio: `Experienced specialist in ${roles[idx]} fields with standard engineering backgrounds.`,
    matchRating: Math.floor(85 + Math.random() * 15)
  };

  const firstNames = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "Oliver", "Sophia", "Elijah", "Isabella"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  const companies = ["Oracle", "Salesforce", "Cisco", "IBM", "Intel", "Adobe", "VMware", "NVIDIA"];
  const randName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const randCompany = companies[Math.floor(Math.random() * companies.length)];
  candidateMockDetails[newId] = { name: randName, company: randCompany };
  
  state.candidateStatuses[newId] = "Sourced";
  saveCandidateStatuses();
  
  candidatesData.push(mockCand);
  addAdminLog(`Registered mock vetted candidate ${newId} (${roles[idx]})`, "success");
  renderAllViews();
  alert(`Registered mock candidate ${newId} (${roles[idx]}) successfully!`);
}

function resetPlatformData() {
  if (confirm("This will clear all localStorage settings, candidate profiles, company profiles, and refresh the platform to default demo configurations. Proceed?")) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
}

function seedMockPlacements() {
  const mockSeeds = [
    {
      id: "REQ-38291",
      client: "Google",
      model: "Permanent",
      candidateId: "TB-101",
      candidateRole: "Senior React Developer",
      candidateExperience: 7,
      candidateRate: 135000,
      submittedDate: "May 28, 2026",
      status: "Fulfilled"
    },
    {
      id: "REQ-72819",
      client: "Meta",
      model: "Resource Augment",
      candidateId: "TB-107",
      candidateRole: "Senior AI & Data Scientist",
      candidateExperience: 6,
      candidateRate: 17600,
      submittedDate: "Jun 01, 2026",
      status: "In Process"
    },
    {
      id: "REQ-99008",
      client: "Netflix",
      model: "Hire by Hour",
      candidateId: "TB-104",
      candidateRole: "Lead UI/UX Designer & Architect",
      candidateExperience: 6,
      candidateRate: 70,
      submittedDate: "Jun 02, 2026",
      status: "Fulfilled"
    },
    {
      id: "REQ-55122",
      client: "Stripe",
      model: "Permanent",
      candidateId: "TB-102",
      candidateRole: "Full-Stack Node.js & React Engineer",
      candidateExperience: 5,
      candidateRate: 120000,
      submittedDate: "Jun 03, 2026",
      status: "Rejected"
    }
  ];
  
  mockSeeds.forEach(seed => {
    if (!state.requests.some(r => r.id === seed.id)) {
      state.requests.push(seed);
      // Seed corresponding candidateStatuses
      if (seed.status === "Fulfilled") {
        state.candidateStatuses[seed.candidateId] = "Joined";
      } else if (seed.status === "Rejected") {
        state.candidateStatuses[seed.candidateId] = "Rejected";
      } else {
        state.candidateStatuses[seed.candidateId] = "L1 Scheduled";
      }
    }
  });
  
  saveCandidateStatuses();
  saveRequestsToStorage();
  addAdminLog("Seeded mock placement requests into pipeline", "success");
  renderAllViews();
  alert("Mock placement requests seeded successfully!");
}

// ==========================================
// CANDIDATE MODULE HELPER FUNCTIONS
// ==========================================

// Load Candidate profile and apps from Storage
function loadCandidateProfile() {
  const stored = localStorage.getItem("ai_sourcing_candidate_profile");
  if (stored) {
    try {
      state.candidateProfile = JSON.parse(stored);
      if (!state.candidateProfile.educations) {
        state.candidateProfile.educations = [
          {
            degree: state.candidateProfile.degree || "Graduation",
            passingYear: state.candidateProfile.passingYear || "2020",
            gradType: state.candidateProfile.gradType || "Fulltime",
            mbaMode: state.candidateProfile.mbaMode || "Online",
            mbaOfflineType: state.candidateProfile.mbaOfflineType || "Fulltime",
            institute: state.candidateProfile.institute || "UC Berkeley"
          }
        ];
      }
    } catch (e) {
      console.error("Failed to parse candidate profile", e);
    }
  } else {
    // Initial mockup setup for a great default candidate experience
    state.candidateProfile = {
      firstName: "Alex",
      lastName: "Mercer",
      country: "United States",
      state: "California",
      city: "San Francisco",
      educations: [
        {
          degree: "Graduation",
          passingYear: "2020",
          gradType: "Fulltime",
          mbaMode: "Online",
          mbaOfflineType: "Fulltime",
          institute: "UC Berkeley"
        }
      ],
      jobs: [
        {
          company: "Webflow Inc",
          title: "Frontend Engineer",
          startDate: "2021-06-01",
          endDate: "2023-08-30",
          location: "San Francisco, CA",
          reason: "Seeking new challenge and growth in React architecture."
        }
      ],
      ctcFixed: "110000",
      ctcVar: "15000",
      expectedCtc: "135000",
      jobType: "Fulltime",
      noticePeriod: "Immediate",
      lastDay: "",
      resumeName: "alex_mercer_resume.pdf",
      gapReasons: {}
    };
    saveCandidateProfile();
  }
  
  // Load applications
  const storedApps = localStorage.getItem("ai_sourcing_candidate_applications");
  if (storedApps) {
    try {
      state.candidateApplications = JSON.parse(storedApps);
    } catch (e) {
      console.error("Failed to parse candidate applications", e);
      state.candidateApplications = [];
    }
  } else {
    // Populate with 7 default applications matching the dashboard specs
    state.candidateApplications = [
      {
        requestId: "REQ-99001",
        jobId: "JOB-001",
        jobTitle: "Senior React Developer",
        company: "Global Tech Corp.",
        model: "Resource Augment",
        pricing: 12000,
        appliedDate: "May 10, 2026",
        status: "In Review"
      },
      {
        requestId: "REQ-99002",
        jobId: "JOB-002",
        jobTitle: "Full-Stack Node.js Engineer",
        company: "DataShield Inc.",
        model: "Permanent",
        pricing: 120000,
        appliedDate: "May 12, 2026",
        status: "Assessment"
      },
      {
        requestId: "REQ-99003",
        jobId: "JOB-003",
        jobTitle: "Lead UI/UX Designer",
        company: "Studio Labs",
        model: "Hire by Hour",
        pricing: 70,
        appliedDate: "May 14, 2026",
        status: "Interview"
      },
      {
        requestId: "REQ-99004",
        jobId: "JOB-004",
        jobTitle: "DevOps & Cloud Engineer",
        company: "ScaleGrid Cloud Solutions",
        model: "Resource Augment",
        pricing: 13600,
        appliedDate: "May 16, 2026",
        status: "Rejected"
      },
      {
        requestId: "REQ-99005",
        jobId: "JOB-005",
        jobTitle: "Product Manager (Technical)",
        company: "Innovate AI Ltd",
        model: "Permanent",
        pricing: 125000,
        appliedDate: "May 18, 2026",
        status: "Offer"
      },
      {
        requestId: "REQ-99006",
        jobId: "JOB-STRIPE",
        jobTitle: "Senior Product Designer",
        company: "Stripe",
        model: "Permanent",
        pricing: 140000,
        appliedDate: "May 20, 2026",
        status: "In Review"
      },
      {
        requestId: "REQ-99007",
        jobId: "JOB-GOOGLE",
        jobTitle: "Product Designer",
        company: "Google",
        model: "Permanent",
        pricing: 150000,
        appliedDate: "May 22, 2026",
        status: "Interview"
      }
    ];
    localStorage.setItem("ai_sourcing_candidate_applications", JSON.stringify(state.candidateApplications));
    
    // Also inject them into the global requests queue so the admin can see them!
    state.candidateApplications.forEach(app => {
      const existing = state.requests.find(r => r.id === app.requestId);
      if (!existing) {
        state.requests.push({
          id: app.requestId,
          client: app.company,
          model: app.model,
          candidateId: "TB-999", // Alex Mercer's ID
          candidateRole: app.jobTitle,
          candidateExperience: 5,
          candidateRate: app.pricing,
          submittedDate: app.appliedDate,
          status: app.status === "Offer" ? "Fulfilled" : "In Process"
        });
      }
    });
    saveRequestsToStorage();
  }

  // Load Saved Jobs
  const storedSavedJobs = localStorage.getItem("ai_sourcing_candidate_saved_jobs");
  if (storedSavedJobs) {
    try {
      state.candidateSavedJobs = JSON.parse(storedSavedJobs);
    } catch (e) {
      console.error("Failed to parse saved jobs", e);
      state.candidateSavedJobs = ["REC-001", "REC-002", "REC-003", "JOB-003"];
    }
  } else {
    state.candidateSavedJobs = ["REC-001", "REC-002", "REC-003", "JOB-003"];
    localStorage.setItem("ai_sourcing_candidate_saved_jobs", JSON.stringify(state.candidateSavedJobs));
  }
  
  // Load Activity Logs
  const storedActivityLogs = localStorage.getItem("ai_sourcing_candidate_activity_logs");
  if (storedActivityLogs) {
    try {
      state.candidateActivityLogs = JSON.parse(storedActivityLogs);
    } catch (e) {
      console.error("Failed to parse activity logs", e);
      state.candidateActivityLogs = [
        { text: "<strong>Acme Inc.</strong> viewed your application", time: "2h ago", type: "emerald", icon: "view" },
        { text: "You received a message from <strong>Google Recruiter</strong>", time: "1d ago", type: "indigo", icon: "message" },
        { text: "Interview scheduled with <strong>Google</strong>", time: "2d ago", type: "amber", icon: "calendar" },
        { text: "You applied for <strong>Senior Product Designer</strong> at Stripe", time: "3d ago", type: "violet", icon: "file" }
      ];
    }
  } else {
    state.candidateActivityLogs = [
      { text: "<strong>Acme Inc.</strong> viewed your application", time: "2h ago", type: "emerald", icon: "view" },
      { text: "You received a message from <strong>Google Recruiter</strong>", time: "1d ago", type: "indigo", icon: "message" },
      { text: "Interview scheduled with <strong>Google</strong>", time: "2d ago", type: "amber", icon: "calendar" },
      { text: "You applied for <strong>Senior Product Designer</strong> at Stripe", time: "3d ago", type: "violet", icon: "file" }
    ];
    localStorage.setItem("ai_sourcing_candidate_activity_logs", JSON.stringify(state.candidateActivityLogs));
  }
  
  // Load Interviews
  const storedInterviews = localStorage.getItem("ai_sourcing_candidate_interviews");
  if (storedInterviews) {
    try {
      state.candidateInterviews = JSON.parse(storedInterviews);
    } catch (e) {
      console.error("Failed to parse candidate interviews", e);
      state.candidateInterviews = [
        { 
          id: "INT-001", 
          company: "Google", 
          role: "Product Designer", 
          dateStr: "Jun 10, 2026 • 10:00 AM", 
          typeClass: "logo-google", 
          logoLetter: "G", 
          badgeText: "Video Interview", 
          badgeClass: "badge-blue",
          interviewer: "Sarah Jenkins (Lead Designer)",
          status: "Scheduled",
          meetingLink: "https://meet.google.com/abc-defg-hij"
        },
        { 
          id: "INT-002", 
          company: "Acme Inc.", 
          role: "UX Designer", 
          dateStr: "Jun 14, 2026 • 2:00 PM", 
          typeClass: "logo-acme", 
          logoLetter: "A", 
          badgeText: "On-site Interview", 
          badgeClass: "badge-green",
          interviewer: "David Miller (Director of UX)",
          status: "Scheduled",
          meetingLink: ""
        }
      ];
    }
  } else {
    state.candidateInterviews = [
      { 
        id: "INT-001", 
        company: "Google", 
        role: "Product Designer", 
        dateStr: "Jun 10, 2026 • 10:00 AM", 
        typeClass: "logo-google", 
        logoLetter: "G", 
        badgeText: "Video Interview", 
        badgeClass: "badge-blue",
        interviewer: "Sarah Jenkins (Lead Designer)",
        status: "Scheduled",
        meetingLink: "https://meet.google.com/abc-defg-hij"
      },
      { 
        id: "INT-002", 
        company: "Acme Inc.", 
        role: "UX Designer", 
        dateStr: "Jun 14, 2026 • 2:00 PM", 
        typeClass: "logo-acme", 
        logoLetter: "A", 
        badgeText: "On-site Interview", 
        badgeClass: "badge-green",
        interviewer: "David Miller (Director of UX)",
        status: "Scheduled",
        meetingLink: ""
      }
    ];
    localStorage.setItem("ai_sourcing_candidate_interviews", JSON.stringify(state.candidateInterviews));
  }
}

// Save Candidate profile and apps to Storage
function saveCandidateProfile() {
  localStorage.setItem("ai_sourcing_candidate_profile", JSON.stringify(state.candidateProfile));
  localStorage.setItem("ai_sourcing_candidate_applications", JSON.stringify(state.candidateApplications));
  localStorage.setItem("ai_sourcing_candidate_saved_jobs", JSON.stringify(state.candidateSavedJobs));
  localStorage.setItem("ai_sourcing_candidate_activity_logs", JSON.stringify(state.candidateActivityLogs));
  localStorage.setItem("ai_sourcing_candidate_interviews", JSON.stringify(state.candidateInterviews));
  window.dispatchEvent(new Event("storage_updated"));
}

// Calculate Profile Completeness and render checklist statuses
function updateProfileCompleteness() {
  const profile = state.candidateProfile;
  let score = 0;
  const maxScore = 4;
  
  const checklistPersonal = document.getElementById("checklist-personal");
  const checklistEducation = document.getElementById("checklist-education");
  const checklistExperience = document.getElementById("checklist-experience");
  const checklistCompensation = document.getElementById("checklist-compensation");
  
  // 1. Personal Info check
  const personalOk = !!(profile.firstName && profile.lastName && profile.country && profile.state && profile.city);
  if (personalOk) {
    score++;
    if (checklistPersonal) checklistPersonal.innerHTML = "✅ Personal Info & Location";
  } else {
    if (checklistPersonal) checklistPersonal.innerHTML = "❌ Personal Info & Location";
  }
  
  // 2. Education check
  const eduOk = !!(profile.educations && profile.educations.length > 0 && profile.educations.every(e => e.degree && e.passingYear && e.institute));
  if (eduOk) {
    score++;
    if (checklistEducation) checklistEducation.innerHTML = "✅ Educational History";
  } else {
    if (checklistEducation) checklistEducation.innerHTML = "❌ Educational History";
  }
  
  // 3. Experience check
  const expOk = !!(profile.jobs && profile.jobs.length > 0);
  if (expOk) {
    score++;
    if (checklistExperience) checklistExperience.innerHTML = "✅ Work History";
  } else {
    if (checklistExperience) checklistExperience.innerHTML = "❌ Work History";
  }
  
  // 4. Notice & CTC Target check
  const compOk = !!(profile.ctcFixed && profile.ctcVar && profile.expectedCtc && profile.noticePeriod && profile.jobType);
  if (compOk) {
    score++;
    if (checklistCompensation) checklistCompensation.innerHTML = "✅ Notice & CTC Targets";
  } else {
    if (checklistCompensation) checklistCompensation.innerHTML = "❌ Notice & CTC Targets";
  }
  
  const percentage = Math.round((score / maxScore) * 100);
  if (elements.candidateProfilePercent) {
    elements.candidateProfilePercent.textContent = `${percentage}%`;
  }
  if (elements.candidateProfileProgressBar) {
    elements.candidateProfileProgressBar.style.width = `${percentage}%`;
  }

  // Update radial progress bar
  const radialBar = document.getElementById("radial-progress-bar");
  const radialPercent = document.getElementById("radial-completeness-percent");
  if (radialBar) {
    radialBar.setAttribute("stroke-dasharray", `${percentage} ${100 - percentage}`);
  }
  if (radialPercent) {
    radialPercent.textContent = `${percentage}%`;
  }
}

// Setup Resume drag and drop / upload
function setupResumeUpload() {
  const dropZone = elements.resumeDropZone;
  const fileInput = elements.resumeFileInput;
  const deleteBtn = elements.deleteResumeBtn;
  
  const docDropZone = elements.documentsResumeDropZone;
  const docFileInput = elements.documentsResumeFileInput;
  const docDeleteBtn = elements.documentsDeleteResumeBtn;
  
  // Bind Dashboard Dropzone
  if (dropZone && fileInput) {
    dropZone.addEventListener("click", () => {
      fileInput.click();
    });
    
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("hover");
    });
    
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("hover");
    });
    
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("hover");
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleUploadedFile(files[0]);
      }
    });
    
    fileInput.addEventListener("change", (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        handleUploadedFile(files[0]);
      }
    });
  }
  
  // Bind Documents Page Dropzone
  if (docDropZone && docFileInput) {
    docDropZone.addEventListener("click", () => {
      docFileInput.click();
    });
    
    docDropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      docDropZone.classList.add("hover");
    });
    
    docDropZone.addEventListener("dragleave", () => {
      docDropZone.classList.remove("hover");
    });
    
    docDropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      docDropZone.classList.remove("hover");
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleUploadedFile(files[0]);
      }
    });
    
    docFileInput.addEventListener("change", (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        handleUploadedFile(files[0]);
      }
    });
  }
  
  // Deletion logic handler
  const handleDelete = (e) => {
    e.stopPropagation();
    const oldName = state.candidateProfile.resumeName;
    if (oldName) {
      state.candidateProfile.resumeName = "";
      saveCandidateProfile();
      addActivityLog(`Removed resume document <strong>${oldName}</strong>`, "rose", "file");
      renderResumeSection();
      updateProfileCompleteness();
      renderDocumentsPage();
    }
  };
  
  if (deleteBtn) {
    deleteBtn.addEventListener("click", handleDelete);
  }
  if (docDeleteBtn) {
    docDeleteBtn.addEventListener("click", handleDelete);
  }
}

// Handle uploaded file and check extensions
function handleUploadedFile(file) {
  const allowed = [".pdf", ".doc", ".docx"];
  const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
  
  if (!allowed.includes(ext)) {
    alert("Invalid file format. Please upload a PDF, DOC, or DOCX resume.");
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert("File exceeds maximum size of 5MB.");
    return;
  }
  
  if (elements.resumeUploadStatus) {
    elements.resumeUploadStatus.textContent = "Uploading resume file...";
  }
  if (elements.documentsResumeUploadStatus) {
    elements.documentsResumeUploadStatus.textContent = "Uploading resume file...";
  }
  
  // Simulated API call delay
  setTimeout(() => {
    state.candidateProfile.resumeName = file.name;
    state.candidateProfile.resumeSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    const now = new Date();
    state.candidateProfile.resumeUploadDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    saveCandidateProfile();
    addActivityLog(`Uploaded resume document: <strong>${file.name}</strong>`, "emerald", "file");
    renderResumeSection();
    updateProfileCompleteness();
    renderDocumentsPage();
  }, 900);
}

// Show details card or upload box depending on state
function renderResumeSection() {
  const name = state.candidateProfile.resumeName;
  
  // Dashboard
  if (elements.resumeDropZone && elements.resumeFileDetails && elements.resumeFileName && elements.resumeUploadStatus) {
    if (name) {
      elements.resumeDropZone.classList.add("hidden");
      elements.resumeFileDetails.classList.remove("hidden");
      elements.resumeFileName.textContent = name;
    } else {
      elements.resumeDropZone.classList.remove("hidden");
      elements.resumeFileDetails.classList.add("hidden");
      elements.resumeUploadStatus.textContent = "Drag & drop resume here, or click to upload";
    }
  }
  
  // Documents page
  if (elements.documentsResumeDropZone && elements.documentsResumeFileDetails && elements.documentsResumeFileName && elements.documentsResumeUploadStatus) {
    if (name) {
      elements.documentsResumeDropZone.classList.add("hidden");
      elements.documentsResumeFileDetails.classList.remove("hidden");
      elements.documentsResumeFileName.textContent = name;
    } else {
      elements.documentsResumeDropZone.classList.remove("hidden");
      elements.documentsResumeFileDetails.classList.add("hidden");
      elements.documentsResumeUploadStatus.textContent = "Drag & drop resume here, or click to upload";
    }
  }
}

// Load current profile state back into input fields
function loadProfileIntoForm() {
  const profile = state.candidateProfile;
  
  elements.candFirstname.value = profile.firstName || "";
  elements.candLastname.value = profile.lastName || "";
  
  // Set country and trigger cascading states load
  elements.candCountry.value = profile.country || "";
  updateLocationStateOptions(profile.country);
  
  elements.candState.value = profile.state || "";
  updateLocationCityOptions(profile.country, profile.state);
  
  elements.candCity.value = profile.city || "";
  
  // Render education repeating grid
  renderEducationHistoryInputs();
  
  // Render jobs grid
  renderJobsHistoryInputs();
  
  // Notice & targets
  elements.candCtcfixed.value = profile.ctcFixed || "";
  elements.candCtcvar.value = profile.ctcVar || "";
  elements.candExpectedctc.value = profile.expectedCtc || "";
  elements.candJobtype.value = profile.jobType || "";
  elements.candNotice.value = profile.noticePeriod || "";
  
  toggleNoticeDatePanel(profile.noticePeriod);
  elements.candLastday.value = profile.lastDay || "";
}

// Location lookup cascaders
function updateLocationStateOptions(country) {
  const select = elements.candState;
  select.innerHTML = '<option value="" disabled selected>Select State</option>';
  select.disabled = true;
  
  elements.candCity.innerHTML = '<option value="" disabled selected>Select City</option>';
  elements.candCity.disabled = true;
  
  if (country && locationData[country]) {
    const states = Object.keys(locationData[country]);
    states.forEach(st => {
      const opt = document.createElement("option");
      opt.value = st;
      opt.textContent = st;
      select.appendChild(opt);
    });
    select.disabled = false;
  }
}

function updateLocationCityOptions(country, stateName) {
  const select = elements.candCity;
  select.innerHTML = '<option value="" disabled selected>Select City</option>';
  select.disabled = true;
  
  if (country && stateName && locationData[country] && locationData[country][stateName]) {
    const cities = locationData[country][stateName];
    cities.forEach(ct => {
      const opt = document.createElement("option");
      opt.value = ct;
      opt.textContent = ct;
      select.appendChild(opt);
    });
    select.disabled = false;
  }
}

// Render repeating education qualifications list
function renderEducationHistoryInputs() {
  const container = elements.educationQualificationsListContainer;
  const educations = state.candidateProfile.educations;
  
  container.innerHTML = "";
  
  if (!educations || educations.length === 0) {
    container.innerHTML = `
      <p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 20px;" id="no-education-helper-text">
        No education qualifications added. Add your degrees starting from the highest qualification.
      </p>
    `;
    return;
  }
  
  educations.forEach((edu, index) => {
    const card = document.createElement("div");
    card.className = "work-experience-card"; // Reuse style
    
    let ordinal = "Highest Degree";
    if (index === 1) ordinal = "Second Degree";
    else if (index === 2) ordinal = "Third Degree";
    else if (index > 2) ordinal = `${index + 1}th Degree`;
    
    card.innerHTML = `
      <div class="work-experience-card-header">
        <span class="work-experience-card-title">${ordinal}</span>
        <button type="button" class="btn-remove-job" onclick="removeEducationQualification(${index})">Remove</button>
      </div>
      <div class="form-row" style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; margin-bottom: 0;">
        <div class="form-group" style="flex: 1.2; min-width: 160px;">
          <label class="form-label">Degree / Qualification</label>
          <select class="form-select edu-degree" required>
            <option value="" disabled ${!edu.degree ? 'selected' : ''}>Select Qualification</option>
            <option value="SSC" ${edu.degree === 'SSC' ? 'selected' : ''}>SSC (10th Standard)</option>
            <option value="HSC" ${edu.degree === 'HSC' ? 'selected' : ''}>HSC (12th Standard)</option>
            <option value="Graduation" ${edu.degree === 'Graduation' ? 'selected' : ''}>Graduation (Bachelor's)</option>
            <option value="MBA" ${edu.degree === 'MBA' ? 'selected' : ''}>MBA (Master of Business Admin)</option>
          </select>
        </div>
        <div class="form-group" style="flex: 0.8; min-width: 110px;">
          <label class="form-label">Year of Passing</label>
          <input type="number" class="form-input edu-passing-year" min="1980" max="2027" required placeholder="e.g. 2020" value="${edu.passingYear || ''}">
        </div>
        
        <!-- Conditional graduation panel -->
        <div class="form-group edu-grad-panel ${edu.degree === 'Graduation' ? '' : 'hidden'}" style="flex: 1.2; min-width: 160px;">
          <label class="form-label">Graduation Mode</label>
          <select class="form-select edu-grad-type">
            <option value="Fulltime" ${edu.gradType === 'Fulltime' ? 'selected' : ''}>Fulltime Degree</option>
            <option value="Correspondence" ${edu.gradType === 'Correspondence' ? 'selected' : ''}>Correspondence / Distance</option>
          </select>
        </div>
        
        <!-- Conditional MBA Mode panels -->
        <div class="form-group edu-mba-panel ${edu.degree === 'MBA' ? '' : 'hidden'}" style="flex: 1.2; min-width: 160px;">
          <label class="form-label">MBA Delivery</label>
          <select class="form-select edu-mba-mode">
            <option value="Online" ${edu.mbaMode === 'Online' ? 'selected' : ''}>Online</option>
            <option value="Offline" ${edu.mbaMode === 'Offline' ? 'selected' : ''}>Offline</option>
          </select>
        </div>
        <div class="form-group edu-mba-offline-panel ${edu.degree === 'MBA' && edu.mbaMode === 'Offline' ? '' : 'hidden'}" style="flex: 1.2; min-width: 160px;">
          <label class="form-label">MBA Mode</label>
          <select class="form-select edu-mba-offline-type">
            <option value="Fulltime" ${edu.mbaOfflineType === 'Fulltime' ? 'selected' : ''}>Fulltime MBA</option>
            <option value="Partime" ${edu.mbaOfflineType === 'Partime' ? 'selected' : ''}>Partime MBA</option>
          </select>
        </div>
        
        <div class="form-group" style="flex: 2; min-width: 220px;">
          <label class="form-label">Institute / University Name</label>
          <input type="text" class="form-input edu-institute" required placeholder="e.g. Stanford University" value="${edu.institute || ''}">
        </div>
      </div>
    `;
    
    const degreeSelect = card.querySelector(".edu-degree");
    const passingYearInput = card.querySelector(".edu-passing-year");
    const gradPanel = card.querySelector(".edu-grad-panel");
    const gradTypeSelect = card.querySelector(".edu-grad-type");
    const mbaPanel = card.querySelector(".edu-mba-panel");
    const mbaModeSelect = card.querySelector(".edu-mba-mode");
    const mbaOfflinePanel = card.querySelector(".edu-mba-offline-panel");
    const mbaOfflineTypeSelect = card.querySelector(".edu-mba-offline-type");
    const instituteInput = card.querySelector(".edu-institute");
    
    const updateToggles = () => {
      const degVal = degreeSelect.value;
      const mbaModeVal = mbaModeSelect.value;
      
      if (degVal === "Graduation") {
        gradPanel.classList.remove("hidden");
        mbaPanel.classList.add("hidden");
        mbaOfflinePanel.classList.add("hidden");
      } else if (degVal === "MBA") {
        gradPanel.classList.add("hidden");
        mbaPanel.classList.remove("hidden");
        
        if (mbaModeVal === "Offline") {
          mbaOfflinePanel.classList.remove("hidden");
        } else {
          mbaOfflinePanel.classList.add("hidden");
        }
      } else {
        gradPanel.classList.add("hidden");
        mbaPanel.classList.add("hidden");
        mbaOfflinePanel.classList.add("hidden");
      }
    };
    
    const syncState = () => {
      state.candidateProfile.educations[index] = {
        degree: degreeSelect.value,
        passingYear: passingYearInput.value,
        gradType: gradTypeSelect.value,
        mbaMode: mbaModeSelect.value,
        mbaOfflineType: mbaOfflineTypeSelect.value,
        institute: instituteInput.value.trim()
      };
    };
    
    degreeSelect.addEventListener("change", () => {
      updateToggles();
      syncState();
      updateProfileCompleteness();
    });
    
    passingYearInput.addEventListener("input", syncState);
    gradTypeSelect.addEventListener("change", syncState);
    
    mbaModeSelect.addEventListener("change", () => {
      updateToggles();
      syncState();
    });
    
    mbaOfflineTypeSelect.addEventListener("change", syncState);
    
    instituteInput.addEventListener("input", () => {
      syncState();
      updateProfileCompleteness();
    });
    
    container.appendChild(card);
  });
}

// Window callback remove education block
window.removeEducationQualification = function(index) {
  state.candidateProfile.educations.splice(index, 1);
  renderEducationHistoryInputs();
  updateProfileCompleteness();
};

function toggleNoticeDatePanel(noticePeriod) {
  if (noticePeriod === "Already Resigned") {
    elements.noticeResignedDatePanel.classList.remove("hidden");
    elements.candLastday.required = true;
  } else {
    elements.noticeResignedDatePanel.classList.add("hidden");
    elements.candLastday.required = false;
  }
}

// Render dynamic job employment history lists
function renderJobsHistoryInputs() {
  const container = elements.workExperienceListContainer;
  const jobs = state.candidateProfile.jobs;
  
  container.innerHTML = "";
  
  if (!jobs || jobs.length === 0) {
    container.innerHTML = `
      <p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 20px;" id="no-jobs-helper-text">
        No employment history added. Add your work experience starting from the highest qualification.
      </p>
    `;
    return;
  }
  
  jobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "work-experience-card";
    
    let label = "First Job (after highest qualification)";
    if (index === 1) label = "Second Job";
    else if (index === 2) label = "Third Job";
    else if (index > 2) label = `${index + 1}th Job`;
    
    card.innerHTML = `
      <div class="work-experience-card-header">
        <span class="work-experience-card-title">${label}</span>
        <button type="button" class="btn-remove-job" onclick="removeJobExperience(${index})">Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Company</label>
          <input type="text" class="form-input comp-name" value="${job.company || ''}" required placeholder="e.g. Google">
        </div>
        <div class="form-group">
          <label class="form-label">Job Title</label>
          <input type="text" class="form-input job-title" value="${job.title || ''}" required placeholder="e.g. Senior Product PM">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input type="date" class="form-input start-date" value="${job.startDate || ''}" required>
        </div>
        <div class="form-group">
          <label class="form-label">End Date</label>
          <input type="date" class="form-input end-date" value="${job.endDate || ''}" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Job Location</label>
          <input type="text" class="form-input job-loc" value="${job.location || ''}" required placeholder="e.g. Austin, TX">
        </div>
        <div class="form-group">
          <label class="form-label">Reason of Leaving</label>
          <input type="text" class="form-input job-reason" value="${job.reason || ''}" required placeholder="e.g. Sabbatical">
        </div>
      </div>
    `;
    
    // Setup inputs event captures
    const comp = card.querySelector(".comp-name");
    const title = card.querySelector(".job-title");
    const start = card.querySelector(".start-date");
    const end = card.querySelector(".end-date");
    const loc = card.querySelector(".job-loc");
    const reason = card.querySelector(".job-reason");
    
    const sync = () => {
      state.candidateProfile.jobs[index] = {
        company: comp.value.trim(),
        title: title.value.trim(),
        startDate: start.value,
        endDate: end.value,
        location: loc.value.trim(),
        reason: reason.value.trim()
      };
      renderGapsSection();
    };
    
    comp.addEventListener("input", sync);
    title.addEventListener("input", sync);
    start.addEventListener("input", sync);
    end.addEventListener("input", sync);
    loc.addEventListener("input", sync);
    reason.addEventListener("input", sync);
    
    container.appendChild(card);
  });
  
  // Call gaps check and render
  renderGapsSection();
}

// Find Gaps in Employment History Chronologically
function findEmploymentGaps() {
  const jobs = state.candidateProfile.jobs.filter(j => j.company && j.startDate && j.endDate);
  if (jobs.length < 2) return [];
  
  // Sort jobs by start date ascending
  const sortedJobs = [...jobs].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
  const gaps = [];
  for (let i = 0; i < sortedJobs.length - 1; i++) {
    const currentJob = sortedJobs[i];
    const nextJob = sortedJobs[i+1];
    
    const end = new Date(currentJob.endDate);
    const start = new Date(nextJob.startDate);
    
    if (start > end) {
      const diffTime = Math.abs(start - end);
      const diffDays = Math.ceil(diffTime / (1024 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        gaps.push({
          prevCompany: currentJob.company,
          nextCompany: nextJob.company,
          endDateStr: currentJob.endDate,
          startDateStr: nextJob.startDate,
          days: diffDays
        });
      }
    }
  }
  return gaps;
}

// Render dynamic gap prompt input fields inside Candidate Profile View
function renderGapsSection() {
  const container = document.getElementById("gaps-prompt-container");
  if (!container) return;
  
  const gaps = findEmploymentGaps();
  if (gaps.length === 0) {
    container.innerHTML = "";
    container.classList.add("hidden");
    return;
  }
  
  container.classList.remove("hidden");
  container.innerHTML = `
    <div class="glass-panel" style="background: rgba(239, 68, 68, 0.03); border: 1px dashed rgba(239, 68, 68, 0.25); border-radius: var(--radius-md); padding: 20px;">
      <h4 style="color: var(--accent-rose); font-size: 0.95rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-rose)" stroke-width="2" style="flex-shrink:0;">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Employment Gaps Detected
      </h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">Please specify the reason for the gaps between your employment periods below to help recruiters understand your timeline.</p>
      <div id="gap-inputs-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
    </div>
  `;
  
  const listContainer = container.querySelector("#gap-inputs-list");
  gaps.forEach(gap => {
    const gapKey = `${gap.prevCompany}_to_${gap.nextCompany}_gap`;
    const savedReason = state.candidateProfile.gapReasons ? state.candidateProfile.gapReasons[gapKey] : "";
    
    const item = document.createElement("div");
    item.className = "form-group";
    item.style.marginBottom = "0";
    item.innerHTML = `
      <label class="form-label" style="color: var(--text-primary); font-weight: 500; font-size: 0.85rem; margin-bottom:6px; display:block;">
        Reason for the gap of <strong>${gap.days} days</strong> between <strong>${gap.prevCompany}</strong> and <strong>${gap.nextCompany}</strong>:
      </label>
      <input type="text" class="form-input gap-reason-input" value="${savedReason || ''}" required placeholder="e.g. Sabbatical, Upskilling course, Relocation, Health break...">
    `;
    
    const input = item.querySelector(".gap-reason-input");
    input.addEventListener("input", (e) => {
      if (!state.candidateProfile.gapReasons) {
        state.candidateProfile.gapReasons = {};
      }
      state.candidateProfile.gapReasons[gapKey] = e.target.value.trim();
      localStorage.setItem("ai_sourcing_candidate_profile", JSON.stringify(state.candidateProfile));
    });
    
    listContainer.appendChild(item);
  });
}

// Window callback remove jobs block
window.removeJobExperience = function(index) {
  state.candidateProfile.jobs.splice(index, 1);
  renderJobsHistoryInputs();
  updateProfileCompleteness();
};

// Render Candidate simulated openings list
function renderCandidateOpenings() {
  const grid = elements.candidateOpeningsGrid;
  if (!grid) return;
  
  grid.innerHTML = "";
  elements.candidateJobsCountIndicator.textContent = `${mockOpeningsData.length} Openings`;
  
  mockOpeningsData.forEach(job => {
    const card = document.createElement("div");
    card.className = "candidate-card glass-panel";
    
    let rateStr = "";
    if (job.model === "Permanent") {
      rateStr = `$${(job.pricing / 1000).toFixed(0)}k<span>/yr</span>`;
    } else if (job.model === "Resource Augment") {
      rateStr = `$${(job.pricing / 1000).toFixed(1)}k<span>/mo</span>`;
    } else {
      rateStr = `$${job.pricing}<span>/hr</span>`;
    }
    
    // Check if applied
    const appliedIndex = state.candidateApplications.findIndex(a => a.jobId === job.id);
    let buttonHtml = "";
    
    if (appliedIndex !== -1) {
      const app = state.candidateApplications[appliedIndex];
      const req = state.requests.find(r => r.id === app.requestId);
      const status = req ? req.status : "In Process";
      
      if (status === "In Process") {
        buttonHtml = `<button class="btn-card-action selected-processing" disabled>Applied (In Process)</button>`;
      } else {
        buttonHtml = `<button class="btn-card-action selected-fulfilled" disabled>Fulfilled</button>`;
      }
    } else {
      buttonHtml = `<button class="btn-card-action" onclick="applyToJob('${job.id}')">Quick Apply</button>`;
    }
    
    const skillsHtml = job.skills.map(s => `<span class="candidate-skill-tag">${s}</span>`).join("");
    
    card.innerHTML = `
      <div>
        <div class="candidate-card-header">
          <span class="candidate-placeholder-name">
            <span class="candidate-placeholder-avatar">J</span>
            ${job.id}
          </span>
          <span class="match-score-pill">${job.model}</span>
        </div>
        <h4 class="candidate-title">${job.role}</h4>
        <p style="font-size:0.8rem; color:var(--accent-cyan); font-weight:600; margin-bottom: 8px;">${job.company}</p>
        <p class="candidate-bio-summary">${job.desc}</p>
        <div class="candidate-skills-list">
          ${skillsHtml}
        </div>
      </div>
      <div class="candidate-card-bottom">
        <div class="candidate-pricing-info">
          <span class="pricing-label">Comp Target</span>
          <span class="pricing-amount">${rateStr}</span>
        </div>
        ${buttonHtml}
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Candidate applies to a job opening
window.applyToJob = function(jobId) {
  const job = mockOpeningsData.find(j => j.id === jobId);
  if (!job) return;
  
  const reqId = "REQ-" + Math.floor(10000 + Math.random() * 90000);
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const newRequest = {
    id: reqId,
    client: job.company,
    model: job.model,
    candidateId: state.currentUser || "candidate@talentsource.com",
    candidateRole: job.role,
    candidateExperience: state.candidateProfile.jobs ? state.candidateProfile.jobs.length * 2 || 1 : 1,
    candidateRate: job.pricing,
    submittedDate: dateStr,
    status: "In Process"
  };
  
  // Submit into global requests queue
  state.requests.unshift(newRequest);
  saveRequestsToStorage();
  
  // Submit into candidate application tracker
  state.candidateApplications.unshift({
    requestId: reqId,
    jobId: jobId,
    jobTitle: job.role,
    model: job.model,
    pricing: job.pricing,
    appliedDate: dateStr
  });
  addActivityLog(`You applied for <strong>${job.role}</strong> at <strong>${job.company}</strong>`, "violet", "file");
  saveCandidateProfile();
  
  alert(`Application submitted successfully for ${job.role} at ${job.company}. It is 'In Process' pending admin review.`);
  
  renderCandidateOpenings();
  renderCandidateDashboard();
};

// Render Candidate applications queue on dashboard and update dashboard components
function renderCandidateDashboard() {
  updateProfileCompleteness();
  renderResumeSection();
  
  const list = elements.candidateApplicationsListBody;
  if (!list) return;
  
  list.innerHTML = "";
  
  // Sync both candidate self-applications and external offers directed to them
  const allApps = [...state.candidateApplications];
  const candId = state.currentUser || "candidate@talentsource.com";
  
  state.requests.forEach(req => {
    // If business requested this candidate (simulated by TB-999 or candidate email)
    if (req.candidateId === "TB-999" || req.candidateId === candId) {
      if (!allApps.some(app => app.requestId === req.id)) {
        allApps.push({
          requestId: req.id,
          jobId: "REQ-INV",
          jobTitle: `${req.candidateRole} (Offer from ${req.client})`,
          model: req.model,
          pricing: req.candidateRate,
          appliedDate: req.submittedDate
        });
      }
    }
  });

  // Calculate stats counts
  const appsCount = allApps.length;
  
  let reviewCount = 0;
  let interviewCount = 0;
  let assessCount = 0;
  let rejectCount = 0;
  
  allApps.forEach(app => {
    // Get live status from state requests
    const req = state.requests.find(r => r.id === app.requestId);
    const liveStatus = req ? req.status : "In Process";
    
    if (liveStatus === "Fulfilled") {
      app.computedStatus = "Offer";
    } else {
      app.computedStatus = app.status || "In Review";
    }
    
    if (app.computedStatus === "In Review" || app.computedStatus === "In Process" || app.computedStatus === "Applied") {
      reviewCount++;
    } else if (app.computedStatus === "Interview") {
      interviewCount++;
    } else if (app.computedStatus === "Assessment") {
      assessCount++;
    } else if (app.computedStatus === "Rejected") {
      rejectCount++;
    }
  });

  const offersCount = allApps.filter(app => app.computedStatus === "Offer").length;
  const savedCount = state.candidateSavedJobs ? state.candidateSavedJobs.length : 0;
  
  // Update stats UI elements
  const elAppsCount = document.getElementById("stats-applications-count");
  if (elAppsCount) elAppsCount.textContent = appsCount;
  const elAppsSubtext = document.getElementById("stats-applications-subtext");
  if (elAppsSubtext) elAppsSubtext.textContent = `${reviewCount} in review`;

  const elInterviewsCount = document.getElementById("stats-interviews-count");
  if (elInterviewsCount) elInterviewsCount.textContent = interviewCount;
  const elInterviewsSubtext = document.getElementById("stats-interviews-subtext");
  if (elInterviewsSubtext) {
    elInterviewsSubtext.textContent = interviewCount > 0 ? "Upcoming" : "No upcoming";
  }

  const elOffersCount = document.getElementById("stats-offers-count");
  if (elOffersCount) elOffersCount.textContent = offersCount;
  const elOffersSubtext = document.getElementById("stats-offers-subtext");
  if (elOffersSubtext) {
    elOffersSubtext.textContent = offersCount > 0 ? "Received" : "None yet";
  }

  const elSavedCount = document.getElementById("stats-saved-count");
  if (elSavedCount) elSavedCount.textContent = savedCount;
  
  // Render Donut Chart
  const donutCounts = {
    review: reviewCount,
    interview: interviewCount,
    assess: assessCount,
    reject: rejectCount
  };
  updateDonutChart(donutCounts);

  // Render supporting lists
  renderUpcomingInterviews();
  renderActivityTimeline();
  renderRecommendedJobs();
  
  if (allApps.length === 0) {
    list.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">
          You haven't applied to any job openings yet. Click "Browse Jobs" above to begin.
        </td>
      </tr>
    `;
    return;
  }
  
  allApps.forEach(app => {
    const row = document.createElement("tr");
    
    let displayStatus = app.computedStatus;
    let statusClass = "processing";
    let badgeClass = "badge-amber";
    
    if (displayStatus === "Offer") {
      statusClass = "fulfilled";
      badgeClass = "badge-emerald";
      displayStatus = "Offer Received";
    } else if (displayStatus === "Rejected") {
      statusClass = "rejected";
      badgeClass = "badge-rose";
    } else if (displayStatus === "Interview") {
      statusClass = "processing";
      badgeClass = "badge-blue";
    } else if (displayStatus === "Assessment") {
      statusClass = "processing";
      badgeClass = "badge-cyan";
    }
    
    let pricing = "";
    if (app.model === "Permanent") {
      pricing = `$${(app.pricing / 1000).toFixed(0)}k/yr`;
    } else if (app.model === "Resource Augment") {
      pricing = `$${(app.pricing / 1000).toFixed(1)}k/mo`;
    } else {
      pricing = `$${app.pricing}/hr`;
    }
    
    row.innerHTML = `
      <td style="font-weight:600; color:var(--accent-indigo);">${app.jobTitle}</td>
      <td><span class="badge ${app.model === 'Permanent' ? 'badge-indigo' : (app.model === 'Resource Augment' ? 'badge-cyan' : 'badge-amber')}">${app.model}</span></td>
      <td>${pricing}</td>
      <td>${app.appliedDate}</td>
      <td>
        <div class="status-indicator-box">
          <span class="status-dot ${statusClass}"></span>
          <span class="badge ${badgeClass}" style="border:none; padding:0; background:transparent;">${displayStatus}</span>
        </div>
      </td>
    `;
    list.appendChild(row);
  });
}

// Donut chart stroke attributes update utility
function updateDonutChart(counts) {
  const total = counts.review + counts.interview + counts.assess + counts.reject;
  const totalIndicator = document.getElementById("donut-center-total");
  if (totalIndicator) totalIndicator.textContent = total;
  
  const reviewCount = document.getElementById("legend-count-review");
  if (reviewCount) reviewCount.textContent = counts.review;
  const interviewCount = document.getElementById("legend-count-interview");
  if (interviewCount) interviewCount.textContent = counts.interview;
  const assessCount = document.getElementById("legend-count-assess");
  if (assessCount) assessCount.textContent = counts.assess;
  const rejectCount = document.getElementById("legend-count-reject");
  if (rejectCount) rejectCount.textContent = counts.reject;

  const segReview = document.getElementById("donut-segment-review");
  const segInterview = document.getElementById("donut-segment-interview");
  const segAssess = document.getElementById("donut-segment-assess");
  const segReject = document.getElementById("donut-segment-reject");
  
  if (total === 0) {
    if (segReview) segReview.setAttribute("stroke-dasharray", "0 100");
    if (segInterview) segInterview.setAttribute("stroke-dasharray", "0 100");
    if (segAssess) segAssess.setAttribute("stroke-dasharray", "0 100");
    if (segReject) segReject.setAttribute("stroke-dasharray", "0 100");
    return;
  }

  const pReview = (counts.review / total) * 100;
  const pInterview = (counts.interview / total) * 100;
  const pAssess = (counts.assess / total) * 100;
  const pReject = (counts.reject / total) * 100;

  let accumulated = 0;
  
  if (segReview) {
    segReview.setAttribute("stroke-dasharray", `${pReview} ${100 - pReview}`);
    segReview.setAttribute("stroke-dashoffset", "25");
  }
  accumulated += pReview;

  if (segInterview) {
    let offset = (25 - accumulated + 100) % 100;
    segInterview.setAttribute("stroke-dasharray", `${pInterview} ${100 - pInterview}`);
    segInterview.setAttribute("stroke-dashoffset", offset.toFixed(1));
  }
  accumulated += pInterview;

  if (segAssess) {
    let offset = (25 - accumulated + 100) % 100;
    segAssess.setAttribute("stroke-dasharray", `${pAssess} ${100 - pAssess}`);
    segAssess.setAttribute("stroke-dashoffset", offset.toFixed(1));
  }
  accumulated += pAssess;

  if (segReject) {
    let offset = (25 - accumulated + 100) % 100;
    segReject.setAttribute("stroke-dasharray", `${pReject} ${100 - pReject}`);
    segReject.setAttribute("stroke-dashoffset", offset.toFixed(1));
  }
}

// Render upcoming interviews
function renderUpcomingInterviews() {
  const container = document.getElementById("dashboard-interviews-list-container");
  if (!container) return;
  
  if (!state.candidateInterviews || state.candidateInterviews.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted); font-size:0.85rem;">No upcoming interviews scheduled.</div>`;
    return;
  }
  
  container.innerHTML = "";
  state.candidateInterviews.forEach(int => {
    const item = document.createElement("div");
    item.className = "interview-item-card";
    item.innerHTML = `
      <div class="interview-company-logo ${int.typeClass}">${int.logoLetter}</div>
      <div class="interview-details">
        <h5 class="interview-company-name">${int.company}</h5>
        <p class="interview-role-name">${int.role}</p>
        <div class="interview-time-row">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>${int.dateStr}</span>
        </div>
      </div>
      <span class="interview-badge ${int.badgeClass}">${int.badgeText}</span>
    `;
    container.appendChild(item);
  });
}

// Render dedicated interviews page table
function renderInterviewsPage() {
  const body = elements.candidateInterviewsListBody;
  if (!body) return;
  
  body.innerHTML = "";
  const count = state.candidateInterviews ? state.candidateInterviews.length : 0;
  if (elements.candidateInterviewsCountIndicator) {
    elements.candidateInterviewsCountIndicator.textContent = `${count} Scheduled`;
  }
  
  if (count === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">No interviews scheduled.</td>
      </tr>
    `;
    return;
  }
  
  state.candidateInterviews.forEach(int => {
    const row = document.createElement("tr");
    
    const statusClass = int.status === "Scheduled" ? "processing" : "fulfilled";
    const badgeClass = int.status === "Scheduled" ? "badge-indigo" : "badge-emerald";
    
    let actionBtn = "";
    if (int.status === "Scheduled" && int.meetingLink) {
      actionBtn = `<a href="${int.meetingLink}" target="_blank" class="admin-action-btn" style="text-decoration:none; display:inline-block; font-size:0.75rem;">Join Meeting</a>`;
    } else if (int.status === "Scheduled") {
      actionBtn = `<button class="admin-action-btn secondary" onclick="alert('Interview location is ACME office. Details sent via email.')" style="font-size:0.75rem;">View Location</button>`;
    } else {
      actionBtn = `<span style="color:var(--text-muted); font-size:0.8rem;">No action</span>`;
    }
    
    row.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="interview-company-logo ${int.typeClass}" style="width:28px; height:28px; font-size:0.9rem; border-radius:6px;">${int.logoLetter}</div>
          <strong>${int.company}</strong>
        </div>
      </td>
      <td>${int.role}</td>
      <td><strong>${int.dateStr}</strong></td>
      <td><span class="interview-badge ${int.badgeClass}" style="padding: 4px 8px; border-radius: 4px;">${int.badgeText}</span></td>
      <td>${int.interviewer || 'N/A'}</td>
      <td>
        <div class="status-indicator-box">
          <span class="status-dot ${statusClass}"></span>
          <span class="badge ${badgeClass}" style="border:none; padding:0; background:transparent;">${int.status}</span>
        </div>
      </td>
      <td>${actionBtn}</td>
    `;
    
    body.appendChild(row);
  });
}

// Render dedicated applications page table
function renderApplicationsPage() {
  const list = elements.candidateApplicationsPageListBody;
  if (!list) return;
  
  list.innerHTML = "";
  
  // Sync both candidate self-applications and external offers directed to them
  const allApps = [...state.candidateApplications];
  const candId = state.currentUser || "candidate@talentsource.com";
  
  state.requests.forEach(req => {
    if (req.candidateId === "TB-999" || req.candidateId === candId) {
      if (!allApps.some(app => app.requestId === req.id)) {
        allApps.push({
          requestId: req.id,
          jobId: "REQ-INV",
          jobTitle: `${req.candidateRole} (Offer from ${req.client})`,
          model: req.model,
          pricing: req.candidateRate,
          appliedDate: req.submittedDate
        });
      }
    }
  });

  const appsCount = allApps.length;
  if (elements.candidateAppsCountIndicator) {
    elements.candidateAppsCountIndicator.textContent = `${appsCount} Application${appsCount !== 1 ? 's' : ''}`;
  }
  
  if (allApps.length === 0) {
    list.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">
          You haven't applied to any job openings yet. Click "Browse Jobs" to begin.
        </td>
      </tr>
    `;
    return;
  }
  
  allApps.forEach(app => {
    // Get live status from state requests
    const req = state.requests.find(r => r.id === app.requestId);
    const liveStatus = req ? req.status : "In Process";
    
    let computedStatus = app.status || "In Review";
    if (liveStatus === "Fulfilled") {
      computedStatus = "Offer";
    }
    
    let displayStatus = computedStatus;
    let statusClass = "processing";
    let badgeClass = "badge-amber";
    
    if (displayStatus === "Offer") {
      statusClass = "fulfilled";
      badgeClass = "badge-emerald";
      displayStatus = "Offer Received";
    } else if (displayStatus === "Rejected") {
      statusClass = "rejected";
      badgeClass = "badge-rose";
    } else if (displayStatus === "Interview") {
      statusClass = "processing";
      badgeClass = "badge-blue";
    } else if (displayStatus === "Assessment") {
      statusClass = "processing";
      badgeClass = "badge-cyan";
    }
    
    let pricing = "";
    if (app.model === "Permanent") {
      pricing = `$${(app.pricing / 1000).toFixed(0)}k/yr`;
    } else if (app.model === "Resource Augment") {
      pricing = `$${(app.pricing / 1000).toFixed(1)}k/mo`;
    } else {
      pricing = `$${app.pricing}/hr`;
    }
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="font-weight:600; color:var(--accent-indigo);">${app.jobTitle}</td>
      <td><span class="badge ${app.model === 'Permanent' ? 'badge-indigo' : (app.model === 'Resource Augment' ? 'badge-cyan' : 'badge-amber')}">${app.model}</span></td>
      <td>${pricing}</td>
      <td>${app.appliedDate}</td>
      <td>
        <div class="status-indicator-box">
          <span class="status-dot ${statusClass}"></span>
          <span class="badge ${badgeClass}" style="border:none; padding:0; background:transparent;">${displayStatus}</span>
        </div>
      </td>
    `;
    list.appendChild(row);
  });
}

// Render dedicated documents page table (Document Library)
function renderDocumentsPage() {
  const body = elements.candidateDocumentsListBody;
  if (!body) return;
  
  body.innerHTML = "";
  const name = state.candidateProfile.resumeName;
  
  const count = name ? 1 : 0;
  if (elements.candidateDocsCountIndicator) {
    elements.candidateDocsCountIndicator.textContent = `${count} Document${count !== 1 ? 's' : ''}`;
  }
  
  if (!name) {
    body.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">No documents uploaded. Please upload your resume.</td>
      </tr>
    `;
    return;
  }
  
  const ext = name.substring(name.lastIndexOf(".")).toUpperCase() || ".PDF";
  const docType = ext === ".PDF" ? "PDF Document" : (ext === ".DOCX" || ext === ".DOC" ? "Word Document" : "Document");
  
  const size = state.candidateProfile.resumeSize || "2.4 MB";
  const uploadDate = state.candidateProfile.resumeUploadDate || "Jun 01, 2026";
  
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <div style="display:flex; align-items:center; gap:10px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" stroke-width="2" style="flex-shrink:0;">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
        <span style="font-weight:600; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:200px;" title="${name}">${name}</span>
      </div>
    </td>
    <td><span class="badge ${ext === '.PDF' ? 'badge-indigo' : 'badge-cyan'}">${docType}</span></td>
    <td style="color:var(--text-secondary); font-size:0.9rem;">${size}</td>
    <td style="color:var(--text-secondary); font-size:0.9rem;">${uploadDate}</td>
    <td>
      <button class="btn-nav-action remove-doc-btn" style="padding: 4px 10px; font-size: 0.75rem; border-color: var(--accent-rose); color: var(--accent-rose);">Remove</button>
    </td>
  `;
  
  const removeBtn = row.querySelector(".remove-doc-btn");
  removeBtn.addEventListener("click", () => {
    const oldName = state.candidateProfile.resumeName;
    state.candidateProfile.resumeName = "";
    saveCandidateProfile();
    addActivityLog(`Removed resume document <strong>${oldName}</strong>`, "rose", "file");
    renderResumeSection();
    updateProfileCompleteness();
    renderDocumentsPage();
  });
  
  body.appendChild(row);
}

// Render recent activity logs list
function renderActivityTimeline() {
  const container = document.getElementById("dashboard-activity-list-container");
  if (!container) return;
  
  if (!state.candidateActivityLogs || state.candidateActivityLogs.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted); font-size:0.85rem;">No recent activities logged.</div>`;
    return;
  }
  
  container.innerHTML = "";
  state.candidateActivityLogs.forEach(log => {
    let iconSvg = "";
    if (log.icon === "view") {
      iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    } else if (log.icon === "message") {
      iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    } else if (log.icon === "calendar") {
      iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
    } else if (log.icon === "bookmark") {
      iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`;
    } else {
      iconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
    }
    
    const item = document.createElement("div");
    item.className = "activity-timeline-item";
    item.innerHTML = `
      <div class="activity-icon-box timeline-${log.type}">
        ${iconSvg}
      </div>
      <div class="activity-details">
        <p class="activity-text">${log.text}</p>
        <span class="activity-time">${log.time}</span>
      </div>
    `;
    container.appendChild(item);
  });
}

// Recommended jobs catalog data
const recommendedJobsData = [
  { id: "REC-001", role: "Product Designer", company: "Shopify", location: "Remote", logoText: "S", logoClass: "logo-shopify" },
  { id: "REC-002", role: "UX Designer", company: "Notion", location: "San Francisco, CA", logoText: "N", logoClass: "logo-notion" },
  { id: "REC-003", role: "Product Designer", company: "Meta", location: "Menlo Park, CA", logoText: "M", logoClass: "logo-meta" }
];

// Render recommended jobs with interactive saved bookmarks toggles
function renderRecommendedJobs() {
  const listContainer = document.querySelector(".recommended-jobs-list");
  if (!listContainer) return;
  
  listContainer.innerHTML = "";
  recommendedJobsData.forEach(job => {
    const isBookmarked = state.candidateSavedJobs && state.candidateSavedJobs.includes(job.id);
    const card = document.createElement("div");
    card.className = "recommend-job-card";
    
    card.innerHTML = `
      <div class="recommend-job-logo ${job.logoClass}">${job.logoText}</div>
      <div class="recommend-job-info">
        <h5 class="recommend-job-title">${job.role}</h5>
        <p class="recommend-job-meta">${job.company} &bull; ${job.location}</p>
      </div>
      <button class="recommend-bookmark-btn" aria-label="Bookmark job" style="background:transparent; border:none; color:${isBookmarked ? 'var(--accent-amber)' : 'var(--text-muted)'}; cursor:pointer;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
      </button>
    `;
    
    const btn = card.querySelector(".recommend-bookmark-btn");
    btn.addEventListener("click", () => {
      toggleBookmark(job.id);
    });
    
    listContainer.appendChild(card);
  });
}

// Toggle job bookmark state
function toggleBookmark(jobId) {
  if (!state.candidateSavedJobs) state.candidateSavedJobs = [];
  const index = state.candidateSavedJobs.indexOf(jobId);
  
  if (index === -1) {
    state.candidateSavedJobs.push(jobId);
    const job = recommendedJobsData.find(j => j.id === jobId) || mockOpeningsData.find(j => j.id === jobId);
    const title = job ? job.role : "job";
    const comp = job ? job.company : "";
    addActivityLog(`Saved <strong>${title}</strong> ${comp ? `at ${comp}` : ""} to bookmarks`, "amber", "bookmark");
  } else {
    state.candidateSavedJobs.splice(index, 1);
  }
  
  localStorage.setItem("ai_sourcing_candidate_saved_jobs", JSON.stringify(state.candidateSavedJobs));
  renderCandidateDashboard();
  renderCandidateOpenings();
}

// Write activity log entries
function addActivityLog(text, type = "indigo", icon = "file") {
  if (!state.candidateActivityLogs) state.candidateActivityLogs = [];
  
  state.candidateActivityLogs.unshift({
    text: text,
    time: "Just now",
    type: type,
    icon: icon
  });
  
  if (state.candidateActivityLogs.length > 8) {
    state.candidateActivityLogs.pop();
  }
  
  localStorage.setItem("ai_sourcing_candidate_activity_logs", JSON.stringify(state.candidateActivityLogs));
}

// Compute quality scores and audit recommendations
function runAiProfileAnalyzer() {
  const profile = state.candidateProfile;
  const panel = elements.analyzerResultsPanel;
  
  if (!panel) return;
  
  panel.classList.remove("hidden");
  
  let count = 0;
  const fields = ['firstName', 'lastName', 'country', 'state', 'city', 'ctcFixed', 'ctcVar', 'expectedCtc', 'noticePeriod', 'resumeName'];
  fields.forEach(f => {
    if (profile[f]) count++;
  });
  if (profile.educations && profile.educations.length > 0 && profile.educations.every(e => e.degree && e.passingYear && e.institute)) {
    count += 3;
  }
  if (profile.jobs && profile.jobs.length > 0) count += 2;
  
  const score = Math.round((count / (fields.length + 5)) * 100);
  
  elements.analyzerScoreBadge.textContent = `${score}% Match`;
  
  if (score >= 85) {
    elements.analyzerScoreBadge.className = "badge badge-emerald";
    elements.analyzerTextAnalysis.innerHTML = `
      Your profile quality rating is <strong>Outstanding</strong>! Vetted business clients looking for candidates will see you with a high matchmaking compatibility rate. Your compensation targets align perfectly with current platform ranges. Keep your work history blocks updated.
    `;
  } else if (score >= 60) {
    elements.analyzerScoreBadge.className = "badge badge-indigo";
    elements.analyzerTextAnalysis.innerHTML = `
      Your profile quality rating is <strong>Good</strong>. Adding historical job blocks detailing previous responsibilities and reasons for leaving, or completing location attributes, will boost your matching eligibility by up to 20%.
    `;
  } else {
    elements.analyzerScoreBadge.className = "badge badge-amber";
    elements.analyzerTextAnalysis.innerHTML = `
      Your profile quality rating is <strong>Incomplete</strong>. Please complete the Update Details forms and ensure you have added at least one employment history block so our automated sourcing engines can index your profile correctly.
    `;
  }
}

// Render AD6: View Sourced CVs Directory
function renderAdminCVSourced() {
  const container = elements.adminCVSourcedListBody;
  if (!container) return;

  if (state.isSourcing) {
    return;
  }

  container.innerHTML = "";

  const searchVal = (elements.cvSourcedSearch?.value || "").toLowerCase().trim();
  const filterStatus = elements.cvSourcedFilterStatus?.value || "all";
  const sortBy = elements.cvSourcedSortBy?.value || "name-asc";

  const externalList = (state.sourcedSearchResults || [])
    .filter(cand => !candidatesData.some(c => c.id === cand.id))
    .map(cand => {
      return {
        ...cand,
        status: state.candidateStatuses[cand.id] || "Sourced"
      };
    });

  let list = candidatesData.map(cand => {
    const mock = candidateMockDetails[cand.id] || { name: `Candidate #${cand.id.replace('TB-', 'AIS-')}`, company: "N/A" };
    const status = state.candidateStatuses[cand.id] || "Sourced";
    return {
      ...cand,
      name: mock.name,
      company: mock.company,
      status: status,
      isVetted: true
    };
  });

  list = list.concat(externalList);

  if (searchVal) {
    list = list.filter(c => 
      c.name.toLowerCase().includes(searchVal) ||
      c.role.toLowerCase().includes(searchVal) ||
      c.company.toLowerCase().includes(searchVal) ||
      c.id.toLowerCase().includes(searchVal)
    );
  }

  if (filterStatus !== "all") {
    list = list.filter(c => c.status === filterStatus);
  }

  list.sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "position-asc") {
      return a.role.localeCompare(b.role);
    } else if (sortBy === "experience-desc") {
      return b.experience - a.experience;
    }
    return 0;
  });

  if (elements.adminCVSourcedCountIndicator) {
    elements.adminCVSourcedCountIndicator.textContent = `${list.length} Candidate${list.length !== 1 ? 's' : ''}`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">No candidates match your criteria.</td>
      </tr>
    `;
    return;
  }

  list.forEach(c => {
    const row = document.createElement("tr");

    const email = c.email || (c.name.toLowerCase().replace(/\s+/g, ".") + "@example.com");
    const rawId = c.id.replace(/\D/g, "") || "999";
    const phone = c.mobile || `+9198000${rawId}01`;
    const whatsappPhone = phone.replace(/\D/g, "");

    const statuses = [
      "Sourced", "Submitted", "L1 Scheduled", "L1 Select", 
      "L2 Scheduled", "L2 Select", "L3 Scheduled", "L3 Select", 
      "Offered", "Joined", "Rejected"
    ];
    const optionsHtml = statuses.map(s => `
      <option value="${s}" ${c.status === s ? 'selected' : ''}>${s}</option>
    `).join("");

    const timeline = state.statusTimelines[c.id] || [];
    const latestEvent = timeline[timeline.length - 1] || { status: c.status, timestamp: Date.now() };
    const latestStatusText = latestEvent.status;
    const timeAgo = getRelativeTime(latestEvent.timestamp);
    const timelineDisplay = `${latestStatusText} (${timeAgo})`;

    let sourceBadge = "";
    if (c.source) {
      const sourceKey = c.source.toLowerCase();
      const integ = state.integrations[sourceKey];
      const name = integ ? integ.name.split(" ")[0] : c.source;
      const color = sourceKey === "linkedin" ? "#0a66c2" : (sourceKey === "naukri" ? "#0d6efd" : (sourceKey === "timesjobs" ? "#ffc107" : "var(--accent-indigo)"));
      sourceBadge = `<span class="badge" style="font-size:0.65rem; padding: 2px 6px; background: ${color}1A; color: ${color}; border: 1px solid ${color}33; margin-left: 8px;">${name}</span>`;
    } else {
      sourceBadge = `<span class="badge" style="font-size:0.65rem; padding: 2px 6px; background: rgba(99, 102, 241, 0.1); color: var(--accent-indigo); border: 1px solid rgba(99, 102, 241, 0.2); margin-left: 8px;">Vetted</span>`;
    }

    const assignment = state.assignments[c.id];
    let assignHtml = "";
    if (assignment) {
      assignHtml = `
        <div style="font-size:0.85rem; line-height:1.4;">
          <strong style="color: var(--text-primary);">${assignment.recruiter}</strong><br>
          <span style="font-size:0.75rem; color:var(--text-muted)">${assignment.company}</span><br>
          <a href="#" style="font-size:0.75rem; color:var(--accent-indigo); font-weight:600;" onclick="event.preventDefault(); openAssignRecruiterModal('${c.id}')">Reassign</a>
        </div>
      `;
    } else {
      assignHtml = `
        <button class="btn-nav-action primary" style="padding: 6px 12px; font-size: 0.8rem; cursor: pointer; border-radius: var(--radius-sm);" onclick="event.preventDefault(); openAssignRecruiterModal('${c.id}')">Assign</button>
      `;
    }

    const isInTalentPool = candidatesData.some(v => v.id === c.id);
    let poolHtml = "";
    if (isInTalentPool) {
      poolHtml = `
        <span class="badge badge-emerald" style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; font-weight: 600; font-size: 0.85rem; background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-sm);">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Added
        </span>
      `;
    } else {
      poolHtml = `
        <button class="btn-nav-action primary" style="padding: 6px 12px; font-size: 0.8rem; cursor: pointer; border-radius: var(--radius-sm); background: linear-gradient(135deg, var(--accent-indigo), var(--accent-purple)); border: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;" onclick="event.preventDefault(); importToTalentPool('${c.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Pool
        </button>
      `;
    }

    row.innerHTML = `
      <td style="font-weight: 600; color: var(--accent-indigo);">${c.id.replace('TB-', 'AIS-')}</td>
      <td>
        <div style="display:flex; align-items:center;">
          <a href="#" class="candidate-name-link" data-id="${c.id}" style="color: var(--text-primary); font-weight: 600; text-decoration: none; border-bottom: 1px dashed var(--accent-indigo); transition: var(--transition-smooth); cursor: pointer;">${c.name}</a>
          ${sourceBadge}
        </div>
      </td>
      <td><strong>${c.role}</strong></td>
      <td>${c.company}</td>
      <td>
        <div style="display: flex; gap: 8px; align-items: center;">
          <a href="#" class="contact-action-icon" title="Email: ${email}" onclick="event.preventDefault(); openEmailComposer('${c.id}', '${email}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="tel:${phone}" class="contact-action-icon" title="Call: ${phone}" onclick="logContactAction('${c.id}', 'Phone')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <a href="sms:${phone}" class="contact-action-icon" title="SMS: ${phone}" onclick="logContactAction('${c.id}', 'SMS')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </a>
          <a href="https://wa.me/${whatsappPhone}" target="_blank" class="contact-action-icon whatsapp" title="WhatsApp: +${whatsappPhone}" onclick="logContactAction('${c.id}', 'WhatsApp')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>
        </div>
      </td>
      <td>
        <a href="#" class="status-timeline-link" data-id="${c.id}" style="color: var(--accent-indigo); font-weight: 600; text-decoration: none; border-bottom: 1px dashed var(--accent-indigo); transition: var(--transition-smooth); cursor: pointer;" title="View Status Timeline History">
          ${timelineDisplay}
        </a>
      </td>
      <td>
        <select class="form-input" style="margin-top: 0; padding: 6px 12px; font-size: 0.85rem; width: auto; background: var(--bg-glass);" onchange="updateCVSourcedStatus('${c.id}', this.value)">
          ${optionsHtml}
        </select>
      </td>
      <td>${assignHtml}</td>
      <td>${poolHtml}</td>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll(".candidate-name-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.id;
      showCandidateProfileModal(id);
    });
  });

  container.querySelectorAll(".status-timeline-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.id;
      state.activeTimelineCandidateId = id;
      navigateTo("admin-status-timeline");
    });
  });
}

// Show detailed candidate profile popup modal
function showCandidateProfileModal(candidateId) {
  let cand = candidatesData.find(c => c.id === candidateId);
  let mock;
  if (!cand) {
    cand = (state.sourcedSearchResults || []).find(c => c.id === candidateId);
    if (!cand) return;
    mock = { name: cand.name, company: cand.company };
  } else {
    mock = candidateMockDetails[candidateId] || { name: `Candidate #${candidateId.replace('TB-', 'AIS-')}`, company: "N/A" };
  }
  const status = state.candidateStatuses[candidateId] || "Sourced";

  const modal = elements.candidateDetailModal;
  const body = elements.candidateModalBody;

  if (!modal || !body) return;

  // Generate detailed deterministic contact and experience fields
  const rawId = cand.id.replace(/\D/g, "") || "999";
  const phone = cand.mobile || `+91 98000 ${rawId}01`;
  const email = cand.email || `${mock.name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
  
  const totalExp = `${cand.experience} Years`;
  const relExp = `${Math.max(1, cand.experience - (cand.experience > 4 ? 2 : 1))} Years`;
  
  let currentCtc = "Negotiable";
  let expectedCtc = "Negotiable";
  if (cand.annualSalary) {
    const fixed = Math.round(cand.annualSalary * 0.85);
    const variable = Math.round(cand.annualSalary * 0.15);
    currentCtc = `$${fixed.toLocaleString()} Fixed + $${variable.toLocaleString()} Var`;
    expectedCtc = `$${Math.round(cand.annualSalary * 1.25).toLocaleString()}/yr`;
  } else if (cand.hourlyRate) {
    currentCtc = `$${cand.hourlyRate}/hr`;
    expectedCtc = `$${Math.round(cand.hourlyRate * 1.2)}/hr`;
  }
  
  const noticePeriod = cand.availability;
  
  const locationsMap = {
    "TB-101": { cur: "Bengaluru, KA", client: "Bengaluru, Hybrid" },
    "TB-102": { cur: "Mumbai, MH", client: "Mumbai, On-site" },
    "TB-103": { cur: "Pune, MH", client: "Remote / Pune" },
    "TB-104": { cur: "Chennai, TN", client: "Chennai, On-site" },
    "TB-105": { cur: "Hyderabad, TS", client: "Hyderabad, Hybrid" },
    "TB-106": { cur: "Noida, UP", client: "Noida, Hybrid" },
    "TB-107": { cur: "Kolkata, WB", client: "Kolkata / Remote" },
    "TB-108": { cur: "Bengaluru, KA", client: "Bengaluru, On-site" },
    "TB-109": { cur: "Gurugram, HR", client: "Gurugram, On-site" },
    "TB-110": { cur: "Pune, MH", client: "Pune, Hybrid" },
    "TB-111": { cur: "Hyderabad, TS", client: "Hyderabad, Hybrid" },
    "TB-112": { cur: "Mumbai, MH", client: "Mumbai, On-site" },
    "TB-113": { cur: "Bengaluru, KA", client: "Bengaluru, Hybrid" },
    "TB-114": { cur: "Noida, UP", client: "Noida, On-site" },
    "TB-115": { cur: "Mumbai, MH", client: "Mumbai, Hybrid" }
  };
  const locs = locationsMap[cand.id] || { cur: "Bengaluru, KA", client: "Remote" };
  const currentLocation = locs.cur;
  const clientLocation = locs.client;
  
  const birthYear = 2026 - (21 + cand.experience);
  const dob = `12-May-${birthYear}`;
  
  const ssc = `92% (CBSE, ${birthYear + 16})`;
  const hsc = `88% (CBSE, ${birthYear + 18})`;
  
  let graduation = cand.education;
  let postGraduation = "N/A";
  if (cand.education.includes("M.S.") || cand.education.includes("M.B.A.") || cand.education.includes("Ph.D.")) {
    graduation = "B.S. in Computer Science";
    postGraduation = cand.education;
  }

  // Skills tags
  const skillsHtml = cand.skills.map(s => `
    <span class="candidate-skill-tag" style="background: rgba(99, 102, 241, 0.08); color: var(--accent-indigo); padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 500;">${s}</span>
  `).join("");

  body.innerHTML = `
    <div class="modal-candidate-header">
      <div>
        <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${mock.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Candidate ID: <span style="color: var(--accent-indigo); font-weight: 600;">${cand.id.replace('TB-', 'AIS-')}</span> &bull; Current Company: <strong>${mock.company}</strong></p>
      </div>
      <span class="badge badge-indigo" style="font-size: 0.75rem; text-transform: uppercase;">${status}</span>
    </div>

    <!-- SOURCING MATRIX GRID -->
    <div class="modal-section-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-indigo);"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line></svg>
      <span>Sourcing & Profile Information</span>
    </div>
    <div class="glass-panel" style="padding: 20px; margin-bottom: 20px; background: rgba(255, 255, 255, 0.01); border: 1px solid var(--border-glass);">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; font-size: 0.85rem; line-height: 1.6;">
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Candidate Name</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${mock.name}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Mobile Number</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${phone}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Email ID</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-all;">${email}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Total Experience</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${totalExp}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Relevant Experience</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${relExp}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Current Company</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${mock.company}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Current CTC (F+V)</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${currentCtc}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Expected CTC</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${expectedCtc}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Notice Period</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${noticePeriod}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Current Location</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${currentLocation}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Client Location</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${clientLocation}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Date of Birth (DOB)</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${dob}</strong>
        </div>
      </div>
    </div>

    <!-- BIO -->
    <div class="modal-section-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-indigo);"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      <span>Professional Bio</span>
    </div>
    <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6; margin-bottom: 20px; background: rgba(255, 255, 255, 0.01); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">${cand.bio}</p>

    <!-- COMPETENCIES -->
    <div class="modal-section-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-indigo);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      <span>Technical Competencies</span>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
      ${skillsHtml}
    </div>

    <!-- EDUCATION MATRIX -->
    <div class="modal-section-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-indigo);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
      <span>Education & Qualifications</span>
    </div>
    <div class="glass-panel" style="padding: 20px; margin-bottom: 24px; background: rgba(255, 255, 255, 0.01); border: 1px solid var(--border-glass);">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; font-size: 0.85rem; line-height: 1.6;">
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">SSC (10th)</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${ssc}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">HSC (12th)</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${hsc}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Graduation</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${graduation}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 6px; padding-right: 12px; align-items: baseline;">
          <span style="color: var(--text-secondary); font-weight: 500; white-space: nowrap;">Post Graduation</span>
          <strong style="color: var(--text-primary); text-align: right; word-break: break-word;">${postGraduation}</strong>
        </div>
      </div>
    </div>

    <!-- SHARING ACTIONS AT THE BOTTOM -->
    <div class="modal-section-title" style="margin-top: 24px; border-top: 1px solid var(--border-glass); padding-top: 16px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-indigo);"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
      <span>Share Sourcing Sheet</span>
    </div>
    <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 12px;">
      <button class="btn-nav-action secondary" onclick="shareCandidateProfile('${cand.id}', 'Email')" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; padding: 10px 18px; height: 40px; cursor: pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Send via Email
      </button>
      <button class="btn-nav-action secondary" onclick="shareCandidateProfile('${cand.id}', 'WhatsApp')" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; padding: 10px 18px; height: 40px; border-color: rgba(16, 185, 129, 0.3); color: #10b981; cursor: pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        Send via WhatsApp
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
}

// Global hook to transition candidate funnel status in real-time
window.updateCVSourcedStatus = function(candidateId, newStatus) {
  state.candidateStatuses[candidateId] = newStatus;
  
  // Sync request status if a request exists for this candidate
  const req = state.requests.find(r => r.candidateId === candidateId && r.status === "In Process");
  if (req) {
    if (newStatus === "Joined") {
      req.status = "Fulfilled";
      addAdminLog(`Placement request ${req.id} fulfilled automatically because candidate joined`, "success");
      saveRequestsToStorage();
    } else if (newStatus === "Rejected") {
      req.status = "Rejected";
      addAdminLog(`Placement request ${req.id} rejected because candidate was rejected`, "warning");
      saveRequestsToStorage();
    }
  }
  
  saveCandidateStatuses();

  // Find candidate name
  const name = (candidateMockDetails[candidateId] && candidateMockDetails[candidateId].name) || `Candidate #${candidateId.replace('TB-', 'AIS-')}`;
  addAdminLog(`Transitioned status of ${name} to ${newStatus}`, "system");

  renderAdminCVSourced();
  renderAdminDashboard();
};

// Global hook to log contact action events
window.logContactAction = function(candidateId, method) {
  const name = (candidateMockDetails[candidateId] && candidateMockDetails[candidateId].name) || `Candidate #${candidateId.replace('TB-', 'AIS-')}`;
  addAdminLog(`Initiated communication with ${name} via ${method}`, "info");
  
  // Also alert user dynamically
  alert(`Simulating contact with ${name} via ${method}...`);
};

// Global hook to import candidate to vetted Talent Pool
window.importToTalentPool = function(candidateId) {
  let cand = (state.sourcedSearchResults || []).find(c => c.id === candidateId);
  if (!cand) {
    cand = externalMockPool.find(c => c.id === candidateId);
  }

  if (!cand) {
    alert("Candidate not found.");
    return;
  }

  if (candidatesData.some(c => c.id === candidateId)) {
    alert("Candidate is already in the talent pool.");
    return;
  }

  const newVettedCandidate = {
    id: cand.id,
    role: cand.role,
    skills: cand.skills || [],
    experience: cand.experience || 0,
    hourlyRate: cand.hourlyRate || Math.floor(60 + Math.random() * 40),
    annualSalary: cand.annualSalary || Math.floor(100000 + Math.random() * 50000),
    education: cand.education || "B.S. Computer Science",
    availability: cand.availability || "Immediate",
    bio: cand.bio || `Imported talent from ${cand.source || 'API Integration'}. Specialist in ${cand.role}.`,
    matchRating: cand.matchRating || Math.floor(80 + Math.random() * 19),
    source: cand.source
  };

  candidatesData.push(newVettedCandidate);

  candidateMockDetails[cand.id] = {
    name: cand.name,
    company: cand.company || "N/A"
  };

  saveImportedCandidates();

  if (!state.candidateStatuses[cand.id]) {
    state.candidateStatuses[cand.id] = "Sourced";
    saveCandidateStatuses();
  }
  if (!state.statusTimelines[cand.id] || state.statusTimelines[cand.id].length === 0) {
    state.statusTimelines[cand.id] = seedTimelineForCandidate(cand.id);
    saveStatusTimelines();
  }

  addAdminLog(`Imported external candidate ${cand.name} (${cand.id}) into Talent Pool`, "success");

  renderAdminCVSourced();
  renderAdminTalentPool();
  renderAdminDashboard();
  
  alert(`${cand.name} has been successfully added to the Talent Pool!`);
};

// Global hook to open email composer modal
window.openEmailComposer = function(candidateId, emailAddress) {
  const cand = candidatesData.find(c => c.id === candidateId);
  if (!cand) return;
  
  const mock = candidateMockDetails[candidateId] || { name: `Candidate #${candidateId.replace('TB-', 'AIS-')}`, company: "N/A" };
  const name = mock.name;
  
  // Register candidate details in form
  elements.emailCandidateId.value = candidateId;
  elements.emailToAddress.value = emailAddress || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
  elements.emailSubject.value = `Exciting Career Opportunity - Sourcing for ${cand.role} Role`;
  
  // Set default email body message
  elements.emailBody.value = `Hi ${name},\n\nI hope this email finds you well.\n\nWe have reviewed your profile for the ${cand.role} opportunity. Your experience of ${cand.experience} years, background in key skills (${cand.skills.join(', ')}), and previous experience at ${mock.company} make you an excellent fit for several requirements currently managed on the AI Sourcing platform.\n\nWe would love to schedule a brief introductory call to discuss the opportunities we have available. Please let us know your availability.\n\nBest regards,\nPlatform Sourcing Team\nAI Sourcing`;

  // Reset attachment fields
  elements.emailJdAttachment.value = "";
  elements.emailAttachmentPreviewPanel.classList.add("hidden");
  
  // Display the modal
  elements.emailComposerModal.classList.remove("hidden");
};

// Global hook to open assign recruiter modal
window.openAssignRecruiterModal = function(candidateId) {
  const cand = candidatesData.find(c => c.id === candidateId);
  if (!cand) return;
  
  const mock = candidateMockDetails[candidateId] || { name: `Candidate #${candidateId.replace('TB-', 'AIS-')}`, company: "N/A" };
  const name = mock.name;
  
  elements.assignCandidateId.value = candidateId;
  elements.assignCandidateNameDisplay.textContent = name;
  
  // Pre-fill existing assignment if it exists
  const existing = state.assignments[candidateId];
  if (existing) {
    elements.assignRecruiterSelect.value = existing.recruiter;
    elements.assignCompanySelect.value = existing.company;
  } else {
    elements.assignRecruiterSelect.value = "";
    elements.assignCompanySelect.value = "";
  }
  
  elements.assignRecruiterModal.classList.remove("hidden");
};

// Global hook to share candidate sourcing sheet profile
window.shareCandidateProfile = function(candidateId, method) {
  const cand = candidatesData.find(c => c.id === candidateId);
  if (!cand) return;
  
  const mock = candidateMockDetails[candidateId] || { name: `Candidate #${candidateId.replace('TB-', 'AIS-')}`, company: "N/A" };
  const name = mock.name;
  
  // Close candidate detail modal
  if (elements.candidateDetailModal) {
    elements.candidateDetailModal.classList.add("hidden");
  }
  
  const sheetName = `${candidateId.replace('TB-', 'AIS-')}_Sourcing_Sheet.pdf`;
  
  if (method === "Email") {
    // Open email composer prefilled with sourcing sheet
    if (elements.emailComposerModal) {
      elements.emailCandidateId.value = candidateId;
      // Default recipient to HR contact at candidate's company
      elements.emailToAddress.value = `hr@${mock.company.toLowerCase().replace(/\s+/g, "")}.com`; 
      elements.emailSubject.value = `Sourcing Profile Sheet - ${name} (${cand.role})`;
      
      elements.emailBody.value = `Hi Sourcing Team,\n\nHope you are doing well.\n\nPlease find attached the detailed Sourcing Profile Sheet for candidate ${name} (${cand.role}) for your review.\n\nBest regards,\nPlatform Admin\nAI Sourcing`;
      
      // Setup dynamic attachment
      if (elements.emailJdAttachment) {
        elements.emailJdAttachment.value = ""; // No opening JD dropdown selection
      }
      elements.emailAttachmentFilename.textContent = sheetName;
      elements.emailAttachmentPreviewPanel.classList.remove("hidden");
      
      elements.emailComposerModal.classList.remove("hidden");
    }
  } else if (method === "WhatsApp") {
    // Log WhatsApp action
    addAdminLog(`Shared candidate profile sheet for ${name} via WhatsApp`, "info");
    
    // Simulate WhatsApp transfer
    alert(`Simulating WhatsApp transfer...\n\nRecipient: Client Hiring Team\nDocument Sent: ${sheetName}\nCandidate: ${name}\nRole: ${cand.role}`);
  }
};

// Render AD7: View Status Timeline Page
function renderAdminStatusTimeline() {
  const container = elements.adminStatusTimelineBody;
  if (!container) return;
  
  const candidateId = state.activeTimelineCandidateId;
  if (!candidateId) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 40px;">No candidate selected.</div>`;
    return;
  }
  
  const cand = candidatesData.find(c => c.id === candidateId);
  const mock = candidateMockDetails[candidateId] || { name: `Candidate #${candidateId.replace('TB-', 'AIS-')}`, company: "N/A" };
  const currentStatus = state.candidateStatuses[candidateId] || "Sourced";
  const timeline = state.statusTimelines[candidateId] || [];
  
  // Update title & subtitle dynamically
  if (elements.adminStatusTimelineTitle) {
    elements.adminStatusTimelineTitle.textContent = `Status Timeline - ${mock.name}`;
  }
  if (elements.adminStatusTimelineSubtitle) {
    elements.adminStatusTimelineSubtitle.innerHTML = `Candidate ID: <strong style="color: var(--accent-indigo);">${candidateId.replace('TB-', 'AIS-')}</strong> &bull; Role: <strong>${cand.role}</strong> &bull; Current Company: <strong>${mock.company}</strong>`;
  }
  
  if (timeline.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 40px;">No timeline history found for this candidate.</div>`;
    return;
  }
  
  const statusColors = {
    "Sourced": "var(--accent-indigo)",
    "Submitted": "#06b6d4",
    "L1 Scheduled": "#f59e0b",
    "L1 Select": "#10b981",
    "L2 Scheduled": "#f59e0b",
    "L2 Select": "#10b981",
    "L3 Scheduled": "#f59e0b",
    "L3 Select": "#10b981",
    "Offered": "#8b5cf6",
    "Joined": "#10b981",
    "Rejected": "#ef4444"
  };
  
  let html = `
    <div class="glass-panel" style="padding: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-glass); background: rgba(255,255,255,0.01);">
      <div>
        <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0;">${mock.name}</h4>
        <p style="color: var(--text-muted); font-size: 0.8rem; margin: 4px 0 0 0;">
          Experience: <strong>${cand.experience} Years</strong> &bull; Contact: <strong>${mock.name.toLowerCase().replace(/\s+/g, ".") + "@example.com"}</strong>
        </p>
      </div>
      <div>
        <span class="badge badge-indigo" style="font-size: 0.8rem; padding: 6px 12px; text-transform: uppercase;">Current Status: ${currentStatus}</span>
      </div>
    </div>

    <div style="position: relative; border-left: 2px solid var(--border-glass); margin-left: 24px; padding-left: 32px; padding-top: 10px; padding-bottom: 10px;">
  `;
  
  timeline.forEach((event, idx) => {
    const isLatest = idx === timeline.length - 1;
    const statusColor = statusColors[event.status] || "var(--accent-indigo)";
    const dateObj = new Date(event.timestamp);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = dateObj.toLocaleDateString('en-IN', options).replace(/,([^,]*)$/, ' $1');
    const relativeTime = getRelativeTime(event.timestamp);
    const glowColor = statusColor.startsWith("var") ? "rgba(99, 102, 241, 0.1)" : `${statusColor}1A`;
    
    html += `
      <div style="position: relative; margin-bottom: 24px;">
        <div style="position: absolute; left: -43px; top: 8px; width: 20px; height: 20px; border-radius: 50%; background: var(--bg-card); border: 4px solid ${statusColor}; box-shadow: ${isLatest ? '0 0 0 5px ' + glowColor : 'none'}; display: flex; align-items: center; justify-content: center; z-index: 2;">
          ${isLatest ? `<span style="width: 6px; height: 6px; border-radius: 50%; background: ${statusColor};"></span>` : ''}
        </div>
        
        <div class="glass-panel" style="padding: 16px 20px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-glass); border-radius: var(--radius-md); transition: var(--transition-smooth);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <span style="font-weight: 700; color: ${statusColor}; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">${event.status}</span>
            <span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 500;">${formattedDate} (${relativeTime})</span>
          </div>
          <div style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">
            <div style="margin-bottom: 6px;">Updated by: <strong style="color: var(--text-primary);">${event.user}</strong></div>
            <p style="margin: 6px 0 0 0; color: var(--text-secondary); font-style: italic; background: rgba(0,0,0,0.1); padding: 8px 12px; border-left: 3px solid ${statusColor}; border-radius: 2px;">
              ${event.notes}
            </p>
          </div>
        </div>
      </div>
    `;
  });
  
  html += `
    </div>
  `;
  
  container.innerHTML = html;
}

// Sourcing API integrations search execution
window.executeSourcingSearch = function(queryText) {
  const container = elements.adminCVSourcedListBody;
  if (!container) return;

  const query = (queryText || "").toLowerCase().trim();
  if (!query) {
    state.sourcedSearchResults = [];
    saveIntegrations();
    renderAdminCVSourced();
    return;
  }

  // Determine active integrations
  const activeIntegrations = [];
  for (const key in state.integrations) {
    if (state.integrations[key].active) {
      activeIntegrations.push({ key: key, name: state.integrations[key].name });
    }
  }
  state.customIntegrations.forEach(ci => {
    if (ci.active) {
      activeIntegrations.push({ key: ci.id, name: ci.name, isCustom: true });
    }
  });

  if (activeIntegrations.length === 0) {
    state.sourcedSearchResults = [];
    saveIntegrations();
    renderAdminCVSourced();
    return;
  }

  let step = 0;
  state.isSourcing = true;

  const messages = [
    "Initializing secure API gateways...",
    ...activeIntegrations.map(ai => `Querying active endpoint: ${ai.name}...`),
    "Retrieving matched candidate records...",
    "Synthesizing profiles into Sourcing Pipeline..."
  ];

  container.innerHTML = `
    <tr>
      <td colspan="7" style="text-align: center; padding: 60px;">
        <div class="spinner-container" style="display: flex; flex-direction: column; align-items: center; gap: 16px; justify-content: center;">
          <div class="loader-spinner"></div>
          <span style="font-size: 0.95rem; color: var(--text-secondary); font-weight: 500;" id="search-progress-message">Initializing API search...</span>
        </div>
      </td>
    </tr>
  `;

  const progressMsgElement = document.getElementById("search-progress-message");

  function nextStep() {
    if (step < messages.length) {
      if (progressMsgElement) {
        progressMsgElement.textContent = messages[step];
      }
      step++;
      setTimeout(nextStep, 250);
    } else {
      const results = [];
      
      externalMockPool.forEach(c => {
        const isChannelActive = state.integrations[c.source]?.active;
        if (isChannelActive) {
          const matchQuery = 
            c.name.toLowerCase().includes(query) ||
            c.role.toLowerCase().includes(query) ||
            c.skills.some(s => s.toLowerCase().includes(query)) ||
            c.company.toLowerCase().includes(query);
          
          if (matchQuery) {
            results.push({ ...c });
          }
        }
      });

      state.customIntegrations.forEach(ci => {
        if (ci.active) {
          const normalizedName = ci.name.replace(/\s+/g, "");
          const candidateName = `Alex ${ci.name.split(" ")[0]} (Sourced)`;
          
          results.push({
            id: `EXT-CUST-${ci.id.substring(5,9)}-${Math.floor(100 + Math.random()*900)}`,
            name: candidateName,
            role: query.charAt(0).toUpperCase() + query.slice(1) + " Specialist",
            skills: [query.charAt(0).toUpperCase() + query.slice(1), "Custom API Integration"],
            experience: 5,
            company: `${ci.name} Talent Network`,
            email: `alex@${normalizedName.toLowerCase()}.com`,
            mobile: "+1 555-0199",
            source: "indeed",
            customSourceLabel: ci.name,
            availability: "Immediate"
          });
        }
      });

      state.sourcedSearchResults = results;
      
      results.forEach(c => {
        if (!state.candidateStatuses[c.id]) {
          state.candidateStatuses[c.id] = "Sourced";
        }
        if (!state.statusTimelines[c.id]) {
          state.statusTimelines[c.id] = [{
            status: "Sourced",
            timestamp: Date.now() - 3600000,
            user: "API Integration Gateway",
            notes: `Candidate profile automatically fetched from active portal API`
          }];
        }
      });

      saveCandidateStatuses();
      saveStatusTimelines();
      saveIntegrations();
      
      state.isSourcing = false;
      renderAdminCVSourced();
      
      addAdminLog(`Sourced ${results.length} candidate profiles from active API channels for query: "${query}"`, "info");
    }
  }

  setTimeout(nextStep, 100);
};

// Render AD8: API Integrations Page
function renderAdminIntegrations() {
  const container = document.getElementById("integrations-list-container");
  if (!container) return;

  container.innerHTML = "";

  for (const key in state.integrations) {
    const integ = state.integrations[key];
    const card = document.createElement("div");
    card.className = "glass-panel";
    card.style.padding = "20px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    card.style.border = "1px solid var(--border-glass)";
    card.style.background = "rgba(255, 255, 255, 0.02)";
    card.style.borderRadius = "var(--radius-md)";

    const statusBadge = integ.active 
      ? `<span class="badge badge-emerald" style="font-size:0.75rem;">Active</span>` 
      : `<span class="badge badge-amber" style="font-size:0.75rem;">Inactive</span>`;

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          ${integ.logo}
          <strong style="color:var(--text-primary); font-size:1rem;">${integ.name}</strong>
        </div>
        ${statusBadge}
      </div>
      <p style="color:var(--text-muted); font-size:0.8rem; line-height:1.4; margin-bottom:16px;">${integ.description}</p>
      
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:auto;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <label style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);">API Key</label>
          <input type="password" class="form-input" style="margin-top:0; font-size:0.8rem; background:rgba(0,0,0,0.1);" placeholder="Enter API Key..." value="${integ.apiKey || ''}" onchange="updateIntegrationKey('${key}', this.value)">
        </div>
        
        <div style="display:flex; justify-content:flex-end; margin-top:6px;">
          <button class="btn-nav-action ${integ.active ? 'secondary' : 'primary'}" style="padding: 6px 14px; font-size:0.75rem; cursor:pointer;" onclick="toggleIntegrationActive('${key}')">
            ${integ.active ? 'Deactivate' : 'Activate & Connect'}
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  }

  state.customIntegrations.forEach(ci => {
    const card = document.createElement("div");
    card.className = "glass-panel";
    card.style.padding = "20px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    card.style.border = "1px solid var(--border-glass)";
    card.style.background = "rgba(255, 255, 255, 0.02)";
    card.style.borderRadius = "var(--radius-md)";

    const statusBadge = ci.active 
      ? `<span class="badge badge-emerald" style="font-size:0.75rem;">Active</span>` 
      : `<span class="badge badge-amber" style="font-size:0.75rem;">Inactive</span>`;

    const customLogo = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-indigo); width: 18px; height: 18px;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`;

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          ${customLogo}
          <strong style="color:var(--text-primary); font-size:1rem;">${ci.name}</strong>
        </div>
        ${statusBadge}
      </div>
      <p style="color:var(--text-muted); font-size:0.8rem; line-height:1.4; margin-bottom:16px;">Endpoint: <span style="font-family:monospace; font-size:0.7rem;">${ci.url}</span></p>
      
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:auto;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <label style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);">API Key</label>
          <input type="password" class="form-input" style="margin-top:0; font-size:0.8rem; background:rgba(0,0,0,0.1);" placeholder="Enter API Key..." value="${ci.apiKey || ''}" onchange="updateCustomIntegrationKey('${ci.id}', this.value)">
        </div>
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
          <button class="btn-nav-action secondary" style="padding: 6px 10px; font-size:0.75rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.2); cursor:pointer;" onclick="deleteCustomIntegration('${ci.id}')">
            Delete
          </button>
          <button class="btn-nav-action ${ci.active ? 'secondary' : 'primary'}" style="padding: 6px 14px; font-size:0.75rem; cursor:pointer;" onclick="toggleCustomIntegrationActive('${ci.id}')">
            ${ci.active ? 'Deactivate' : 'Activate & Connect'}
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.updateIntegrationKey = function(key, val) {
  if (state.integrations[key]) {
    state.integrations[key].apiKey = val;
    saveIntegrations();
  }
};

window.toggleIntegrationActive = function(key) {
  if (state.integrations[key]) {
    state.integrations[key].active = !state.integrations[key].active;
    saveIntegrations();
    renderAdminIntegrations();
    addAdminLog(`${state.integrations[key].active ? 'Activated' : 'Deactivated'} ${state.integrations[key].name} integration`, "info");
  }
};

window.updateCustomIntegrationKey = function(id, val) {
  const ci = state.customIntegrations.find(c => c.id === id);
  if (ci) {
    ci.apiKey = val;
    saveIntegrations();
  }
};

window.toggleCustomIntegrationActive = function(id) {
  const ci = state.customIntegrations.find(c => c.id === id);
  if (ci) {
    ci.active = !ci.active;
    saveIntegrations();
    renderAdminIntegrations();
    addAdminLog(`${ci.active ? 'Activated' : 'Deactivated'} ${ci.name} integration`, "info");
  }
};

window.deleteCustomIntegration = function(id) {
  state.customIntegrations = state.customIntegrations.filter(c => c.id !== id);
  saveIntegrations();
  renderAdminIntegrations();
  addAdminLog(`Deleted custom API integration`, "warning");
};

// Start operations on page load
window.addEventListener("DOMContentLoaded", init);
