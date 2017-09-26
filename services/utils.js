module.exports = server => {
  //if we wanted to whitelist an IP address
  server.use((req, res, next) => {
    const whitelisted = ['111.222.333.444'];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if(whitelisted.indexOf(ip) === -1) {
      const response = {
        'status': 'failure',
        'data' : 'You must specify a valid api key'
      }
      res.setHeader('content-type', 'application/json');
      res.writeHead(403);
      res.end(JSON.stringify(response));
      return next();
    }
  });


  server.use((req, res, next) => {
    //If I wanted to require an api key before use
    const apiKeys = {
      'user1': 'ewuybfu4874784343bdjhdwk'
    }
    if (typeof(req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== !apiKeys[req.authorization.basic.username]){
      const response = {
        'status': 'failure',
        'data' : 'You must specify a valid api key'
      }
      res.setHeader('content-type', 'application/json');
      res.writeHead(403);
      res.end(JSON.stringify(response));
      return next();
    }
    return next();
  });
}
