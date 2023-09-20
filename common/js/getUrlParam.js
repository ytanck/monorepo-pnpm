export default getUrlParam
// 截取url中的相应参数
function getUrlParam (url, name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.split('?')[1] ? (url.split('?')[1]).match(reg) : null;
    if (r != null) return r[2]; return null;
}