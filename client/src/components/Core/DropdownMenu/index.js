import Loadable from '@hocs/utils/Loadable';

const AsyncComponent = Loadable.Component(() => import('./component'))({
  loading: () => '',
});

export default AsyncComponent;
