# Dev comment

## Run using docker

Just run the following commands and then hit http://localhost:3030
```
docker-compose build
docker-compose up
```

Note: By default the app is running on a SSR mode if you like the app to run in SPA mode you have to provide the following env variable in docker-compose.yml file
```
RENDER_MODE=spa
```

## Run the app manually

make sure you have Node 8.x (or above) installed. Then make sure you have a mongodb server running and finally run the following commands:

```
npm i
npm run build
DB_URL=mongodb://192.168.99.101:27017 DB_NAME=domain-hcard PORT=3000 npm run start
```

The env variables that this app supports are as follows:

- PORT: server port
- RENDER_MODE: render mode, options are 'ssr' or 'spa'. The default is 'ssr'
- DB_URL: your mongo db uri;
- DB_NAME: your db name;

For example to run it in a SPA mode
```
RENDER_MODE=spa npm run start
```

For running all tests
```
npm run test
```
