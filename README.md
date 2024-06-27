# Advertisement project

The Advertisement Management System is a web-based platform designed to facilitate the creation, management, and browsing of advertisements across various categories. The system is structured to provide specific capabilities to both admins and users, ensuring smooth communication between users and advertisers while maintaining data integrity and security.

## Features

## Admin Capabilities

- **Category Management**:
  - Create, edit, and delete ad categories (e.g., “Real Estate,” “Electronics,” “Jobs”).
- **Ad Management**:

  - Add new ads, update existing ones, and remove outdated ads.

  ## User Capabilities

- **View Ads**:
  - Browse through ads based on categories or search keywords.
- **Comment on Ads**:
  - Leave comments on ads to share thoughts or ask questions.
- **Delete Comments**:
  - Delete their own comments.

## Author

Ovidijus Eitminavičius

## Database

1. Download included sql file.
2. Create the database with the same name as the file name.
3. Import sql file.

## Back End

The back end is built with Spring Boot. To run the back end, follow these instructions:

1. Install Java jdk if needed.
2. Check application.properites and make adjustments if needed.
3. Build the project: `mvn clean install` (optional). I was using intellij. So it builds automatically.
4. Run the application.

## Front End

The front end is written with React. To run the front end, follow these steps:

1. Open terminal and install dependencies: `npm install` or `npm i`
2. Replace .env copy with .env and write your url example : "[localhost://8080](http://localhost:8080)"
3. Start the development server: `npm run dev`
4. Click or paste on the link.
