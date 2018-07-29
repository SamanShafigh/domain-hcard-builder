FROM node:8.9.4

RUN mkdir /usr/app

COPY . /usr/app/

WORKDIR /usr/app
RUN npm install
RUN npm run build

EXPOSE 3030

#ENTRYPOINT ["npm", "run", "start"]