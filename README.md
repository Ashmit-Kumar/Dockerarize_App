# Docker User Tracker

This project is a simple web application that tracks user visits and displays their names and email addresses. It consists of a frontend written in HTML and a backend API running in a separate Docker container, which interacts with MongoDB and Mongo Express for data storage and management.


## Technologies Used

- **Docker**: Containerization of the application components.
- **MongoDB**: NoSQL database to store user data.
- **Mongo Express**: Web-based MongoDB admin interface.
- **Node.js**: Backend API server.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Docker | [Install](https://docs.docker.com/engine/install/)
- Docker Compose

## Getting Started
Follow the steps below to set up and run the application locally.

### Clone the Repository
```bash
git clone <repository-url>
cd Dockerize_app
```

### Pull the Docker Images
If you want to pull the images from Docker Hub, you can run:

```bash
docker pull ashmit1020/my_app:v.1.1
docker pull ashmit1020/my_api:v.1.0
docker pull mongo
docker pull mongo-express
```

### Build and Run the Containers
You can use Docker Compose to build and run the containers. Ensure you have a docker-compose.yml file set up in the project directory. Here’s an example:

```yaml
services:
  mongodb:  # MongoDB service definition
    image: mongo  # Use the official MongoDB image from Docker Hub
    ports:
      - 27017:27017  # Map the host port 27017 to the container port 27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin  # Set the root username for MongoDB
      - MONGO_INITDB_ROOT_PASSWORD=password  # Set the root password for MongoDB
    volumes:
      - db_data:/data/db  # Use a named volume to persist MongoDB data across container restarts

  mongodb-express:  # MongoDB Express service definition for a web-based MongoDB admin interface
    image: mongo-express  # Use the official Mongo Express image from Docker Hub
    ports:
      - 8081:8081  # Map the host port 8081 to the container port 8081 for accessing the web interface
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=admin  # Set the admin username for MongoDB Express
      - ME_CONFIG_MONGODB_ADMINPASSWORD=password  # Set the admin password for MongoDB Express
      - ME_CONFIG_MONGODB_PORT=27017  # Specify the port MongoDB is running on
      - ME_CONFIG_MONGODB_SERVER=mongodb  # Set the name of the MongoDB service to connect to

  frontend:  # Frontend service definition
    image: ashmit1020/my_app:v.1.1  # Specify the Docker image for the frontend application
    ports:
      - 2002:80  # Map the host port 2002 to the container port 80

  backend:  # Backend service definition
    image: ashmit1020/my_api:v.1.1  # Specify the Docker image for the backend application
    ports:
      - 3000:3000  # Map the host port 3000 to the container port 3000
    environment:
      # Set the MongoDB connection URI, using admin credentials and specifying the authentication database
      MONGO_URI: mongodb://admin:password@mongodb:27017/User_acc?authSource=admin
      PORT: 3000  # Set the port for the backend application
    depends_on:  # Ensure that the backend service waits for the MongoDB service to start
      - mongodb

volumes:
  db_data:  # Define a named volume for persistent MongoDB data
    driver: local  # Use the local driver to manage the volume

  ```

### Start the Application
Run the following command to start the application:

```bash
docker-compose up
```

### Access the Application
Frontend: Open your browser and navigate to http://localhost:2002 to view the single-page application.
Backend: The backend API runs on http://localhost:3000.
Mongo Express: Access the MongoDB management interface at http://localhost:8081.

### Stopping the Application
To stop the running containers, press CTRL + C in the terminal where you ran docker-compose up. You can also run:

```bash
docker-compose down
```
## Configuration
You can customize the application by modifying the configurations in the respective service directories (e.g., backend and frontend).

### Backend Configuration
Ensure that your backend service is properly configured to connect to MongoDB. Check the environment variables and connection strings in your backend code.

### MongoDB Configuration
MongoDB data is persisted in a Docker volume. You can manage your database through Mongo Express.

## Troubleshooting
If you encounter any issues, check the logs using:
```bash
docker-compose logs
```
or 
```bash
docker exec -it <backend-container-name> /bin/bash
```

## Contributions
We welcome contributions to this project! If you have suggestions, bug fixes, or new features, feel free to open an issue or submit a pull request. Your input helps improve the project and benefit the community.

### How to Contribute

1) Fork the repository
2) Create a new branch for your feature or bug fix.
Make your changes.
3) Test your changes.
4) Submit a pull request with a clear description of your changes.
## License
This project is licensed under the [MIT](https://github.com/Ashmit-Kumar/Dockerize_app/blob/main/LICENSE) License. See the LICENSE file for details.

## Contact
For any questions or inquiries, feel free to reach out to me at:
- [Gmail](ashmitkumar1020@gmail.com)
- [Linkedin](www.linkedin.com/in/ashmitkumar1020)