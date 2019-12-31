# feige_fiat_shamir
The Legend Finance Nodejs implementation of the Feige-Fiat-Shamir (FFS) zero-knowledge verification protocol.

This npm package is used as part of the Legend Finance application. A detailed readme is coming soon. Meanwhile, here is some background on its usage (mode detail in https://github.com/Legend-Finance/smart-contracts):

##### Feige-Fiat-Shamir (FFS) Withdrawals

![](https://i.imgur.com/DBqvTwd.png)


FFS withdrawals allow users to withdraw their funds back to their `redeemAddress` without using the Legend Finance web application. This requires the user's Recovery Code and use of the Legend FFS library.

FFS withdrawals are done in 3 steps:
1) `beginAuthentication` - opens an FFS proof session
2) `createAuthParams` - generates authentication parameters
3) `withdrawErc20`/`withdrawEth` - initiates a withdrawal

```javascript
beginAuthentication(address depositEndpoint, uint256 x) → uint256 (public)
```
This function starts the FFS authentication process and sets up the smart contract to anticipate an FFS zero-knowledge proof. `ZkAccountLedger` records `x` (calculated off-chain using the  Legend FFS Library), current block number, and the public key for the sender of the withdrawal transaction. The public key is stored to prevent bad actors from supplying an incorrect proof, in an attempt to disrupt the withdrawal process. 
```javascript
createAuthParams(address depositEndpoint, uint256 authIndex) → uint32[] params (public)
```
This function generates authentication parameters, preparing `ZkAccountLedger` to receive `y` and finish the proof process.

```javascript
withdrawErc20(uint256 y, address depositEndpoint, address asset, uint256 amount, uint256 authIndex) → uint256 (public)

withdrawEth(uint256 y, address depositEndpoint, uint256 amount, uint256 authIndex) → uint256 (public)
```
These functions perform FFS based withdrawal, sending the specified assets back to the user’s `redeemAddress`. The proof `y` needs to be generated off-chain using the [Legend FFS library](https://www.npmjs.com/package/@cryptolegend/legend_feige_fiat_shamir).
