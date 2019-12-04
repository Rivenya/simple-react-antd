import { IConfig } from 'umi-types';
import path from 'path';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/user',
          component: '../layouts/loginLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'loginphone',
              path: '/user/loginphone',
              component: './user/loginphone',
            },
            {
              name: 'register',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ]
        },
        {
          path: '/',
          component: '../layouts/basicLayout',
          routes: [
            {
              name: 'dashboard',
              path: '/dashboard',
              component: './dashboard',
            },
            {
              name: 'form',
              path: '/form',
              component: './form',
            },
            {
              name: 'setting',
              path: '/account/setting',
              component: './account/setting',
            },
            {
              component: '404',
            },
          ]
        }
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      lessLoaderOptions: true,
      dynamicImport: { webpackChunkName: true },
      title: 'htgl',
      dll: false,
      locale: {
        enable: true,
        default: 'en-US',
      },
      rules: [
        {
          test: /\.less$/,
          loader: 'less-loader', // compiles Less to CSS
        },
      ],
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  alias: {
    '@': path.resolve('src'),
  },
  // proxy: {
  //   "/api": {
  //     "target": "http://jsonplaceholder.typicode.com/",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api": "" }
  //   }
  // }
}

export default config;
