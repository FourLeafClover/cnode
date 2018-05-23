<template>
    <layout title="消息列表">
        <div class="detail">
            <div class="tabs">
                <div class="tab" :class="{'active':activeTab==1}" @click="changeTab(1)">
                    <span>未读消息[{{detail.hasnot_read_messages.length}}]</span>
                </div>
                <div class="tab" :class="{'active':activeTab==2}" @click="changeTab(2)">
                    <span>已读消息[{{detail.has_read_messages.length}}]</span>
                </div>
            </div>
            <div class="not_read" v-show="activeTab==1">
                <div class="item" v-for="item in detail.hasnot_read_messages" :key="item.id" @click="gotoDetail(item)">
                    <div class="avtar">
                        <img :src="item.author.avatar_url" /> {{item.author.loginname}} 回复了话题
                    </div>
                    <div class="title">
                        {{item.topic.title}}
                    </div>
                </div>
            </div>
            <div class="has_read" v-show="activeTab==2">
                <div class="item" v-for="item in detail.has_read_messages" :key="item.id" @click="gotoDetail(item)">
                    <div class="avtar">
                        <img :src="item.author.avatar_url" /> {{item.author.loginname}} 回复了话题
                    </div>
                    <div class="title">
                        {{item.topic.title}}
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>
<script>
    import BScroll from "better-scroll";
    import layout from "../component/layout1";
    import userSvc from "../service/user";
    export default {
        data() {
            return {
                detail: {
                    hasnot_read_messages: [],
                    has_read_messages: []
                },
                activeTab: 1
            };
        },
        components: {
            layout: layout
        },
        created() {},
        methods: {
            changeTab(tab) {
                this.$set(this.$data, "activeTab", tab);
            },
            gotoDetail(item) {
                userSvc.readMessage(item.id, () => {
                    this.$root.$emit("EVENT_RELOADMESSAGECOUNT");
                    this.$router.push({
                        path: "/detail",
                        query: {
                            id: item.topic.id
                        }
                    });
                });
            }
        },
        activated() {
            userSvc.loadMessage((result) => {
                this.$set(this.$data, "detail", result);
            });
        }
    };
</script>
<style scoped>
    .detail {
        padding-top: 100px;
    }

    .tabs {
        height: 50px;
        position: fixed;
        top: 40px;
        width: 100%;
        background-color: white;
        border-bottom: 1px solid #f4f5f5;
    }

    .tabs .tab {
        width: 50%;
        text-align: center;
        float: left;
        padding: 10px;
        color: gray;
    }

    .tabs .tab.active span {
        color: #22c3aa;
        border-bottom: 2px solid #22c3aa;
        padding-bottom: 5px;
    }

    .item {
        margin-bottom: 10px;
        padding: 0px 20px;
        background-color: white;
    }

    .item .avtar img {
        border: 0;
        vertical-align: middle;
        width: 25px;
        border-radius: 50%;
        margin-top: -6px;
    }

    .item .avtar {
        padding-top: 5px;
        font-size: 15px;
        color: gray;
        line-height: 35px;
        padding-bottom: 10px;
    }

    .item .title {
        padding-bottom: 10px;
    }
</style>