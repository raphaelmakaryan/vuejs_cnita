<script>
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: 'JudgementAPI',
  /*
  data() {
    return {
      apiClient
    }
  },
  setup: function () {
    this.apiClient = axios.create({
      baseURL: `${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  async mounted(parameter) {
  }
  */

  async mounted(method, parameter, body, authorisation) {
    if (body !== "" && authorisation !== "") {
      return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: method,
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(async data => {
          return await data
        })
    } else if (body !== "" && authorisation) {
      return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${authorisation}`,
        },
        method: method,
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(async data => {
          return await data
        })
    } else {
      return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
        headers: {
          'Content-Type': 'application/json',
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
