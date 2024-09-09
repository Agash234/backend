const CryptoJS = require('crypto-js');
const secretKey = process.env.SECRET_KEY

const encryptData = (data) => {
   
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptData, decryptData };