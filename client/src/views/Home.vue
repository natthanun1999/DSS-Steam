<template>
  <div class="home">
    <HelloWorld />
    <Result v-if="wantResult" tags="tags" categories="categories" />
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
    window.eventBus.$on("getResult", this.getResult);
  },

  data() {
    return {
      wantResult: false,
      tags: [],
      categories: [],
    };
  },

  methods: {
    getResult(filter_tag, filter_category) {
      this.tags = filter_tag;
      this.categories = filter_category;
      this.wantResult = true;
    },
  },
};
</script>
