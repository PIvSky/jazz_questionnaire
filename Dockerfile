# create build stage from a base image
FROM node:20-slim

# set the working directory to /app in docker image
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install

# copy the rest of the files to the working directory
COPY . .

# expose port 3000 to tell Docker that the container listens on the specified network ports at runtime
EXPOSE 3000

# command to run the app
CMD npm start