"use client";

import encode from "./encode";
import BE_URL from "./getEnvironment";

function getToken() {
  let token = localStorage.getItem("token") as string;
  let refreshToken = localStorage.getItem("refreshToken") as string;

  if (
    JSON.stringify(refreshToken) === "null" ||
    JSON.stringify(token) === "null"
  ) {
    return "";
  }

  if (token !== "undefined" && refreshToken !== "undefined") {
    token = JSON.parse(token);
    refreshToken = JSON.parse(refreshToken);
    return `Bearer ${token}; Bearer ${refreshToken}`;
  } else {
    return "";
  }
}

export default async function postHook(
  requestPath: string,
  requestData: Record<string, unknown> | FormData
) {
  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: getToken(),
  };

  const requestURL = `${BE_URL}${requestPath}`;

  try {
    const response = await fetch(requestURL, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (response.status === 200) {
      if ((requestPath === "/student-dashboard" || requestPath === "/login") && result.token) {
        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(result.refreshToken)
        );
        localStorage.setItem("matric", encode(result.matric));
      }
      return { success: result.data };
    } else if (response.status === 201) {
      return { warning: result.data };
    } else if (response.status === 500) {
      return { error: result.data };
    } else {
      return { error: `Unexpected response status: ${response.status}` };
    }
  } catch (err) {
    console.log(err);
    return { error: "Couldn't send request" };
  }
}
