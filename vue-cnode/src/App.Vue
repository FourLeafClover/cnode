<template>
      <div>
            <login />
            <toast/>
            <keep-alive>
                  <router-view></router-view>
            </keep-alive>
      </div>
</template>

<script>
      import login from "./component/login";
      import toast from "./component/toast";
      export default {
            name: "app",
            components: {
                  login: login,
                  toast: toast
            }
      };
</script>

<style>
      @import url("./assets/css/base.css");
</style>