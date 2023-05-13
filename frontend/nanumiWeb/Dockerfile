FROM node:16-alpine
WORKDIR /nanumi/react
COPY . .
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "build"]
