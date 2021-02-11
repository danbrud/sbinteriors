import { Transfer } from "../../../stores/Transfer.store";
import { BalanceTransfer } from "../../../stores/BalanceTransfer.store";

export interface TransferTabsProps {
  setShowPopup: (open: boolean) => void
  setTransferToEdit: (transfer: Transfer | BalanceTransfer) => void
}