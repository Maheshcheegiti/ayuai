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
    let responseData;

    try {
      responseData = await response.json();
    } catch (jsonError) {
      console.error("Failed to parse JSON:", jsonError);
      responseData = null;
    }

    if (!response.ok) {
      console.error("API Error:", JSON.stringify(responseData, null, 2));

      let errorMessage = "Unknown error occurred";

      if (Array.isArray(responseData?.detail)) {
        errorMessage = responseData.detail
          .map((err) =>
            err.loc ? `${err.loc.join(".")}: ${err.msg}` : err.msg
          )
          .join(", ");
      } else if (typeof responseData?.detail === "string") {
        errorMessage = responseData.detail;
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else {
        errorMessage = `HTTP error! status: ${response.status}`;
      }

      throw new Error(errorMessage);
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
};
