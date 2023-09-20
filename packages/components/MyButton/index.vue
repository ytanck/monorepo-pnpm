<template>
  <button class="button" :class="typeClass">
    <slot></slot>
  </button>
</template>


<script setup name="MyButton">
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'default'
  }
})
const typeClass = computed(() => `button-${props.type}`)
</script>

<style lang="less" scoped>
.button {
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;

  &-default {
    background-color: #eee;
    color: #333;
  }

  &-red {
    background-color: skyblue;
    border: 1px solid red;
  }
}
</style>
