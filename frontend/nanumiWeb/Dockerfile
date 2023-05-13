FROM    node:16-alpine
COPY    ./package* /usr/src/app/
WORKDIR /usr/src/app
RUN     npm install
COPY . /usr/src/app
EXPOSE 3000
CMD    npm build
