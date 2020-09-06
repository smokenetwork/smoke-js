import get from "lodash/get";
import { key_utils } from "./auth/ecc";

module.exports = smokeAPI => {
  function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function vestingSmoke(account, gprops) {
    const vests = parseFloat(account.vesting_shares.split(" ")[0]);
    const total_vests = parseFloat(gprops.total_vesting_shares.split(" ")[0]);
    const total_vest_smoke = parseFloat(
      gprops.total_vesting_fund_smoke.split(" ")[0]
    );
    const vesting_smokef = total_vest_smoke * (vests / total_vests);
    return vesting_smokef;
  }

  function estimateAccountValue(
    account,
    { gprops, vesting_smoke } = {}
  ) {
    const promises = [];
    const username = account.name;
    const assetPrecision = 1000;

    if (!vesting_smoke) {
        vesting_smoke = vestingSmoke(account, gprops);
    }

    return Promise.all(promises).then(() => {
      const balance_smoke = parseFloat(account.balance.split(" ")[0]);
      const total_smoke = vesting_smoke + balance_smoke;
      return (total_smoke).toFixed(2);
    });
  }

  function createSuggestedPassword() {
    const PASSWORD_LENGTH = 32;
    const privateKey = key_utils.get_random_key();
    return privateKey.toWif().substring(3, 3 + PASSWORD_LENGTH);
  }

  return {
    reputation: function(reputation) {
      if (reputation == null) return reputation;
      let neg = reputation < 0;
      let rep = String(reputation);
      rep = neg ? rep.substring(1) : rep;
      let v = (Math.log10((rep > 0 ? rep : -rep) - 10) - 9);
      v =  neg ? -v : v;
      return parseInt(v * 9 + 25);
    },

    vestToSmoke: function(
      vestingShares,
      totalVestingShares,
      totalVestingFundSmoke
    ) {
      return (
        parseFloat(totalVestingFundSmoke) *
        (parseFloat(vestingShares) / parseFloat(totalVestingShares))
      );
    },

    commentPermlink: function(parentAuthor, parentPermlink) {
      const timeStr = new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]+/g, "")
        .toLowerCase();
      parentPermlink = parentPermlink.replace(/(-\d{8}t\d{9}z)/g, "");
      return "re-" + parentAuthor + "-" + parentPermlink + "-" + timeStr;
    },

    amount: function(amount, asset) {
      return amount.toFixed(3) + " " + asset;
    },
    numberWithCommas,
    vestingSmoke,
    estimateAccountValue,
    createSuggestedPassword
  };
};
