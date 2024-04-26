<!--
 * @Author: Huyanger
 * @Date: 2024-4-13
 * @FilePath: \wh\src\views\Home.vue
-->



<template>
    <div class="ve_home">
        <el-row>
            <el-col :span="16">
                <dashboard />
            </el-col>
            <el-col :span="8">
<!--                <el-calendar class="ve_calendar"></el-calendar>-->
            </el-col>
        </el-row>
        <live-chart />
    </div>
</template>

<script setup>
import dashboard from "@/components/dashboard/Shortcuts";
import LiveChart from "@/components/dashboard/LiveChart";
</script>
