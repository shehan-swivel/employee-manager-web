import ConfirmContext from "@/contexts/ConfirmContext";
import { useContext } from "react";

let resolveCallback: (value: boolean) => void;

const useConfirm = () => {
  const { showConfirm, hideConfirm, show, message } = useContext(ConfirmContext);

  // Handle the event when click on the confirm button
  const onConfirm = () => {
    hideConfirm();
    resolveCallback(true);
  };

  // Handle the event when click on the cancel button
  const onCancel = () => {
    hideConfirm();
    resolveCallback(false);
  };

  // Show confirmation dialog
  const confirm = (msg: string) => {
    showConfirm(msg);

    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  return { confirm, onConfirm, onCancel, show, message };
};

export default useConfirm;
