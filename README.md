API Documentation

Endpoints:

/api/find-job :
===============
  Method: GET
  Description: Fetches data from 'freelancer.com' platform to display all available jobs. Provides details such as skills required, bids, prices, and state of payment verifications (verified or not verified).
  Parameters: None
  Response:
  JSON object containing job details including title, description, skills, bids, prices, and payment verification status.


/api/find-job/[page-number] ;
=============================
  Method: GET
  Description: Fetches additional jobs by navigating through different pages of the job listings.
  Parameters:
  page-number: (integer) Specifies the page number of job listings to fetch.
  Response:
  JSON object containing additional job details from the specified page.

  
/api/find-freelancers :
=======================
  Method: GET
  Description: Retrieves all freelancers' profiles including profile link, description, skills, rating, reviews, and total earnings.
  Parameters: None
  Response:
  JSON object containing freelancer details such as profile link, description, skills, rating, reviews, and earnings.
  
/api/find-freelancers/[page-number] :
======================================
  Method: GET
  Description: Navigates to different pages to retrieve additional freelancers' profiles.
  Parameters:
  page-number: (integer) Specifies the page number of freelancer profiles to fetch.
  Response:
  JSON object containing additional freelancer details from the specified page.

  
[ Freelancer API Details: ]
===========================
Data Retrieved: Title, Description, Tags/Skills, Bids, Average Price (hourly paid, fixed price projects).
Default Number of Projects: 50 jobs/projects posted by other clients.
