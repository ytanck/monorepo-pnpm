// src/button/index.js
console.log(123);
import  withInstall  from '../../utils/withInstall';
import button from './index.vue';

// 导出 install
const Button = withInstall(button);
// 导出button组件
export default Button;
