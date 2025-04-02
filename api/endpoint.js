const EDAMAM_APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID;
const endpoints = {
  AUTH_OTP: "/auth/signinup/code",
  AUTH_OTP_CONSUME: "/auth/signinup/code/consume",
  AUTH_OTP_RESEND: "/auth/signinup/code/resend",

  USER: "/user",

  CHAT_HISTORY: "/chat/history",
  CHAT: "/chat",
  GET_LLM_RESPONSE: "/chat/llm/v1",
  HEALTH_REPORT: "/chat/health-report/v1",
  ANALYZE_BARCODE: "/chat/analyze-barcode/v1",

  MEAL_PLANNER: `/api/meal-planner/v1/${EDAMAM_APP_ID}/select`,
  MEAL_PLANNER_RECIPES: `/api/recipes/v2/`,
};

export default endpoints;
