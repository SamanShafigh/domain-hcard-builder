const React = require('react');
const ReactDom = require('react-dom/server')
global.React = React;

function html(body) {
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

module.exports.render = (component, props) => {
  var body = ReactDom.renderToString(
    React.createElement(component, props)
  );

  return html(body);
}