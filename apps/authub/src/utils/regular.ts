export const EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export const URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/

export const USERNAME = /^[a-zA-Z]([a-zA-Z0-9_]+)?$/;

export const PASSWORD = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~].*).{6,18}$/

export const CODE = /^\d{6}$/;

export const PHONE = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;

export const NUMBER = /^(0|[1-9][0-9]*)$/
