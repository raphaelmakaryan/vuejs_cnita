<script>
import axios from "axios";

export default {
  name: 'JudgementAPI',
  async mounted(method, parameter, body, content = "application/json", authorisation) {
    //Si body + authorisation
    if (body !== "" && authorisation !== "") {
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
      // si body mais pas d'authorisation
    } else if (body !== "" && authorisation === "") {
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
    // Si pas de body mais authorisation
    else if (body === "" && authorisation !== "") {
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
    } else {
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
  }
};
</script>
