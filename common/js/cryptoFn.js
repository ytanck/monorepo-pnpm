import CryptoJS from "crypto-js"
//加密
export const encrypt = (message,aseKey) => {
    return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
}
//解密
export const decrypt = (encrypt,aseKey) => {
    return CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(aseKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
}