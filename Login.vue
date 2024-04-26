<!--
 * @Author: Huyanger
 * @Date: 2024-4-14
 * @FilePath: \wh\src\views\Login.vue
-->
<template>
    <common>
        <div class="ve_container">
            <el-card :body-style="{ background: 'rgba(0,0,0,0.15)' }">
                <h1>登录</h1>
                <transition name="el-fade-in-linear">
                    <el-form :model="form" :rules="rules" v-show="!success" class="ve_form" ref="ref_form"
                        :inline="false" @keyup.enter="onSubmit">
                        <el-form-item prop="userName">
                            <el-input v-model.trim="userName" placeholder="USERNAME">
                                <template #prepend>
                                    <el-icon :size="20">
                                        <Avatar />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input v-model.trim="pwd" show-password placeholder="密码">
                                <template #prepend>
                                    <el-icon :size="20">
                                        <Key />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="ve_submit" round type="primary" @click="onSubmit">
                                Login
                            </el-button>
                        </el-form-item>
                    </el-form>
                </transition>
            </el-card>
        </div>
    </common>
</template>

<script setup>
import { SET_TOKEN, SET_UNAME } from "@/store/modules/app/type";
import Common from "@/components/Common";
import { ref, reactive, toRefs } from "vue";
import axios from "axios";
import { ElMessage } from 'element-plus';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const rules = {
    userName: [{ required: true, message: "Please type your username", trigger: "blur" }],
    pwd: [{ required: true, message: "Please type your password", trigger: "blur" }],
};
const store = useStore();
const router = useRouter();
const form = reactive({
    userName: "Tom",
    pwd: "123",
});
const { userName, pwd } = toRefs(form);
const ref_form = ref(null);
const success = ref(false);
sessionStorage.clear();
store.dispatch(`app/${SET_TOKEN}`, "");
router.options.isAddDynamicMenuRoutes = false;

const onSubmit = () => {
    ref_form.value.validate((valid) => {
        if (valid) {
            let user = { managerName: userName.value, managerPassword: pwd.value }
            axios.post("http://localhost:9090/manager/login", user).then(res => {
                console.log(res);
                store.dispatch(`app/${SET_UNAME}`, user.managerName);
                store.commit
                switch (res.data) {
                    case -1: {
                        ElMessage.error("INVALID PASSWORD!");
                        break;
                    }
                    case 1: {
                        ElMessage.error("PASSWORD ERROR!");
                        break;
                    }
                    case 2: {
                        ElMessage.error("USERNAME NOT FOUND!");
                        break;
                    }
                    case 0: {
                        login();
                        router.push({ name: "AppMain" });
                    }
                }
            })
        } else {
            return;
        }
    })
}
const login = async () => {
    const data = await VE_API.system.login(form);
    router.push({ name: "AppMain" });
}

</script>

<style lang="scss" scoped>
.ve_container {
  position: absolute;
  z-index: 1;
  width: 400px;
  top: 50%; /* 垂直中心 */
  left: 50%; /* 水平中心 */
  transform: translate(-50%, -50%); /* 向上和向左移动50%的自身高度和宽度以达到完全居中 */
  background-color: black; /* 设置背景颜色为黑色 */
  min-height: 273px;
  text-align: center;

    h1 {
        font-size: 24px;
        transition: all 1s;
        font-weight: bold;
        margin-bottom: 36px;
    }

    .ve_form {
        .ve_submit {
            width: 100%;
          background-color: black;
        }

        :deep(.el-input-group__prepend) {
            padding: 0 10px;
          background-color: black;
        }
    }
}
</style>
