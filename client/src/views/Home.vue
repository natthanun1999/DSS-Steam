<template>
  <div class="home">
    <HelloWorld />
    <Result v-if="wantResult" />
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

  mounted() {
    window.eventBus.$on('getResult', this.getResult)
  },

  data() {
    return ({
      wantResult: false
    })
  },
  
  methods: {
    getResult() {
      this.wantResult = true
    }
  }
};
</script>
