const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Generic function to handle API requests
 *
 * @param {string} endpoint - API endpoint (relative to BASE_URL)
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {object} body - Request body (if applicable)
 * @param {object} headers - Additional headers (optional)
 * @returns {Promise<object>} - Parsed response from the server
 */
export const api = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) => {
  const url = `${BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

    const responseData = await response.json();
    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
};
