exports.handler = async (event, context) => {
  const apiKey = event.headers['x-api-key'];
  const auth = event.headers['authorization'];

  if (!apiKey || !auth) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  const fans = [
    {
      device_id: "fan_001",
      device_name: "Living Room Fan",
      power: "OFF",
      speed: 1
    },
    {
      device_id: "fan_002",
      device_name: "Bedroom Fan",
      power: "ON",
      speed: 3
    }
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(fans)
  };
};