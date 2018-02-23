import index from '@/pages/index'
import detail from '@/pages/detail'
import comment from "@/pages/comment"
import zone from "@/pages/zone"

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
    path: "/usr/:username",
    name: "userzone",
    component: zone
}]

export default routers