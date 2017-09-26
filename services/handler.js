const response = (res, next, status, data, httpcode ) => {
  const responseData = {
    status,
    data
  }
  res.setHeader('content-type', 'application/json');
  res.status(httpcode)
  res.writeHead(httpcode);
  console.log(responseData);
  res.end(JSON.stringify(responseData));
}

exports.success = function (res, next, data) {
  response(res, next, "success", data, 200);
}

exports.errors = function (res, next, data, httpcode) {
  response(res, next, "error", data, httpcode);
}
