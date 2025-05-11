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

#WORKDIR /app/dist/svg-editor/browser

#RUN tar -c . | docker save - svg-editor:$(date +%s)
#RUN tar -c /home/runner/work/_temp/artifact.tar dist/svg-editor/browser/

RUN ls -l

#CMD ["npx", "nx", "serve", "--host", "0.0.0.0", "--port", "4200", "--configuration", "production"]
CMD ["npm", "run", "start:prod"]
