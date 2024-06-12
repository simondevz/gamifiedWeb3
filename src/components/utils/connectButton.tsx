import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { updateConnectWallet } from "../../redux/slice";
import { useAccount } from "wagmi";
import { formatAddress } from "../../utils/helpers";

export default function ConnectBtn() {
  const dispatch = useAppDispatch();
  const { connectWallet } = useAppSelector((state) => state.app);
  const { open } = useWeb3Modal();
  const { address, isConnected, connector } = useAccount();

  useEffect(() => {
    if (connectWallet) {
      dispatch(updateConnectWallet(false));
      open();
    }
  });

  return (
    <button
      onClick={() => dispatch(updateConnectWallet(true))}
      className="flex bg-primary rounded-2xl max-md:rounded-xl justify-center py-2 max-md:py-[0.3rem] px-4 "
    >
      {isConnected ? (
        <span className="flex my-auto text-white font-semibold gap-2">
          <div
            style={{
              backgroundImage: `url(${connector?.icon})`,
            }}
            className="flex w-6 max-md:w-4 max-md:h-4 h-6 bg-cover bg-center bg-no-repeat "
          ></div>
          <span className="text-nowrap max-md:text-[0.75rem] ">
            {formatAddress(address!)}
          </span>
        </span>
      ) : (
        <span className="flex my-auto text-white text-nowrap max-md:text-[0.75rem] font-semibold">
          Connect wallet
        </span>
      )}
    </button>
  );
}
