<template>
  <main class="request" :id="inputData.formId">
    <h1>{{inputData.title}}</h1>
    <span id="step-guide">
    STEP {{stepItemId}} / {{inputData.items.length}}
    </span>
    <section class="question">
      <request-form
      :items="inputData.items"
      :stepItemId="stepItemId"
      :result="result"
      :focusedItem="focusedItem"
      @validateForm="validateForm"
      ></request-form>
    </section>
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
      @click='onSubmit'
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
    validateForm(type = undefined) {
      this.focusedItem = 0;

      for (const idx in this.result.items) {
        const item = this.result.items[idx];
        if (this.stepItemId === item.id && item.answer.length <= 0) {
          this.focusedItem = item.id;
        }
      }

      if (type !== 'submit') { this.stepItemId++; }
    },
    onSubmit() {
      this.validateForm('submit');
      const { id, items } = this.result;
      let answerItem = [];
      items.forEach((list, idx) => {
        let answerType = typeof list.answer;
        let subAnswer = (answerType === 'object') ? list.answer.join(',') : list.answer;
        answerItem[idx] = {
          id: list.id,
          answer: subAnswer
        }
      })

      const requestData = {
        id,
        items: answerItem
      }

      // 제출 버튼 클릭 시 결과값
      console.log(requestData)
    }
  }
};
</script>
