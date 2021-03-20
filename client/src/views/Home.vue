<template>
  <div class="home">
    <HelloWorld />
    <Result />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Result from "@/components/Result.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Result,
  },
};
</script>
