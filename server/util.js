function getKeyValue(data) {
  if (typeof data !== "object") {
    throw new Error('Expect to have an object')
  }

  var key = Object.keys(data)[0];
  return {
    key: key,
    value: data[key]
  } 
}

module.exports = {
  getKeyValue
}