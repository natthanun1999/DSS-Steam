<template>
  <div class="container mt-5">
    <h2 class="title is-1">What're games I should buy!?</h2>

    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary">
              <p class="title">Budget</p>
              <p class="subtitle">Top tile</p>

              <input class="input ml-2  " type="text" placeholder="Enter your budget">
            </article>
            <article class="tile is-child notification is-warning">
              <p class="title">Game Type</p>
              <p class="subtitle">Bottom tile</p>

              <div class="select">
                <select>
                  <option>Select Types</option>
                  <option>Single Player</option>
                  <option>Multi Player</option>
                  <option>Both</option>
                </select>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Categories</p>
              <p class="subtitle">Bruh bruh bruh....</p>

              <div style="display: flex">
                <div class="block mr-2">
                  <span class="tag is-success">
                    Hello
                    <button class="delete is-small"></button>
                  </span>
                </div>

                <div class="block">
                  <span class="tag is-success">
                    World
                    <button class="delete is-small"></button>
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-danger">
            
            <div class="content">
              <button class="button is-success">Find games!</button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
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
</style>
