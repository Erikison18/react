import React from 'react';

import {
    Redirect
} from 'react-router-dom';
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

let AMap = RouterLoadable({
    loader: () =>
        import ('@components/aMap/aMap.jsx'),
});

let ErrorComponent = RouterLoadable({
    loader: () =>
        import ('@components/common/error'),
});

const routes = [{
path: '/auth/:id',
    component: AuthLayout,
    routes: [{
        path: '/auth/:id/workhome',
        component: WorkHome,
        routes: [{
            path: '/auth/:id/workhome/personage',
            component: Personage,
            exact: true
        }, {
            path: '/auth/:id/workhome/project',
            component: Project,
            exact: true
        }, {
            component: (props) => <Redirect to='/error'/>
        }]
    }]
}, {
    path: '/unauth',
    component: UnAuthLayout,
    exact: true
}, {
    path: '/complex',
    component: Complex,
    exact: true
}, {
    path: '/amap',
    component: AMap,
    exact: true
}, {
    path: '/',
    exact: true,
    component: (props) => <Redirect to='/login'/>
}, {
    path: '/error',
    exact: true,
    component: ErrorComponent
},{
    component: (props) => <Redirect to='/error'/>
}]


// if(process.env.NODE_ENV!=='production') {
//     let Demo = RouterLoadable({
//         loader: () =>
//             import ('@components/demo/demo.jsx'),
//     });
//     routes.unshift({
//         path: '/demo',
//         exact: true,
//         component: Demo
//     })
// }

export default routes