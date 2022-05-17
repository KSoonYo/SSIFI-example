FROM node:16.13.1-alpine

WORKDIR /app

# node 환경
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

COPY /package.json /app/package.json
# npm 패키지 설치
RUN npm install

# 서버 구동
CMD ["npm", "start"]