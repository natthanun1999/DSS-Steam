<template>
  <div class="container mt-5 mb-5">
    <h2 class="title is-1">What're games I should buy!?</h2>

    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary">
              <p class="title">Budget</p>
              <p class="subtitle">Show me you buck</p>

              <input
                class="input ml-2"
                type="text"
                placeholder="Enter your budget"
                required
              />
            </article>
          </div>

          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-danger">
              <p class="title">Age</p>
              <p class="subtitle">What's your age?</p>

              <input
                class="input ml-2"
                type="text"
                placeholder="Enter your age"
                required
              />
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child notification is-warning">
              <p class="title">Categories</p>
              <p class="subtitle">Bottom tile</p>

              <div class="select">
                <select>
                  <option value="-1">Select Types</option>
                  <option value="1">Single Player</option>
                  <option value="2">Multi Player</option>
                  <option value="3">Both</option>
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

              <div style="display: flex">
                <div
                  class="block mr-2"
                  v-for="tag in tags"
                  :key="tag.name"
                  @click="toggle(tag)"
                >
                  <span class="tag is-success is-light" :id="tag.name">
                    {{ tag.name }}
                  </span>
                </div>
              </div>
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child notification is-danger">
              <div class="content">
                <button class="button is-success" @click="findResult">
                  Find games!
                </button>
              </div>
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
        { status: false, name: "Action" },
        { status: false, name: "Adventure" },
        { status: false, name: "Casual" },
        { status: false, name: "Experimental" },
        { status: false, name: "Puzzel" },
        { status: false, name: "Racing" },
        { status: false, name: "RPG" },
        { status: false, name: "Simulation" },
        { status: false, name: "Sports" },
        { status: false, name: "Strategy" },
        { status: false, name: "Tabletop" },
      ],
      category: "",
    };
  },

  methods: {
    toggle(tag) {
      tag.status = !tag.status;
      if (tag.status) {
        document.getElementById(tag.name).className = "tag is-success";
      } else {
        document.getElementById(tag.name).className = "tag is-success is-light";
      }
    },
    findResult() {
      let filter_tag = this.tags.filter((tag) => tag.status === true);
      console.log(filter_tag);
      window.eventBus.$emit("getResult", filter_tag);
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
.my-checkbox {
  width: 22%;
  height: 15%;
  color: white;
  background-color: gray;
  text-align: left;
  display: flex;
  align-items: center;
  border-radius: 3px;
}
.my-checkbox span {
  font-weight: bold;
  margin-left: 5px;
}
.tag:hover {
  cursor: pointer;
}
.content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
