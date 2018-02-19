<template>
     <layout>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
     </layout>
</template>

<script>
import layout from "./component/layout";
export default {
  name: "app",
  components: {
    layout: layout
  }
};
</script>

<style>
@import url("./assets/css/base.css");
</style>



