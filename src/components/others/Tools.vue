<script>
export default {
  name: "Tools",
  methods: {
    debug(text, p1, p2) {
      // Seulement le parametre 1
      if (p1 !== "" && p2 === "") {
        console.log("-------------" + text + "----------------");
        console.log(p1)
        console.log("-----------------------------");
      }
      // Seulement le parametre 2
      else if (p1 === "" && p2 !== "") {
        console.log("-------------" + text + "----------------");
        console.log(p2)
        console.log("-----------------------------");
      }// Seulement les deux parametres
      else if (p1 !== "" && p2 !== "") {
        console.log("-------------" + text + "----------------");
        console.log("------------P1---------------");
        console.log(p1)
        console.log("------------P1---------------");
        console.log("------------P2---------------");
        console.log(p2)
        console.log("------------P2---------------");
        console.log("-----------------------------");
      }
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>
