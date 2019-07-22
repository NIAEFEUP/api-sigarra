FROM node:10.16.0

RUN mkdir -p /usr/lib/api-sigarra
WORKDIR /usr/lib/api-sigarra

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install Node Packages (only production)
RUN npm install --only=production

# Copying app source
COPY ./lib ./lib

# Copying .env file because it is necessary for the app to run
COPY .env ./

EXPOSE $PORT
CMD ["npm", "start"]