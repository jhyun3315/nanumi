FROM node:16-alpine
WORKDIR /nanumi/react
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "build"]
