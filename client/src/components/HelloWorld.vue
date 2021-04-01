<template>
  <div class="container mt-5 mb-5">
    <h2 class="title is-1">What're games I should buy!?</h2>

    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary">
              <p class="title ml-2">Budget</p>
              <p class="subtitle ml-2">Show me you buck</p>

              <div class="select is-normal ml-2">
                <select v-model="budget">
                  <option value="499" selected>Less than 500฿</option>
                  <option value="1000">500฿ - 1000฿</option>
                  <option value="2000">More than 1000฿</option>
                </select>
              </div>
            </article>
          </div>

          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-danger">
              <p class="title ml-2">Age</p>
              <p class="subtitle ml-2">What's your age?</p>

              <div class="select is-normal ml-2">
                <select v-model="age">
                  <option value="17" selected>Less than 18</option>
                  <option value="30">More than 18</option>
                </select>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-warning">
              <p class="title">Categories</p>
              <p class="subtitle">Play Categories</p>

              <div class="select is-normal">
                <select v-model="category">
                  <option value="0" selected disabled>Select categories</option>
                  <option
                    v-for="category in categories"
                    :key="category.name"
                    :value="category.name">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </article>
          </div>
        </div>

        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Tags</p>
              <p class="subtitle">Bruh bruh bruh....</p>

              <div class="select is-normal">
                <select v-model="tag">
                  <option value="0" selected disabled>Select tags</option>
                  <option
                    v-for="tag in tags"
                    :key="tag.name"
                    :value="tag.name">
                    {{ tag.name }}
                  </option>
                </select>
              </div>
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child notification is-danger">
              <p class="title">Let's Go!</p>
              <p class="subtitle">Find game for ME!</p>

              <button class="button is-success" @click="findResult">
                Find games!
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      tags: [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
        { id: 3, name: "Casual" },
        { id: 4, name: "Experimental" },
        { id: 5, name: "Puzzel" },
        { id: 6, name: "Racing" },
        { id: 7, name: "RPG" },
        { id: 8, name: "Simulation" },
        { id: 9, name: "Sports" },
        { id: 10, name: "Strategy" },
        { id: 11, name: "Tabletop" },
        { id: 12, name: "Indie" },
      ],
      categories: [
        { id: 1, name: "Single-player" },
        { id: 2, name: "Multi-player" },
        { id: 3, name: "Co-op" },
      ],
      tag: 0,
      category: 0,
      budget: 499,
      age: 17,
    };
  },

  methods: {
    findResult() {
      const self = this

      window.eventBus.$emit(
        "getResult",
        self.tag,
        self.category,
        self.budget,
        self.age
      );

      /*
      for(let i = 0; i < 1000; i++) {
        this.randomMockUp()
      }

      alert("Mockup Successful.")
      */
    },
    randomMockUp() {
      const tagIndex      = Math.floor(Math.random() * 12)
      const categoryIndex = Math.floor(Math.random() * 3)

      let tmpTag      = this.tags[tagIndex]
      let tmpCategory = this.categories[categoryIndex]
      let tmpBudget   = Math.floor(Math.random() * 3)
      let tmpAge      = Math.floor(Math.random() * 2)

      switch (tmpBudget) {
        case 0: tmpBudget = 499; break
        case 1: tmpBudget = 1000; break
        case 2: tmpBudget = 2000; break
      }

      switch (tmpAge) {
        case 0: tmpAge = 17; break
        case 1: tmpAge = 30; break
      }

      window.eventBus.$emit(
        "getResult",
        tmpTag.name,
        tmpCategory.name,
        tmpBudget,
        tmpAge
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
