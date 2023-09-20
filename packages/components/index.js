// import SButton from './Button'
// import SInput from './input'

// const components = [
//   SButton
// ]

// // Vue.component的写法
// const install = (Vue) => {
//   components.forEach(component => {
//     Vue.component(component.name, component)
//   })
// }

// // Vue.use()写法
// const install = {
//   install: app => components.forEach(c => app.use(c)),
// }

// export { SButton }
// export default install
export { default as SButton } from './Button/index.vue';
export { default as SInput } from './Input/index.vue';