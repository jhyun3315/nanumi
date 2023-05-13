FROM    node:16-alpine
WORKDIR /nanumi/react
COPY    . .
RUN    npm install
RUN    npm run build

CMD ["npm", "run", "build"]
