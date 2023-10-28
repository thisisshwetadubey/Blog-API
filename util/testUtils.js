function mockRequest(body) {
  console.log("mockrequest");
  return {
    body,
  };
}

function mockResponse() {

  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  console.log("return mock response");
  return res;
}

module.exports = { mockRequest, mockResponse };
