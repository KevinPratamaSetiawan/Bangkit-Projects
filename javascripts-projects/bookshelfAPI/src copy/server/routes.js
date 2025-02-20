const postPredictHandler = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 2000000,
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  }
]
 
module.exports = routes;