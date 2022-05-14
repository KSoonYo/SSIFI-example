FROM ubuntu:20.04

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
# COPY package.json ./
# COPY package-lock.json ./

RUN npm install

# COPY /. ./

CMD ["npm", "start"]