# PeerHire Backend

A comprehensive backend service for the PeerHire platform, designed to provide robust API functionality for seamless peer-to-peer interactions.

## Project Overview

PeerHire Backend serves as the central API service that powers the PeerHire platform. This service handles authentication, data persistence, business logic, and third-party integrations to support the frontend applications.

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Docker** - Containerization for easy deployment
- **API Documentation** - Comprehensive Postman collection

## Features

- RESTful API architecture
- Authentication and authorization
- Data validation and sanitization
- Error handling and logging
- Containerized deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Docker (optional, for containerized deployment)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_URI=mongodb://localhost:27017/peerhire
JWT_SECRET=your_jwt_secret
```

### Installation

#### Option 1: Local Setup

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd peerhire-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the server:
   ```bash
   npm start
   # or
   yarn start
   ```

#### Option 2: Using Docker

1. Pull the Docker image:
   ```bash
   docker pull akshayyyyy/peerhire-backend
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:3000 --name peerhire-backend --env-file .env akshayyyyy/peerhire-backend
   ```

This will start the container in detached mode, map port 3000 of the container to port a3000 on the host, set the container name to peerhire-backend, and use the environment variables from the .env file.

## API Documentation

The API is thoroughly documented using Postman. You can access the documentation at:
[https://documenter.getpostman.com/view/26942553/2sB2cUB37r](https://documenter.getpostman.com/view/26942553/2sB2cUB37r)

The documentation includes:
- Endpoints overview
- Request/response formats
- Authentication requirements
- Example requests
- Error handling

## Docker Commands

### Basic Docker Commands for PeerHire Backend

```bash
# Pull the Docker image
docker pull akshayyyyy/peerhire-backend

# Run the container
docker run -d -p 3000:3000 --name peerhire-backend --env-file .env akshayyyyy/peerhire-backend

# Stop the container
docker stop peerhire-backend

# Start an existing container
docker start peerhire-backend

# Remove the container
docker rm peerhire-backend

# View logs
docker logs peerhire-backend

# Access container shell
docker exec -it peerhire-backend /bin/bash
```

## Development

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
peerhire-backend/
├── controllers/           # Request handlers
├── models/                # Database models
├── routes/                # API routes
├── utils/                 # Utility functions
├── app.js                 # Express app setup
├── .env                   # Environment variables
├── Dockerfile             # Docker configuration
├── .gitignore             # Git ignore file
├── .dockerignore          # Docker ignore file
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/<feature-name>`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/<feature-name>`)
5. Open a Pull Request
