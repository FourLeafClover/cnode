<template>
    <img src="../assets/img/empty.png" :class="{vclass:true}" :style="styles" />
</template>
<script>
    export default {
        name: "v-empty",
        props: {
            styles: {
                type: Object,
                default: () => {
                    return {
                        'width': '60%',
                        'margin-left': '50%',
                        'transform': 'translateX(-50%)',
                        'margin-top': '40px'
                    }
                }
            }
        }
    }
</script>