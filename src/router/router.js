import index from '@/pages/index'
import detail from '@/pages/detail'

const routers = [{
    path: '/',
    name: 'index',
    component: index
}, {
    path: '/detail',
    name: 'detail',
    component: detail
}]

export default routers