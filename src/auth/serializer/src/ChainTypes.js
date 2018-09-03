var ChainTypes;

module.exports = ChainTypes = {};

ChainTypes.reserved_spaces = {
  relative_protocol_ids: 0,
  protocol_ids: 1,
  implementation_ids: 2
};

ChainTypes.operations= {
    vote: 0,
    comment: 1,
    transfer: 2,
    transfer_to_vesting: 3,
    withdraw_vesting: 4,
    account_create: 5,
    account_update: 6,
    witness_update: 7,
    account_witness_vote: 8,
    account_witness_proxy: 9,
    custom: 10,
    delete_comment: 11,
    custom_json: 12,
    comment_options: 13,
    set_withdraw_vesting_route: 14,
    challenge_authority: 15,
    prove_authority: 16,
    request_account_recovery: 17,
    recover_account: 18,
    change_recovery_account: 19,
    escrow_transfer: 20,
    escrow_dispute: 21,
    escrow_release: 22,
    escrow_approve: 23,
    custom_binary: 24,
    decline_voting_rights: 25,
    claim_reward_balance: 26,
    delegate_vesting_shares: 27,
    account_create_with_delegation: 28,
    author_reward: 29,
    curation_reward: 30,
    comment_reward: 31,
    fill_vesting_withdraw: 32,
    shutdown_witness: 33,
    hardfork: 34,
    comment_payout_update: 35,
    return_vesting_delegation: 36,
    comment_benefactor_reward: 37
};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1,
};
