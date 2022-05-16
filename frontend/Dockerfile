FROM node:alpine
ENV PATH /app/node_modules/.bin:$PATH
# node 환경

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

# npm 패키지 설치
RUN npm install

# 서버 구동
CMD ["npm", "start"]