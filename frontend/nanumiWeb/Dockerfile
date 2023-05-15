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

# work dir 에 build 폴더 생성 /app/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build


# Install Nginx
FROM nginx:1.21.0-alpine
# COPY --from=build /app/build /usr/share/nginx/html

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/sites-available/nginxec2.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
