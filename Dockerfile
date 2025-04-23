FROM node:current
RUN ls
RUN mkdir -p /app
RUN ls
WORKDIR /app
RUN ls
COPY package.json .
RUN ls
RUN PWD
RUN npm install -g npm@9.2.0
RUN npm install
RUN ls
RUN npm run build:prod

#COPY . .

#EXPOSE 4200
#CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]