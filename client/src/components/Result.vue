<template>
  <div class="container mt-1" style="margin-bottom: 2em">
    <h2 class="title is-1">Result</h2>
    <div v-for="(game, index) in gameList" :key="game._id">
      <div
        class="box mb-5"
        v-if="
          game.review.total_reviews > 0 &&
            game.review.review_score_desc != 'Negative'
        "
      >
        <article class="media">
          <div class="media-left">
            <img :src="game.detail.header_image" />
          </div>
          <div class="media-content">
            <div class="content">
              <div class="block">
                <div class="level-left">
                  <label class="label">Game</label>
                </div>
                <div class="level-left">
                  <p>{{ index + 1 }}. {{ game.detail.name }}</p>
                </div>
              </div>
              <div class="block">
                <div class="level-left">
                  <label class="label">Categories</label>
                </div>
                <div class="level-left cs-tag">
                  <span
                    class="tag is-info mr-2"
                    v-for="category in game.detail.categories"
                    :key="category.id"
                  >
                    {{ category.description }}
                  </span>
                </div>
              </div>
              <div class="block">
                <div class="level-left">
                  <label class="label">Tag</label>
                </div>
                <div class="level-left">
                  <span
                    class="tag is-info mr-2"
                    v-for="tag in game.detail.genres"
                    :key="tag.id"
                  >
                    {{ tag.description }}
                  </span>
                </div>
              </div>
              <div class="block">
                <div class="level-left">
                  <star-rating
                    :max-rating="10"
                    :star-size="20"
                    :rating="game.review.review_score"
                    :read-only="true"
                  ></star-rating>
                </div>
              </div>
              <div class="block">
                <div class="level-left">
                  <label class="label">Price</label>
                </div>
                <div class="level-left">
                  <p v-if="game.detail.is_free">Free</p>
                  <p v-else-if="'price_overview' in game.detail">
                    {{ game.detail.price_overview.final_formatted }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Steam from "../api/steam.js";
import StarRating from "vue-star-rating";

export default {
  name: "Result",
  props: ["tags", "categories"],
  components: {
    StarRating,
  },
  mounted() {
    this.getAllGames();
  },

  data() {
    return {
      gameList: [],
      gameByFilter: [],
    };
  },

  methods: {
    async getAllGames() {
      this.gameList = await Steam.getAllGames();
      await this.filterByTags();
    },
    check() {
      this.tags;
    },
    filterByTags() {},
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
.cs-tag {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.cs-tag span {
  margin: 2px 0;
}
</style>
