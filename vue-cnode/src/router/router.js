import index from '@/pages/index'
import detail from '@/pages/detail'
import comment from "@/pages/comment"
import zone from "@/pages/zone"
import message from "@/pages/message"

const routers = [{
    path: '/',
    name: 'index',
    component: index
}, {
    path: '/detail',
    name: 'detail',
    component: detail
}, {
    path: '/topic/comment',
    name: 'topiccomment',
    component: comment
}, {
    path: "/user/:username",
    name: "userzone",
    component: zone
}, {
    path: "/message",
    name: "message",
    component: message
}]

export default routers