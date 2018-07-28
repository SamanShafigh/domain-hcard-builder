import { createReadStream } from 'fs';
import * as React from 'react';
import * as ReactDom from 'react-dom/server';

interface Global { React: any; }
declare var global: Global;
global.React = React;

function html(body: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Live hCard Preview</title>
  
      <link href="css/bootstrap.min.css" rel="stylesheet" >
      <link href="css/main.css" rel="stylesheet">
    </head>
  
    <body>
      ${body}
    </body>
  </html>
  `;
} 

export function render(path: string, props: any) {
  const component = require(path).default;
  var body = ReactDom.renderToString(
    React.createElement(component, props)
  );

  return html(body);
}

export function serve(path: string) {
  return createReadStream(`${__dirname}/${path}`)
}
