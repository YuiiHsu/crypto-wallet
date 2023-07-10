const BigNumber = require('bignumber.js');

  /**
   * 將wei轉換成目標幣種單位
   * @param {*} weiValue 該幣種的幣值（wei）
   * @param {*} amountDecimal 目標幣種單位
   * @returns 目標幣種單位
   */
  function weiToAmount(weiValue, amountDecimal) {
    const weiDecimal = weiValue && hexToDecimal(weiValue);
    const value = weiDecimal && weiToTokenAmount(weiDecimal, amountDecimal);
    return value ?? 0;
  }

/**
 * 將 wei 轉換成該幣種的位數
 * @param {*} wei 十進位
 * @returns 該幣種的位數
 */
function weiToTokenAmount (weiValue, decimals) {
  const tokenAmount = new BigNumber(weiValue).dividedBy(10 ** decimals);
  return tokenAmount.toString();
}

/**
 * 將幣種轉成 wei
 * @param {*} amount 要轉乘成 wei 的值
 * @param {*} decimals 該幣種的位數
 * @returns 
 */
function amountToWei (amount, decimals) {
  const weiValue = amount * Math.pow(10, decimals);
  return weiValue;
}

/**
 * 十六進位轉十進位
 * @param {*} hex 十六進位
 * @returns 十進位
 */
function hexToDecimal(hex){
  const decimalValue = hex ? new BigNumber(hex).toString(10) : 0;
  
  return decimalValue;
}

/**
 * 十進位轉十六進位
 * @param {*} hex 十六進位
 * @returns 十進位
 */
function decimalToHex(value){
  const hexValue = value ? value.toString(16) : 0;
  
  return hexValue;
}

/**
 * 確認地址是否符合 ETH 格式
 * @param {*} address 
 * @returns bool
 */
function checkEthFormat(address) {
	const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
	return ethAddressRegex.test(address)
}

/**
 * 驗證數字是否符合為正數且不為0，並符合小數規則
 * @param {*} input 待驗證的數字
 * @param {*} decimalPlaces 小數位數
 * @returns 是否為
 */
function validateNumber(input, decimalPlaces) {
  const value = parseFloat(input);
  
  // 驗證是否為正數且不為零
  if (isNaN(value) || value <= 0) {
    return false;
  }
  
  // 驗證小數位數
  const decimalCount = (input.split('.')[1] || '').length;
  if (decimalCount > decimalPlaces) {
    return false;
  }
  
  return true;
}

export {
  weiToAmount,
  weiToTokenAmount,
  amountToWei,
  hexToDecimal,
  decimalToHex,
	checkEthFormat,
	validateNumber
}