import  withInstall  from '@mono/common/js/withInstall.js';
import input from './index.vue';

// 导出 install
const Input = withInstall(input);
// 导出button组件
export default Input;