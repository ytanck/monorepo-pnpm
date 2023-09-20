<template>
  <div>
    <h1>x:{{ x }}---y:{{ y }}</h1>
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Count++</button>
    <SButton type="primary">SButton</SButton>
    <SInput />
    <MyButton type="red">MyButton1</MyButton>
  </div>
</template>

<script setup>
import { useMouse } from "@vueuse/core";
import HelloWorld from "./components/HelloWorld.vue";
import SButton from "@mono/components/Button";
import SInput from "@mono/components/Input";
import MyButton from "@mono/components/MyButton/index.vue";
import baseFn from "@mono/common/js/baseFn";
import ajax from "@mono/common/js/ajax";

import { ref, onMounted } from "vue";
// 响应式状态
const count = ref(0);
const { x, y, sourceType } = useMouse();

// 用来修改状态、触发更新的函数
function increment() {
  // count.value++
  count.value = count.value + 1 * baseFn.fn(1);
}
const fetchData = async () => {
  const res = await ajax({
    url: "/api/xx",
    type: "GET",
    data: {
      a: 1,
    },
    // dataType: "json",
    // timeout: 10000,
    success: (res) => {},
    //异常处理
    error: function (e) {
      console.log(e);
    },
  });
};

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
});
</script>

<style scoped></style>
