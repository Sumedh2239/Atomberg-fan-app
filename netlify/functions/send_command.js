exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { device_id, command, value } = JSON.parse(event.body);

  // Since serverless, no persistent state, just return success
  console.log(`Command: ${command} for ${device_id} to ${value}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};