import axios from "axios";

export default async (method, parameter, body, content = "application/json", authorisation) => {
  if (body !== "" && authorisation !== "") {
    return await withBodyAndAuthorize(method, parameter, content, body, authorisation);
  } else if (body !== "" && authorisation === "") {
    return await withBodyNotAuthorize(method, parameter, content, body);
  } else if (body === "" && authorisation !== "") {
    return await notBodyWithAuthorize(method, parameter, content, body, authorisation);
  } else {
    return await notBodyAuthorize(method, parameter, content);
  }
}

async function withBodyAndAuthorize(method, parameter, content, body, authorisation) {
  return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
    headers: {
      'Content-Type': content,
      "Authorization": `Bearer ${authorisation}`,
    },
    method: method,
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(async data => {
      return await data
    })
}

async function withBodyNotAuthorize(method, parameter, content, body) {
  return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
    headers: {
      'Content-Type': content,
    },
    method: method,
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(async data => {
      return await data
    })
}

async function notBodyWithAuthorize(method, parameter, content, body, authorisation) {
  return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
    headers: {
      'Content-Type': content,
      "Authorization": `Bearer ${authorisation}`,
    },
    method: method,
  })
    .then(response => response.json())
    .then(async data => {
      return await data
    })
}

async function notBodyAuthorize(method, parameter, content) {
  return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
    headers: {
      'Content-Type': content,
    },
    method: method,
  })
    .then(response => response.json())
    .then(async data => {
      return await data
    })
}
