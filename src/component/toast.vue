<template>
    <div v-show="isShow">
        <div class="toast">
            <i class="fa fa-check" v-if="type=='success'"></i>
            <i class="fa fa fa-warning" v-else></i>
            <span>{{content}}</span>
        </div>
        <div class="cover"></div>
    </div>
</template>

<script>
    export default {
        name: "toast",
        data() {
            return {
                content: '评论成功',
                type: "success",
                isShow: false
            };
        },
        created() {
            this.$root.$on("EVENT_SHOWTOAST", (params) => {
                this.$set(this.$data, "content", params.content);
                this.$set(this.$data, "type", params.type);
                this.$set(this.$data, "isShow", true);
                let time = 1200;
                if (params.time) {
                    time = params.time;
                }
                setTimeout(() => {
                    this.$set(this.$data, "isShow", false);
                }, time);
            });
        }
    };
</script>

<style scoped>
    .toast {
        position: fixed;
        z-index: 10001;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        max-width: 50%;
        text-align: center;
        background-color: black;
        color: white;
        opacity: 0.8;
        border-radius: 10px;
    }

    .toast span {
        display: block;
        margin-top: 10px;
    }

    .toast i {
        font-size: 50px;
        color: white;
        font-weight: 100;
    }

    .cover {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
        background-color: black;
        opacity: 0.5;
        z-index: 10000;
    }
</style>