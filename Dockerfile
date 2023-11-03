# Use an official Node.js LTS (18) runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy prisma folder to the container
COPY prisma /prisma/

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port that the Nest.js application will run on
EXPOSE 3000

# Define the command to start the Nest.js application in watch mode for development
CMD ["npm", "run", "start:dev"]