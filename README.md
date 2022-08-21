## Quick start

Clone this repo. Install Foundry:

```
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

> You can run `foundryup` periodically to get the latest and greatest version.
> Foundry has three main parts: `forge` is for compiling, testing, and running
> contracts written in Solidity. `cast` is a Swiss army knife for interacting
> with Ethereum and the EVM. Finally, `anvil` is a local Ethereum node built for
> development.

Next, create your contracts package.

```
mkdir -p package/contracts
cd package/contracts
forge init --no-commit
```

Run `forge test`. This compiles a sample contract, a sample test, both written in Solidity, and runs the tests.

Make a commit.

## Next steps

Next, we'll make sure all systems are working:
- VSCode configured correctly
- Edit the contract and run `forge build`
- Edit the tests and run `forge test`
- Use `forge script` to deploy.
- Use `--verify` to verify to Etherscan.
- Finally, we'll use the Etherscan UI to run the live contract.


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
