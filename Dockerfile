FROM node:current
RUN ls
RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN ls
RUN npm install -g npm@9.2.0
RUN npm install
RUN ls
RUN npm run build:prod

#COPY . .

#EXPOSE 4200
#CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]