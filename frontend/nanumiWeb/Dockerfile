FROM node:18.16.0 as builder

# set working directory
WORKDIR /app/build

# install app dependencies
COPY package*.json ./
RUN npm install --silent

# copy app files
COPY . .

# build the app
RUN npm run build


# Install Nginx
FROM nginx:1.21.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
