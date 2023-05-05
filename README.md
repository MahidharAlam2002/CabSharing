# CabSharing
A web application to have a separate platform for cab-sharing activities.​
## STEPS TO RUN THE CODES / USE THE APPLICATION:

Download/Clone the repo.

### FRONT-END:

1. Go to 'codebase' folder and run 'npm i', it installs all the dependencies to your folder.
2. Next run 'npm start', which runs the front-end on PORT 3000, localhost.
3. Signin with your gmail to access the other features.

### BACK_END:

1. Go to 'backend' folder and run 'npm i', it installs all the dependencies to your folder.
2. Next run 'npm run dev', which runs the back-end on PORT 8080, localhost.


### TESTING

1. FRONT-END: Run 'npm run test' inside the 'codebase' folder, it runs all the tests cases written inside the codebase/src/__tests__ folder and also shows the coverage details.
2. BACK-END: Run 'npm run test' inside the 'backend' folder, it runs all the tests cases written inside the backend/__tests__ folder and also shows the coverage details.


### ADMIN PAGES ACCESS
1. Once you login, everything you see or use is, what is expected of this web application for the normal users.
2. But to acces the admin pages do the following changes:
    1. Go to 'backend/app.js', line 97, add "req.user.google_id==='your_google_id'" inside the 'if' condition.
    2. Go to 'codeBase/src/AdminRoute.js', line 13, add "(response.data).google_id==='your_google_id'" inside the 'if' condition.\\
    3. This allows the user with that email, once loggedin, to acces the admin functionalities.
3. Screenshots of UI for the normal user pages and admin pages can be viewed in UI_images folder.
