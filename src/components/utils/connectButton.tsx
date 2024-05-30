import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { updateConnectWallet } from "../../redux/slice";

export default function ConnectBtn() {
  const dispatch = useAppDispatch();
  const { connectWallet } = useAppSelector((state) => state.app);
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (connectWallet) {
      dispatch(updateConnectWallet(false));
      open();
    }
  });
  return <button>Connect wallet</button>;
}
