const SERVER_LOG_ENDPOINT = '';

const sendLogToServer = async (level, message, data = {}) => {

  const payload = {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(SERVER_LOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`Failed to send log to server. Status: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error while sending log to server:', error);
  }
};


export const logInfo = (message, data = {}) => {
  console.log('INFO:', message, data);
  sendLogToServer('INFO', message, data);
};


export const logError = (message, error = {}) => {
  console.error('ERROR:', message, error);

  const errorData = {
    message: error.message || 'No error message provided',
    stack: error.stack || 'No stack trace available',
    ...error, 
  };

  sendLogToServer('ERROR', message, errorData);
};
