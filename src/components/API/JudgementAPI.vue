<script>
import axios from "axios";

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

  async mounted(method, parameter, body) {
    switch (body) {
      case "":
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

      default:
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
    }
  }
};
</script>
