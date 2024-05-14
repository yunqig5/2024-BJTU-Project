
export default [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue"),
    },
    // {
    //     path: "/",
    //     name: "AppMain",
    //     component: () => import("@/views/AppMain.vue"),
    //     redirect: { name: "Home" },
    //     children: [
    //         {
    //             path: "home",
    //             name: "Home",
    //             component: () => import("@/views/Home.vue"),
    //         },
    //     ],
    // }
];
