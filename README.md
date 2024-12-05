# dna_indexer

Parse events and push it to pgsql db

# Doc

[Apibara doc](https://www.apibara.com/docs)

Running with

```
npm run dev -- --indexers config-name
```

Example

```
 npm run dev  -- --indexers starknet-test
```

# Tips

If you don't want to compile (with scarb or other, contract to get class ) if you wanna extract a class from contract in mainnet or else run

```
starkli class-at starkli class-at <CONTRACT_ADDRESS> --network name
```

A good optimised example

```
starkli class-at starkli class-at 0x0516d0acb6341dcc567e85dc90c8f64e0c33d3daba0a310157d6bba0656c8769 --parse --network mainnet --parse --network mainnet | jq '.abi | map(select(.type == "event" and .kind != "enum"))'
```
