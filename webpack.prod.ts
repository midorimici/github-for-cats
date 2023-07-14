import type { Configuration } from 'webpack';
import { config } from './webpack.config';

export default (): Configuration => {
  return {
    mode: 'production',
    ...config,
  };
};
