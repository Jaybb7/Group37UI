export const STORE_USER_IN_DATABSE = "http://localhost:8080/user/storeUser";
export const GET_MESSAGE_API = "http://localhost:8080/message/get-messages";
export const SEND_MESSAGE_API = "http://localhost:8080/message/send-message";
export const GET_OPENAICHAT_API = "http://localhost:8080/ai/chat";
export const DUMMY_IMAGE = "data:image/webp;base64,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";
