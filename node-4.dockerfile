FROM node:4
ADD ./package.json /smokejs/package.json
WORKDIR /smokejs
RUN npm install
ADD . /smokejs
RUN npm test
