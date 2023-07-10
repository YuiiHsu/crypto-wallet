import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ChainId, Token, WETH, Fetcher, Route, Trade, TokenAmount, TradeType } from "@uniswap/sdk";

const Swap = () => {
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  useEffect(() => {
    // 定义自定义 ERC20 代币的信息
    const ytcToken = {
      shortName: "YTC",
      contractAddress: '0xc90f257f009bB44adB7E96fa3427dab7479450eF',
      amount: 0,
      decimal: 18,
      isCustomCoin: true,
      networkId: 1337,
      chainName: "Yui Test Coin",
      symbol: "YTC",
      url: "http://127.0.0.1:7545"
    };

    // 创建 ERC20 代币对象
    const fromToken = new Token(ytcToken.networkId, ytcToken.contractAddress, ytcToken.decimal);
    const toToken = WETH[ytcToken.networkId];

    setFromToken(fromToken);
    setToToken(toToken);
  }, []);

  const handleSwap = async (event) => { 
    event.preventDefault();
    if (!fromToken || !toToken) {
      return;
    }

    // 创建 Provider 对象
    const provider = new ethers.providers.JsonRpcProvider(fromToken.url, {
      chainId: fromToken.networkId
    });

    // 获取交易对数据
    const pair = await Fetcher.fetchPairData(fromToken, toToken, provider);

    // 创建交易路径
    const route = new Route([pair], fromToken);

    // 创建交易对象
    const trade = new Trade(
      route,
      new TokenAmount(fromToken, ethers.utils.parseUnits(fromAmount.toString(), fromToken.decimals)),
      TradeType.EXACT_INPUT
    );

    // 获取交易输出金额
    const outputAmount = trade.outputAmount;

    setToAmount(outputAmount.toExact());
  };

  return (
    <div>
      <input type="number" value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} />
      <button onClick={handleSwap}>Swap</button>
      <div>{toAmount}</div>
    </div>
  );
};

export default Swap;




