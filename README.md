This is a minimalist Ethereum starter project.

It has fewer moving parts than things like scaffold-eth.

Start from `master` for a tutorial experience. You can also skip ahead:

- `step1` has a working contract
- `step2` adds a more thorough test
- `step3` shows deploys to a chain and verifies to Etherscan
- finally, `bonus-web-ui` adds a basic web UI using ethers and RainbowKit

## Quick start

Install Foundry:

```
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

> You can run `foundryup` periodically to get the latest and greatest version.
> Foundry has three main parts: `forge` is for compiling, testing, and running
> contracts written in Solidity. `cast` is a Swiss army knife for interacting
> with Ethereum and the EVM. Finally, `anvil` is a local Ethereum node built for
> development.

Clone this repo. `git clone ... && cd hello-foundry`.

Next, create your contracts package.

```
mkdir -p package/contracts
cd package/contracts
forge init --no-commit
```

Run `forge test`. This compiles a sample contract and test contract, both written in Solidity, and runs the tests.

Make a commit.

## Next steps

Next, we'll make sure all systems are working:

- VSCode configured correctly
- Edit the contract and run `forge build`
- Edit the tests and run `forge test`
- Use `forge script` to deploy.
- Use `--verify` to verify to Etherscan.
- Finally, we'll use the Etherscan UI to run the live contract.

## Edit and test

Modify the contract so that `increment()` increments by two instead of one.

The tests should now fail: `forge test -vvv`. You can always add `v`s to get more verbose output.

Fix the tests, and verify that they work again. For bonus points, use `vm.expectRevert` to test the case where the counter overflows.

## Deploy and verify

Rename the script to `Deploy.s.sol` and simply call the constructor to deploy
our contract:

```
vm.startBroadcast();
new Counter();
```

Now, we can deploy to a testnet.

**Prerequisite: set up Alchemy and Etherscan.** Create an account with Alchemy
and get your testnet RPC URL. I recommend the Goerli testnet. Create an account
with Etherscan and get your API key. Save both as environment variables.

**Create a burner wallet for deployment.** Save the hex private key. It goes
without saying, but this wallet should never hold significant value. Use it for
testnet operations. I use one with small amounts of eth for mainnet deployment.

In your shell (`.bashrc`/`.zshrc`/etc), add:

```
export ETH_RPC_API=<...>
export ETHERSCAN_API_KEY=<...>
export ETH_PK=<...>
```

1.  **Test the script locally**

    ```
    forge script DeployScript -f $ETH_RPC_URL
    ```

2.  **Deploy to testnet**

    ```
    forge script DeployScript -f $ETH_RPC_URL --broadcast --private-key=$ETH_PK
    ```

3.  **Verify to Etherscan**
    ```
    forge script DeployScript -f $ETH_RPC_URL --verify
    ```

## Links

**Foundry documentation**

- https://book.getfoundry.sh/
- https://github.com/foundry-rs/foundry
- https://t.me/foundry_support

**Example repos**

The root folder is clean. Foundry lives under `package/contracts`, while
other moving parts like the frontend live under other `package/` folders.

- https://github.com/nounsDAO/nouns-monorepo
- https://github.com/dcposch/silverportal
