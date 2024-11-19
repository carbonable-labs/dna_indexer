# dna_indexer

Parse events and push it to pgsql db

# Doc

[Apibara doc](https://www.apibara.com/docs)

# Tips

If you don't want to compile (with scarb or other, contract to get class ) if you wanna extract a class from contract in mainnet or else run

```
starkli class-at <CONTRACT_ADDRESS> --parse --network mainnet
```

if you want to extract just the abi (reduce size of output)

```
... | jq ".abi"
```
