import { KeyIcon, WalletIcon } from "./icons";

/** Icon for each finance type, keyed by `FinanceType.short`. */
export const financeTypeIcons: Record<string, typeof KeyIcon> = {
  HP: KeyIcon,
  PCP: WalletIcon,
};
