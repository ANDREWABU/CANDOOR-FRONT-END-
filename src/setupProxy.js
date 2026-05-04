const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(createProxyMiddleware('/api/category-create', {
  //   target: 'http://localhost:8000',
  //   changeOrigin: true,

  // }));
  // app.use(createProxyMiddleware('api/category-list-api', {
  //   target: 'http://localhost:8000',
  //   changeOrigin: true,

  // }));
  // app.use(createProxyMiddleware('api/category-edit-api', {
  //   target: 'http://localhost:8000',
  //   changeOrigin: true,

  // }));
  // app.use(createProxyMiddleware('api/category-update-api', {
  //   target: 'http://localhost:8000',
  //   changeOrigin: true,

  // }));
  // app.use(createProxyMiddleware('api/buyr-question-api', {
  //   target: 'http://localhost:8000',
  //   changeOrigin: true,

  // }));
  // app.use(createProxyMiddleware('api/buyr-question-update-api', {
  //   target: 'http://localhost:8000',
  //   changeOrigin: true,

  // }));

  // for Testoing Perpose--->>>

  

  app.use(
    createProxyMiddleware('/api/codeVerification', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor-get-profile-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor-basic-info', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/setting-preferences', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/delete-work-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor-update-about-me', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor-update-help', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor-update-just-for-fun', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor/delete-education-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor/delete-work-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisor-update-basic-info', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/add-education-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/get-education-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/get-meetingtype', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/register', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/user-basic-info', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/download-resume', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisees-get-profile-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/store-advisor-profile-view', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisees-get-profile', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/create-new-meeting-instance', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  
  app.use(
    createProxyMiddleware('/api/user-update-basic-info', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisees-update-about-me', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-education-dropdowns', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-work-dropdowns', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisees-update-just-for-fun', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisees-update-currer-interests', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/add-user-carrer-goal', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/emailCheck', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/hear_about_us_options', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/advisor/signupwizard/api/emailCheck', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/get-education-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/login', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-setting-account', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/setting-account', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/location-timezone', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-carrer-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/forgetPassword', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/userAuth', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-education-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/add-education-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/add-education-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/add-highest-degree', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/update-education-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-education-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/update-work-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/add-work-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/get-work-experience-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/add-user-background', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/get-background-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/get-motivation-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/add-motivation-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/emailVerification', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/add-highest-degree', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-work-experience-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-work-experience-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-work-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/delete-education-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/add-work-experience', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/add-highest-experiece-comfort-level', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor/add-highest-experiece', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/add-user-background', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-motivation-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/add-motivation-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-background-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/submit-form-request', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-joined-community', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-funnel-status', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/advisor/api/submit-form-request', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-carrer-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/submit-apply-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/advisor/api/get-education-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/complete-profile', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-complete-profile', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-quiz', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-dashboard', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/save-response-quiz', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/save-meeting-services', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-advisor-list', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-filter-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-advisor-request-meeting-types', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-advisor-profile', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-advisee-profile', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-user-services', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/delete-user-services', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-hiring-status', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-hiring-status', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-location-timezone', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/update-setting-preferences', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/get-hiring-status', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/view-meeting-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/view-completed-meeting-data', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/advisor-confirm-meeting', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/advisee-confirm-meeting', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api/cancel-meeting', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/save-advisor-meeting-request', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/propose-alternative-time', {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
};