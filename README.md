# tMDB-be

# Overview
The Movie Database Application is a backend service that provides an API to interact with a movie database. The application allows users to fetch movies based on various filters such as genre, and provides endpoints for retrieving and managing movie data.

# Prerequisites
- Node.js (version 18 or later)
- Yarn (or npm if you prefer)
- Docker and Docker Compose (for containerized deployment)

To get started, 

1- clone the repository to your local machine.

2- Create a .env file in the root directory of your project. You can see the example env file in .env.example.

3- Install the required dependencies using Yarn

4- Build and run the application using Docker Compose:
 # docker-compose up

 The application will be available at http://localhost:8080.

 To stop the running Docker containers, use:
 # docker-compose down

5- To run the unit tests and generate coverage reports, use:
 # yarn test:coverage 