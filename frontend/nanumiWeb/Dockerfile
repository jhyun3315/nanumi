FROM node:18.16.0 as build

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install --silent

# copy app files
COPY . .

# build the app
RUN npm run build


# Install Nginx
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/sites-available/nginxec2.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
