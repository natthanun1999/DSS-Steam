<template>
  <!--
  <button type="button" class="button is-danger" @click="convert">Convert to CSV</button>\
  -->
  <div
    class="container mt-1"
    style="margin-bottom: 2em"
    v-if="gameList.length > 0"
  >
    <h2 class="title is-1">Result</h2>
    
    <button type="button" class="button is-danger" @click="convert">Convert to CSV</button>

    <div v-for="(game, index) in gameList" :key="game._id">
      <div
        class="box mb-5"
        v-if="game.review.total_reviews > 0"
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
              <div class="block">
                <div class="level-left">
                  <button class="button is-primary mr-3" type="button" @click="openGame(game.appid, 'Yes')">Interest</button>
                  <button class="button is-danger" type="button" @click="openGame(game.appid, 'No')">Nothing</button>
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
import { mockup, convertToCSV } from "../helpers/json2csv.js"

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
      tag: null,
      category: null,
      budget: 0,
      age: 0,
    };
  },

  methods: {
    async getResult(tag, category, budget, age) {
      this.gameList = await Steam.getAllGames();

      this.tag        = tag;
      this.category   = category;
      this.budget     = budget;
      this.age        = age;

      this.filterByTag();
      this.filterByCategory();
      this.filterByBudget();
      this.filterByAge();
      this.filterByScore();

      // Get top 5 ranks
      this.gameList = this.gameList.slice(0, 1)

      console.log("Query Success!")

      // let gameIndex = Math.floor(Math.random() * 5) + 1

      // this.openGame(gameIndex)
    },
    filterByTag() {
      this.gameByFilter = this.gameList.filter((v) => {
        if (!("genres" in v.detail)) return false;

        let genres = v.detail.genres.map((g) => g.description);

        return genres.indexOf(this.tag) >= 0
      });

      this.gameList = this.gameByFilter;
    },
    filterByCategory() {
      this.gameByFilter = this.gameList.filter((v) => {
        if (!("categories" in v.detail)) return false;

        let categories = v.detail.categories.map((c) => c.description);

        return categories.indexOf(this.category) >= 0
      });

      this.gameList = this.gameByFilter;
    },
    filterByBudget() {
      this.gameByFilter = this.gameList.filter((game) => {
        if (game.detail.is_free) return true;
        if (!("price_overview" in game.detail)) return false;
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
    filterByScore() {
      this.gameByFilter = this.gameList.sort((a, b) => {
        const diff_A = a.review.total_positive - a.review.total_negative
        const diff_B = b.review.total_positive - b.review.total_negative

        if ((diff_A - diff_B) < 1000) {
          const diff_Total = a.review.total_reviews - b.review.total_reviews

          if (diff_Total > 0) return -1;
          else if (diff_Total < 0) return 1;
          else return 0;
        }

        if (diff_A > diff_B) return -1;
        else if (diff_A < diff_B) return 1;
        else return 0;
      })

      this.gameList = this.gameByFilter;
    },
    openGame(appid, choose) {
      mockup(this.budget, this.age, this.category, this.tag, choose)

      console.log(`App id : ${appid}`)

      //window.open(`https://store.steampowered.com/app/${appid}`)
    },
    convert() {
      convertToCSV()
    }
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
