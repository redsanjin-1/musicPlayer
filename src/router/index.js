import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        // 使用 resolve 异步加载组件 ，加快首屏渲染速度
        component: resolve => require(['@/components/axios'], resolve)
    }, {
        path: '/goods',
        component: resolve => require(['@/components/goods'], resolve),
        children: [{
            path: 'tabOne',
            component: resolve => require(['@/components/tabOne'], resolve)
        }, {
            path: 'tabTwo',
            component: resolve => require(['@/components/tabTwo'], resolve)
        }]
    }, {
        path: '/ratings',
        component: resolve => require(['@/components/ratings'], resolve)
    }, {
        path: '/seller',
        component: resolve => require(['@/components/seller'], resolve)
    }, {
        path: '/axios',
        component: resolve => require(['@/components/axios'], resolve)
        // （ 方法一 ）配置 keepAlive 属性 缓存 该组件  
        // meta: {
        //     keepAlive: true
        // }
    }],
    // 定义组件切换时 css 样式的名称
    linkActiveClass: 'active'
})
