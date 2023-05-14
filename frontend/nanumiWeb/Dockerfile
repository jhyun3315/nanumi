FROM node:18.16.0 as builder

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install --silent

# copy app files
COPY . .

# build the app
RUN npm run build

# expose port
EXPOSE 3001

# start the app
CMD ["npm", "start"]
