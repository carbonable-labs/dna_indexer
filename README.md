# dna_indexer

# Tips

If you don't want to compile (with scarb or other, contract to get class ) if you wanna extract a class from contract in mainnet or else run

```
starkli class-at <CONTRACT_ADDRESS> --parse --network mainnet
```

if you want to extract just the abi

```
... | jq ".abi"
```
