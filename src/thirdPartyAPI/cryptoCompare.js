import request from "./cyptocompareRequest";

export const CryptoCompareApi = {

  /**
   * 取得幣種清單的價格
   * @param {*} coins 幣種清單
   * @returns 幣種清單的價格
   */
  GetCoinsUsdPrice: async (coins) => {
    return await request({
      url: `data/pricemulti?fsyms=${coins}&tsyms=USD`,
      method: 'POST'
    }).then((res) => {
      const response = res ? 
      Object.entries(res).map(([name, price]) => {
        return { coinName: name, coinPrice: price.USD ? price.USD : 0 }
      }) : res;

      return response;
    })
  },
    /**
   * 取得幣種詳情
   * @param {*} coins 幣種清單
   * @returns 幣種清單的詳情
   */
  GetCoinsDetails: async (coins) => {
    return await request({
      url: `data/pricemultifull?fsyms=${coins}&tsyms=USD`,
      method: 'POST'
    }).then((res) => {
      const response = res ? 
      Object.entries(res.RAW).map(([name, value]) => {
        return { coinName: name, coinPrice: value.USD ? value.USD.PRICE : 0, coin24hourChange: value.USD ? value.USD.CHANGEPCT24HOUR : 0 }
      }) : res;
      return response;
    })
  }
}