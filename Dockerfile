FROM node:19.5.0-alpine

# set working directory
WORKDIR /app

# copy package file
COPY ./package.json ./

# run npm install silently
RUN npm i

# copy files
COPY . .

# run build
RUN npm run build

# start
CMD ["npm", "run", "start"]
