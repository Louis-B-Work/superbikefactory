import type { FinanceType } from "./finance";

export const financeGuides: Record<FinanceType["short"], { endOfAgreement: string; consider: string }> = {
  HP: {
    endOfAgreement:
      "Once all payments under the agreement have been made, the bike belongs to you. It's a straightforward route if you want to keep it for the long term.",
    consider:
      "You spread the full cost of the bike, so monthly repayments are usually higher than PCP over a comparable term. Check the APR and total amount payable, not just the monthly figure.",
  },
  PCP: {
    endOfAgreement:
      "You can pay the optional final payment to keep the bike, return it subject to the agreement's conditions, or explore part-exchanging it for your next bike.",
    consider:
      "If you want to own the bike, budget for the final payment as well as the monthly repayments. Agreed mileage and condition requirements matter if you plan to return it.",
  },
};

export const financeConsiderations = [
  {
    title: "Your monthly budget",
    body: "Choose a repayment that leaves room for everyday bills, insurance, maintenance and running your bike. The calculator is a starting point, not a personalised offer.",
  },
  {
    title: "The whole cost",
    body: "Compare the APR and total amount payable alongside the monthly figure. A longer term can reduce your monthly payment but usually means paying more interest overall.",
  },
  {
    title: "Your plans for the bike",
    body: "Think about how far you'll ride and whether you want to keep the bike or change it later. The right agreement should fit those plans as well as your budget.",
  },
];
