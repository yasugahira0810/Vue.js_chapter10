<template>
  <form
    class="task-detail-form"
    novalidate
  >
    <div class="form-item">
      <label for="task-name">タスク名</label>
      <input
        id="task-name"
        v-model="task.name"
        type="text"
      >
    </div>
    <div class="form-item">
      <label for="task-description">説明</label>
      <textarea
        id="task-description"
        v-model="task.description"
      />
    </div>
    <div class="form-actions">
      <KbnButton
        :disabled="progress"
        @click="handleClick"
      >
        更新
      </KbnButton>
      <p
        v-if="progress"
        class="update-progress"
      >
        更新中...
      </p>
      <p
        v-if="error"
        class="update-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnTaskDetailFrom',

  components: {
    KbnButton
  },

  props: {
    task: {
      type: Object,
      required: true,
      default: () => {}
    },
    onupdate: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      progress: false,
      error: ''
    }
  },

  methods: {
    handleClick (ev) {
      // 更新処理されている最中に実行されないようガード
      if (this.progress) { return }

      this.progress = true // 更新処理実行中

      this.$nextTick(() => {
        this.onupdate(this.task)
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
      })
    }
  }
}
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
label {
  display: block;
}
input, textarea {
  width: 99%;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
