const strings = {
  // Start and welcome pages
  homePage: {
    welcomeMessage: 'Pick a board to explore!',
    introText: "Welcome to our platform! Let's get you started.",
    callToAction: 'Get Started',
  },

  featureSpecific: {
    voting: 'Voting',
    won: 'Won',
    dropped: 'Dropped',
    new: 'New',
    sentInUsername: 'Sent in by:',
    noFeatures: 'No features available at the moment.',
    numberOfVotes: 'Votes:',
    reason: 'Reason:',
    status: 'Status:',
    reasonVisible: 'Reason visible to users:',
    edit: 'Edit',
    recover: 'Recover',
    changeReason: 'Change reason on this feature',
    selectReason: 'Select another reason',
    reason1: 'Too big to take on',
    reason2: 'No resources',
    reason3: 'Not in line with the business goals',
    reason4: 'Maybe sometime in the future',
    reason5: 'Not a priority',
    reason6: "Won't do",
    reasonVisibility: 'Change reason visibility to users',
    selectVisiblity: 'Select visibility',
    option1: 'Visible to users',
    option2: 'Not visible to users',
    acceptFeature: 'Accept',
    denyFeature: 'Deny',
    chooseFaithOfFeature: 'Choose the faith of this feature',
    dropFeature: 'Drop it',
    declareWon: 'Declare as won',
    informationMovingToDroppedSection: 'This will send the feature to the dropped section.',
    reasonToDrop: 'Add a reason why you chose to drop this feature',
    selectAReason: 'Select a reason',
    declareWon: 'Declare this feature as won',
    dropTheFeature: 'Drop the feature',
    informationMovingToWonSection: 'This will send the feature to the won section.',
    addStatus: 'Add a status to this feature',
    selectStatus: 'Select a status',
    status1: 'Not started',
    status2: 'In progress',
    status3: 'Released',
    statusVisibility: 'Status visible to users:',
    changeStatus: 'Change status on this feature',
    selectAnoterStatus: 'Select another status',
    changeStatusVisibility: 'Change status visibility to users',
  },

  boardSpecific: {
    title: 'Board title:',
    boardDescription: 'Board description:',
    changeTitle: 'Change your board title here',
    changeDescription: 'Change your board description here',
  },

  // General error messages and handling
  errorMessages: {
    success: 'Your request was successful',
    error: 'Something went wrong. Please try again.',
    serverError: 'The application ran into issues. Try reloading the page.',
    notFound: "Sorry, the page you're looking for doesn't exist.",
    forbidden: 'You do not have permission to access this page.',
    unauthorized: 'You need to be logged in to access this content.',
    validationError: 'Some fields contain errors. Please check and try again.',
    featureSuggestionFailed: 'Something went wrong. Please try again',
    alreadyVoted: 'You have already voted on this feature',
  },

  // Confirmation and success messages
  successMessages: {
    savedChanges: 'Your changes have been saved successfully.',
    submitted: 'Your submission was received!',
    deleted: 'Item has been deleted successfully.',
    updatedProfile: 'Your profile was updated successfully.',
    featureSentInSuccess: 'Your suggestion has been sent in successfully',
    votingSuccessful: 'Thanks for voting!',
    featureDenied: 'The feature has been denied and moved to Dropped section',
    featureAccepted: 'The feature has been accepted and moved to Voting section',
    featureWon: 'The feature has been declared as won and moved to Won section',
    featureDropped: 'The feature has been declared as dropped and moved to Dropped section',
  },

  // Informative messages and instructions
  informationMessages: {
    loading: 'Loading, please wait...',
    noResults: 'No results found. Try a different search.',
    unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?',
    comingSoon: 'Stay tuned! This feature is coming soon.',
    featureRequestSent: 'Your feature request has been submitted.',
  },

  buttons: {
    goBack: 'Back',
    sendIn: 'Send',
    exploreBoard: 'Explore board',
    close: 'Close',
    goHome: 'Home',
    save: 'Save',
  },

  // Confirmation and warning dialogues
  confirmationDialogs: {
    delete: 'Are you sure you want to delete this item? This action cannot be undone.',
    logout: 'Are you sure you want to log out?',
    discardChanges: 'You have unsaved changes. Do you want to discard them?',
  },

  // User related messages
  userMessages: {
    loginPrompt: 'Please log in to access your account.',
    accountCreated: 'Account created successfully! Welcome onboard.',
    passwordResetSent: 'Password reset instructions have been sent to your email.',
    profileIncomplete: 'Your profile is incomplete. Please add more information.',
    logoutSuccess: 'You have been logged out successfully.',
  },

  // Footer and contact information
  footer: {
    madeBy: 'Created by Jessika AW',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },

  // Form and validation
  formMessages: {
    requiredField: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    passwordTooShort: 'Password must be at least 8 characters long.',
    passwordsDoNotMatch: 'Passwords do not match.',
  },

  suggestFeatureForm: {
    header: 'Suggest a feature',
    description: 'Fill in the form to send in a feature suggestion.',
    header1: 'Title *',
    header2: 'Description *',
    header3: 'Username',
    usernameOptional: 'Username is optional',
    placeholder: 'Type here',
  },

  // Help texts and instruction messages
  helperTexts: {
    passwordHint: 'Use at least 8 characters, with a mix of letters and numbers.',
    searchPlaceholder: 'Search for items, topics, or people...',
    uploadFileInstructions: 'Drag and drop or click to upload your file.',
  },
}

export default strings
