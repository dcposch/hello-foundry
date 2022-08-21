import "@rainbow-me/rainbowkit/styles.css";
import "./Main.css";

import { Signer } from "ethers";
import * as React from "react";
import { useMemo } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Provider } from "@wagmi/core";
import { useProvider, useSigner } from "wagmi";
import { Counter, factories } from "../../types/ethers-contracts";

const contractAddr = "0x50afdfb4fde5878f33aa0b2d380e1141859e15c8";
const etherscanUrl = "https://ropsten.etherscan.io/address/" + contractAddr;

export default function Main() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const counterContract = useMemo(
    function () {
      return factories.Counter__factory.connect(
        contractAddr,
        signer || provider
      );
    },
    [provider, signer]
  );

  return (
    <main>
      <h1>Hello world</h1>
      <ConnectButton />
      <CounterDisplay counterContract={counterContract} />
    </main>
  );
}

interface Props {
  counterContract: Counter;
}

export class CounterDisplay extends React.PureComponent<Props> {
  state = { counter: 0 };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    setInterval(this.reload, 5000);
  }

  reload = async () => {
    console.log("Load the counter from chain state...");
    const num = await this.props.counterContract.number();
    this.setState({ counter: num.toNumber() });
  };

  render() {
    const disconnected = this.props.counterContract.signer == null;
    return (
      <main>
        <h2>
          Counter{" "}
          <small>
            <a href={etherscanUrl}>↗ view contract on Etherscan</a>
          </small>
        </h2>
        <div>
          <strong>Counter is currently {this.state.counter}</strong>
        </div>
        <div>
          <button disabled={disconnected} onClick={this.increment}>
            Increment
          </button>
        </div>
      </main>
    );
  }

  increment = async () => {
    // increment the counter
    const tx = await this.props.counterContract.increment();
    // note this is a PENDING transaction
    console.log(`Sent increment transaction: ${tx.hash}`);
  };
}
