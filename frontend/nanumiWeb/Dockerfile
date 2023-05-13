FROM    node:16-alpine
COPY    . .
WORKDIR /usr/src/app
RUN     npm install
COPY . /usr/src/app

CMD ["npm", "run", "build"]
