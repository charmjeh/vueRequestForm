<template>
    <section id="states">
        <form class="form-horizontal" method="post"
          v-for="(item, idx) in items" :key="idx"
        >
          <fieldset
          ref="item.itemId"
          v-show="item.itemId == stepItemId"
          >
            <h2>{{stepItemId}}. {{item.title}}</h2>
            <section v-show="stepItemId == 1">
              <div class="form-group"
                v-for="(option, idx) in item.options"
                :key="idx"
              >
              <input
                type="checkbox"
                v-model="result.items[item.itemId - 1].answer"
                :id="option.text"
                :value="option.text"
                required
              />
              <label
              :for="option.text"
              class="control-label"
              >{{option.text}}</label>
              </div>
            </section>
            <section v-show="stepItemId == 2">
              <div class="form-group"
                v-for="(option, idx) in item.options"
                :key="idx"
              >
              <input
                type="radio"
                :name="'itemId' + item.itemId"
                v-model="result.items[item.itemId - 1].answer"
                :id="option.text"
                :value="option.text"
                required
              />
              <label
              class="control-label">{{option.text}}</label>
              </div>
            </section>
            <section v-show="stepItemId == 3">
              <div>
              <input
                type="text"
                :name="'itemId' + item.itemId"
                v-model="result.items[item.itemId - 1].answer"
                required
              />
              </div>
            </section>
            <section v-show="stepItemId == 4">
              <select
              v-model="result.items[item.itemId - 1].answer"
              :name="'itemId'+item.itemId">
              <option
                type="radio"
                v-for="(option, idx) in item.options"
                :key="idx"
                :id="item.itemId"
                required
              >{{option.text}}</option>
              </select>
            </section>
          </fieldset>
        </form>
    </section>
</template>

<script>
export default {
  name: 'requestForm',
  props: {
    items: Array,
    stepItemId: Number,
    result: Object,
    focusedForm: Number
  }
};
</script>

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
