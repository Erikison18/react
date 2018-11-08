import RouterLoadable from '@common/routerLoadable';

let AuthLayout = RouterLoadable({
    loader: () =>
        import ('@components/layout/authLayout/authLayout.jsx'),
});

let UnAuthLayout = RouterLoadable({
    loader: () =>
        import ('@components/layout/unAuthLayout/unAuthLayout.jsx'),
});

let Complex = RouterLoadable({
    loader: () =>
        import ('@components/layout/complex/complex.jsx'),
});

let WorkHome = RouterLoadable({
    loader: () =>
        import ('@components/workHome/workHome.jsx'),
});

let Personage = RouterLoadable({
    loader: () =>
        import ('@components/workHome/personage/personage.jsx'),
});

let Project = RouterLoadable({
    loader: () =>
        import ('@components/workHome/project/project.jsx'),
});

let ErrorComponent = RouterLoadable({
    loader: () =>
        import ('@components/common/error'),
});

export default [{
    path: '/auth/:id',
    component: AuthLayout,
    routes: [{
        path: '/auth/:id/workhome',
        component: WorkHome,
        routes: [{
            path: '/auth/:id/workhome/personage',
            component: Personage,
        }, {
            path: '/auth/:id/workhome/project',
            component: Project,
        }]
    }]
}, {
    path: '/unauth',
    component: UnAuthLayout
}, {
    path: '/complex',
    component: Complex
}, {
    path: '/',
    redirect: '/auth/123/workhome'
}, {
    path: '/error',
    exact: true,
    component: ErrorComponent
}]