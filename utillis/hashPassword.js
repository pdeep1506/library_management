import CryptoJS from "crypto-js";


export const hashPassword = (password)=>{
    var ciphertext = CryptoJS.AES.encrypt(password, process.env.SECREAT_KEY).toString();
    return ciphertext;
}

export const decryptPassword = (password)=>{
    console.log("password in decrypt  " , password)
    const bytes  = CryptoJS.AES.decrypt(password, process.env.SECREAT_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

