import {JSEncrypt} from 'jsencrypt';

export const encrypt = (text: string, publicKey: string): string => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(text) as string // 返回 Base64 编码的加密数据
}
