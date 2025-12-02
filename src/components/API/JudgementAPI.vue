<script>
export default {
  name: 'JudgementAPI',
  async mounted(parameter) {
    return await fetch(`${import.meta.env.VITE_BASE_API_JUDGEMENT}${parameter}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(async data => {
        return await data
      })
  }
};
</script>
