FROM node:current

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install -g npm@11.3.0
RUN npm install

COPY . .

#RUN ls

EXPOSE 4200

#CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
#CMD ["npm", "run", "start:prod"]
#CMD ["npm", "run", "build:prod"]
RUN npm run build:prod

RUN ls -d
RUN ls -l

RUN CD dist/svg-editor/browser
RUN ls -l