<template>
  <main class="request" :id="inputData.formId">
    <section class="question">
    <h1>{{inputData.title}}</h1>
      <request-form
      :items="inputData.items"
      :stepItemId="stepItemId"
      :result="result"
      :focusedItem="focusedItem"
      @validateForm="validateForm"
      ></request-form>
    </section>
    {{result}}
    <section class="control">
      <button class="prev"
      @click="stepItemId--"
      :disabled="stepItemId <= 1"
      >이전</button>
      <button class="next"
      @click="validateForm"
      :disabled="inputData.items.length == stepItemId"
      >다음</button>
      <button
      class="submit"
      type="submit"
      v-if="stepItemId == inputData.items.length"
      >제출</button>
    </section>
  </main>
</template>

<script>
import input from '@/assets/input';
import requestForm from '@/components/requestForm.vue';

export default {
  name: 'home',
  components: { requestForm },
  data() {
    return {
      inputData: input,
      stepItemId: 1,
      result: {
        id: 1,
        items: [{ id: 1, answer: [] }]
      },
      focusedItem: 0
    };
  },
  created() {
    this.result.items = [];
    this.stepItemId = this.inputData.items[0].itemId;
    for (const idx in this.inputData.items) {
      const item = this.inputData.items[idx];
      this.result.items.push({
        id: item.itemId,
        answer: []
      })
    }
  },
  methods: {
    validateForm() {
      this.focusedItem = 0;

      for (const idx in this.result.items) {
        console.log(idx)
        const item = this.result.items[idx];
        console.log('여기', item, idx)
        if (this.stepItemId === item.id && item.answer.length <= 0) {
          this.focusedItem = item.id;
        }
      }

      if (this.focusedItem > 0) {
        alert('값을 입력해주세요!')
        return;
      }

      this.stepItemId++;
    },
    onSubmit() {
      this.validateForm();
      console.log(this.result)
    }
  }
};
</script>
