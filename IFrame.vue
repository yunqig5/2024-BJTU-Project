﻿<!--
 * @Author: Huyanger
 * @Date: 2024-4-15
 * @FilePath: \wh\src\views\IFrame.vue
-->
<template>
    <div
        v-loading="load"
        element-loading-text="Trying Hard"
        element-loading-spinner="el-icon-loading"
    >
        <iframe ref="iframe" :src="props.url" frameborder="0"></iframe>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { nav_height } from "@/styles/variables.scss.js";

const props = defineProps({
    url: { type: String },
});
const load = ref(true);
const iframe = ref(null);

const setLoad = () => {
    const $onLoad = () => {
        load.value = false;
    };
    if (iframe.value.attachEvent) {
        iframe.value.attachEvent("onload", $onLoad);
    } else {
        iframe.value.onload = $onLoad;
    }
};

onMounted(() => {
    setLoad();
});
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: calc(100vh - v-bind(nav_height) - 83px);
}
</style>
