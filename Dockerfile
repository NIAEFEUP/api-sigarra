FROM ubuntu:16.04

RUN apt update
RUN apt-get update --yes
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install --yes build-essential
RUN apt-get install --yes nodejs
RUN apt install --yes pdftk
RUN apt-get install --yes poppler-utils
RUN apt-get install --yes ghostscript
RUN apt-get install --yes tesseract-ocr

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
COPY ./web ./web

# Copying .env file because it is necessary for the app to run
COPY .env ./

EXPOSE $PORT
CMD ["npm", "start"]