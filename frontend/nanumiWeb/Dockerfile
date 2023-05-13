FROM node:16-alpine
WORKDIR /nanumi/react
COPY . .
RUN npm install
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "build"]
