import base from './next.config.mjs';

const buildConfig = { ...base, distDir: '.next-ci' };

export default buildConfig;
