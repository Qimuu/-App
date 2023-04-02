const routes = [
    {
        name: 'home',
        path: '/',
        component: () => import('@/views/LoginPageView'),
        meta: {
            show: true
        }
    },
    {
        name: 'ClockView',
        path: '/ClockView',
        component: () => import('@/views/ClockView'),
        meta: {
            show: true
        }
    },
    {
        name: 'LoginPage',
        path: '/LoginPage',
        component: () => import('@/views/LoginPageView'),
        meta: {
            show: true
        }
    },
    {
        name: 'PunchPage',
        path: '/PunchPage',
        component: () => import('@/views/PunchPage'),
        meta: {
            show: true
        }
    },
    {
        name: 'About',
        path: '/AboutView',
        component: () => import('@/views/AboutView'),
        meta: {
            show: false
        }
    },
    {
        name: 'Calendar',
        path: '/CalendarView',
        component: () => import('@/views/CalendarView'),
        meta: {
            show: false
        }
    },
    {
        name: 'Admin',
        path: '/AdminView',
        component: () => import('@/views/AdminView'),
        meta: {
            show: false
        }
    },
    {
        name: 'Set',
        path: '/SetView',
        component: () => import('@/views/SetView'),
        meta: {
            show: false
        }
    },
    {
        name: 'OutPut',
        path: '/OutPutView',
        component: () => import('@/views/OutPutView'),
        meta: {
            show: false
        }
    },
    {
        name: 'PunchSuccess',
        path: '/PunchSuccessView',
        component: () => import('@/views/PunchSuccessView'),
        meta: {
            show: false
        }
    },
    {
        name: 'GameView',
        path: '/GameView',
        component: () => import('@/views/GameView'),
        meta: {
            show: true
        }
    },
    {
        name: 'toDoList',
        path: '/toDoListView',
        component: () => import('@/views/toDoListView'),
        meta: {
            show: false
        }
    },
    {
        name: 'PunchSuccess1',
        path: '/PunchSuccessView1',
        component: () => import('@/views/PunchSuccessView1'),
        meta: {
            show: false
        }
    },
    {
        name: 'PunchSuccess2',
        path: '/PunchSuccessView2',
        component: () => import('@/views/PunchSuccessView2'),
        meta: {
            show: false
        }
    },
    {
        name: 'PunchSuccess3',
        path: '/PunchSuccessView3',
        component: () => import('@/views/PunchSuccessView3'),
        meta: {
            show: false
        }
    },
    {
        name: 'newLogView',
        path: '/newLogView',
        component: () => import('@/views/newLogView'),
        meta: {
            show: false
        }
    },
];

export default routes
