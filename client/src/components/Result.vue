<template>
  <div class="container mt-1 " style="margin-bottom: 2em;">
    <h2 class="title is-1">Result</h2>

    <div class="box" v-for="game in gameList" :key="game.name">
      <article class="media">
        <div class="media-left">
          <img
            src="https://bulma.io/images/placeholders/640x320.png"
            alt="Image"
          />
        </div>
        <div class="media-content">
          <div class="content">
            <div class="block">
              <div class="level-left">
                <label class="label">Game</label>
              </div>
              <div class="level-left">
                <p>{{ game.name }}</p>
              </div>
            </div>
            <div class="block">
              <div class="level-left">
                <label class="label">Catagories</label>
              </div>
              <div class="level-left">
                <span class="tag is-info">Single Player</span>
              </div>
            </div>
            <div class="block">
              <div class="level-left">
                <label class="label">Tag</label>
              </div>
              <div class="level-left">
                <span class="tag is-info mr-2">Action</span>
                <span class="tag is-info mr-2">Battle Royal</span>
              </div>
            </div>
            <div class="block">
              <div class="level-left">
                <label class="label">Price</label>
              </div>
              <div class="level-left">
                <p>9999</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
      gameList: [
        {
          name: "game1",
        },
        {
          name: "game2",
        },
        {
          name: "game3",
        },
        {
          name: "game4",
        },
        {
          name: "game5",
        },
      ],
    };
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
