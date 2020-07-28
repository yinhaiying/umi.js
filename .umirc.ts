import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/mock', component: '@/pages/mock' },
    { path: '/use_effect', component: '@/pages/use_effect' },
    { path: '/use_reducer', component: '@/pages/use_reducer' },
  ],
});
