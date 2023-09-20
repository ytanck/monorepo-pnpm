export default getParams;

function getParams(key, paramsStr, nullRes = null) {
    if (!paramsStr) {
        return nullRes;
    }
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = paramsStr.match(reg);
    if (r != null) return unescape(r[2]);
    return nullRes;
}