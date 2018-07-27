const React = require('react');
const ReactDom = require('react-dom/server')
global.React = React;
const hCardComponent = require('./test/main.js').default;
const htmlRender = require('./lib/template/html')

async function run() {
    var hCardProps = await getData();
    
    return render(hCardProps);
}

function render(hCardProps) {
  var content = ReactDom.renderToString(
    React.createElement(
      hCardComponent,
        hCardProps
    ));

  return htmlRender(content);
}

function getData() {
  return new Promise((resolve, reject) => {
    var data = {
      givenName: 'Samssss',
      surname: 'Fairfax',
      email: 'sam.fairfax@fairfaxmedia.com.au',
      phone: '0292822833',
      houseNumber: '100',
      street: 'Harris Street',
      suburb: 'Pyrmont',
      state: 'NSW',
      postcode: '2009',
      country: 'Australia'
    };

    resolve(data);
  });
}

module.exports = {
  run
}