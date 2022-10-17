/**
 * 用户输入内容验证类
 */

// 是否为空
export const isEmpty = (str) => {
  return str.trim() == '';
};

/**
 * 匹配phone
 */
export const isPhone = (str) => {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
  return reg.test(str);
};

/**
 * 匹配移动手机号
 */
export const isMobile = (str) => {
  const reg = /^(1[3456789]\d{9})$/;
  return reg.test(str);
};

/**
 * 匹配Email地址
 */
export const isEmail = (str) => {
  if (str == null || str == '') return false;
  const result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (result == null) return false;
  return true;
};

/**
 * 判断数值类型，包括整数和浮点数
 */
export const isNumber = (str) => {
  if (isDouble(str) || isInteger(str)) return true;
  return false;
};

/**
 * 判断是否为正整数(只能输入数字[0-9])
 */
export const isPositiveInteger = (str) => {
  return /(^[0-9]\d*$)/.test(str);
};

/**
 * 匹配integer
 */
export const isInteger = (str) => {
  if (str == null || str == '') return false;
  const result = str.match(/^[-\+]?\d+$/);
  if (result == null) return false;
  return true;
};

/**
 * 匹配double或float
 */
export const isDouble = (str) => {
  if (str == null || str == '') return false;
  const result = str.match(/^[-\+]?\d+(\.\d+)?$/);
  if (result == null) return false;
  return true;
};

/**
 * 验证电子邮箱格式
 */
export const email = (value) => {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
};

/**
 * 验证手机格式
 */
export const mobile = (value) => {
  return /^1[3456789]\d{9}$/.test(value);
};

/**
 * 验证URL格式
 */
export const url = (value) => {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
};

/**
 * 验证日期格式
 */
export const date = (value) => {
  return !/Invalid|NaN/.test(new Date(value).toString());
};

/**
 * 验证ISO类型的日期格式
 */
export const dateISO = (value) => {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
};

/**
 * 验证十进制数字
 */
export const number = (value) => {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
};

/**
 * 验证整数
 */
export const digits = (value) => {
  return /^\d+$/.test(value);
};

/**
 * 验证身份证号码
 */
export const idCard = (value) => {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
};

/**
 * 是否车牌号
 */
export const carNo = (value) => {
  // 新能源车牌
  const xreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
};

/**
 * 金额,只允许2位小数
 */
export const amount = (value) => {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
};

/**
 * 中文
 */
export const chinese = (value) => {
  const reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
};

/**
 * 只能输入字母
 */
export const letter = (value) => {
  return /^[a-zA-Z]*$/.test(value);
};

/**
 * 只能是字母或者数字
 */
export const enOrNum = (value) => {
  //英文或者数字
  const reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
};

/**
 * 验证是否包含某个值
 */
export const contains = (value, param) => {
  return value.indexOf(param) >= 0;
};

/**
 * 验证一个值范围[min, max]
 */
export const range = (value, param) => {
  return value >= param[0] && value <= param[1];
};

/**
 * 验证一个长度范围[min, max]
 */
export const rangeLength = (value, param) => {
  return value.length >= param[0] && value.length <= param[1];
};

/**
 * 是否固定电话
 */
export const landline = (value) => {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
};

/**
 * 是否json字符串
 */
export const jsonString = (value) => {
  if (typeof value == 'string') {
    try {
      const obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
};

/**
 * 是否数组
 */
export const array = (value) => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

/**
 * 是否对象
 */
export const object = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

/**
 * 是否短信验证码
 */
export const code = (value, len = 6) => {
  return new RegExp(`^\\d{${len}}$`).test(value);
};
