<template>
  <div
    class="container mt-1"
    style="margin-bottom: 2em"
    v-if="gameList.length > 0"
  >
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
  components: {
    StarRating,
  },
  mounted() {
    window.eventBus.$on("getResult", this.getResult);
  },

  data() {
    return {
      gameList: [],
      gameByFilter: [],
      tags: [],
      categories: [],
      budget: 0,
      age: 0,
    };
  },

  methods: {
    async getResult(filter_tag, filter_category, filter_budget, filter_age) {
      console.log("get res");
      this.gameList = await Steam.getAllGames();
      this.tags = filter_tag;
      this.categories = filter_category;
      this.budget = filter_budget;
      this.age = filter_age;
      this.filterByTags();
      this.filterByCategories();
      this.filterByBudget();
      this.filterByAge();
    },
    filterByTags() {
      console.log(Object.keys(this.tags).length);
      this.gameByFilter = this.gameList.filter((v) => {
        if (!("genres" in v.detail)) return false;

        let tagsName = this.tags.map((t) => t.name);
        let genres = v.detail.genres.map((g) => g.description);

        return tagsName.some((n) => genres.indexOf(n) >= 0);
      });
      console.log(this.gameByFilter);
      this.gameList = this.gameByFilter;
    },
    filterByCategories() {
      this.gameByFilter = this.gameList.filter((v) => {
        if (!("categories" in v.detail)) return false;

        let categoriesName = this.categories.map((c) => c.name);
        let categories = v.detail.categories.map((c) => c.description);
        return categoriesName.some((n) => categories.indexOf(n) >= 0);
      });
      // console.log(this.gameByFilter);
      this.gameList = this.gameByFilter;
    },
    filterByBudget() {
      this.gameByFilter = this.gameList.filter((game) => {
        if (game.detail.is_free) return true;
        if (game.detail.price_overview.final / 100 <= this.budget) return true;
      });
      this.gameList = this.gameByFilter;
    },
    filterByAge() {
      this.gameByFilter = this.gameList.filter((game) => {
        if (game.detail.required_age <= this.age) return true;
      });
      this.gameList = this.gameByFilter;
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
.cs-tag {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.cs-tag span {
  margin: 2px 0;
}
</style>
