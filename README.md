# aptos-token-minting-site

aptos account fund-with-faucet --account 0xf5765b8561238764a44ebfea94abffd8c4f5f33a1f88d5888ee7e15a430b13a5

aptos move run --function-id 0x4::aptos_token::create_collection --args string:"my collection" u64:500 string:"DanCoin" string:"uri" bool:true bool:true bool:true bool:true bool:true bool:true bool:true bool:true bool:true u64:0 u64:1