import { Toast } from 'mint-ui'

export default (text) => {
  if (window.AlipayJSBridge) {
    window.AlipayJSBridge.call('toast', {
      content: text,
      type: 'none',
      duration: 2000
    })
  } else {
    Toast({
      message: text,
      position: 'middle',
      duration: 2000
    })
  }
}
