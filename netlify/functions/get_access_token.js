exports.handler = async (event, context) => {
  const apiKey = event.headers['x-api-key'];
  const auth = event.headers['authorization'];

  if (!apiKey || !auth) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: "mock_access_token_123",
      expires_in: 86400
    })
  };
};