# Koa app to switch between SSR or SPA of a React application

This is a node server which;

- Serves up the SPA
- Server renders the SPA to support non-JS clients
- Saves user inputed data to the server as they switch between form fields
- Saves completed form data on user submission
- On page reload, populates the form fields with the values previous saved
- Is stateless, to support auto-scaling

Implementation logic: my idea is to implement an app in a way that can support both SSR and SPA mode. The backend which was the only scope of this project can support this with some minimal change in `middleware:handleMeta` 

We could use the following tag in our html template and if user does not have js support 
we can set a flag for this user amd each following request form this user will include this flag in the header. The middleware:handleMeta can look for this header and switch between SSR or SPA mode properly

```
 <noscript>
  <a href="link to an api end point to set user view mode">
    View this site in noscript mode
  </a>
 </noscript>
```

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

Test coverage is also included in this repository. Please check the coverage directory.