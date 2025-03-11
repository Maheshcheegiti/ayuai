const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const EDAMAM_URL = process.env.EXPO_PUBLIC_EDAMAM_API_URL;
const EDAMAM_APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY;
const EDAMAM_APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID;

/**
 * Generic function to handle API requests
 *
 * @param {string} endpoint - API endpoint (relative to BASE_URL or EDAMAM_URL)
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {object} body - Request body (if applicable)
 * @param {object} headers - Additional headers (optional)
 * @param {object} params - Query parameters (optional)
 * @param {boolean} edamam - Whether the request is for the Edamam API
 * @returns {Promise<object>} - Parsed response from the server
 */
export const api = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {},
  params = {},
  edamam = false
) => {
  // Construct the base URL
  const baseUrl = edamam ? EDAMAM_URL : BASE_URL;

  // Add query parameters for Edamam API
  if (edamam) {
    params = {
      ...params,
      app_id: EDAMAM_APP_ID,
      app_key: EDAMAM_APP_KEY,
    };
  }

  // Construct the full URL with query parameters
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  // Set up request options
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Add body if applicable
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url.toString(), options);
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
