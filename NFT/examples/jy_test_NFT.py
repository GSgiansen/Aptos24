import asyncio
import json

from aptos_sdk.account import Account
from aptos_sdk.account_address import AccountAddress
from aptos_sdk.aptos_token_client import (
    AptosTokenClient,
    Collection,
    Object,
    Property,
    PropertyMap,
    ReadObject,
    Token,
)
from aptos_sdk.async_client import FaucetClient, RestClient

from .common import FAUCET_URL, NODE_URL


def get_owner(obj: ReadObject) -> AccountAddress:
    return obj.resources[Object].owner


async def get_collection_data(
    token_client: AptosTokenClient, collection_addr: AccountAddress
) -> dict[str, str]:
    collection = (await token_client.read_object(collection_addr)).resources[Collection]
    return {
        "creator": str(collection.creator),
        "name": str(collection.name),
        "description": str(collection.description),
        "uri": str(collection.uri),
    }


async def get_token_data(
    token_client: AptosTokenClient, token_addr: AccountAddress
) -> dict[str, str]:
    token = (await token_client.read_object(token_addr)).resources[Token]
    return {
        "collection": str(token.collection),
        "name": str(token.name),
        "description": str(token.description),
        "uri": str(token.uri),
        "index": str(token.index),
    }


async def transfer_funds(client: RestClient, sender: Account, recipient: AccountAddress, amount: int):
    txn_hash = await client.transfer(sender, recipient, amount)
    await client.wait_for_transaction(txn_hash)
    return txn_hash


async def get_transaction_fee(client: RestClient, txn_hash: str) -> int:
    transaction = await client.transaction_by_hash(txn_hash)
    gas_used = int(transaction['gas_used'])
    gas_unit_price = int(transaction['gas_unit_price'])
    return gas_used * gas_unit_price


async def main():
    rest_client = RestClient(NODE_URL)
    faucet_client = FaucetClient(FAUCET_URL, rest_client)

    token_client = AptosTokenClient(rest_client)

    dis = Account.generate()
    bob = Account.generate()

    collection_name = "Distributor's Tickets"
    token_name = "Ticket #"
    max_supply = 1  # Specify the size of the collection here
    num_tokens_to_mint = 2  # Number of tokens you want to mint

    owners = {str(dis.address()): "Distributor", str(bob.address()): "Bob"}

    print("\n=== Addresses ===")
    print(f"Distributor: {dis.address()}")
    print(f"Bob: {bob.address()}")

    dis_fund = faucet_client.fund_account(dis.address(), 100_000_000)
    bob_fund = faucet_client.fund_account(bob.address(), 100_000_000)
    await asyncio.gather(*[dis_fund, bob_fund])

    print("\n=== Initial Coin Balances ===")
    dis_balance = rest_client.account_balance(dis.address())
    bob_balance = rest_client.account_balance(bob.address())
    [dis_balance, bob_balance] = await asyncio.gather(*[dis_balance, bob_balance])
    print(f"Distributor: {dis_balance}")
    print(f"Bob: {bob_balance}")

    print("\n=== Creating Collection and Token ===")

    txn_hash = await token_client.create_collection(
        dis,
        "Distributor's Tickets",
        max_supply,
        collection_name,
        "https://aptos.dev",
        True,
        True,
        True,
        True,
        True,
        True,
        True,
        True,
        True,
        0,
        1,
    )
    await rest_client.wait_for_transaction(txn_hash)

    collection_addr = AccountAddress.for_named_collection(dis.address(), collection_name)

    current_supply = 0
    print(f"Current supply before minting: {current_supply}")
    
    minted_token_addresses = []
    for i in range(num_tokens_to_mint):
        if current_supply >= max_supply:
            print(f"Max supply reached. Skipping minting token {i + 1}.")
            break
        
        num = i + 1
        token_name_with_index = f"{token_name}{num}"
        print(f"Minting token with name: {token_name_with_index}")

        # Create PropertyMap for the token with name

        txn_hash = await token_client.mint_token(
            dis,
            collection_name,
            "Concert Ticket",
            token_name_with_index,
            "https://aptos.dev/img/nyan.jpeg",
            PropertyMap([]),
        )
        await rest_client.wait_for_transaction(txn_hash)

        minted_tokens = await token_client.tokens_minted_from_transaction(txn_hash)
        assert len(minted_tokens) == 1
        
        minted_token_addresses.append(minted_tokens[0])
        current_supply += 1  # Update the current supply

    collection_data = await get_collection_data(token_client, collection_addr)
    print(
        "\nCollection data: "
        + json.dumps({"address": str(collection_addr), **collection_data}, indent=4)
    )

    for token_addr in minted_token_addresses:
        obj_resources = await token_client.read_object(token_addr)
        owner = str(get_owner(obj_resources))
        print(f"\nToken owner: {owners[owner]}")
        token_data = await get_token_data(token_client, token_addr)
        print(
            "Token data: "
            + json.dumps(
                {"address": str(token_addr), "owner": owner, **token_data}, indent=4
            )
        )

        print("\n=== Transferring the token to Bob ===")
        txn_hash = await token_client.transfer_token(
            dis,
            token_addr,
            bob.address(),
        )
        await rest_client.wait_for_transaction(txn_hash)

        obj_resources = await token_client.read_object(token_addr)
        print(f"Token owner: {owners[str(get_owner(obj_resources))]}")

        payment_amount = 10_000_000

        dis_balance_before = await rest_client.account_balance(dis.address())
        bob_balance_before = await rest_client.account_balance(bob.address())
        print(f"Distributor balance before payment: {dis_balance_before}")
        print(f"Bob balance before payment: {bob_balance_before}")

        print("\n=== Bob transfers payment to Distributor ===")
        payment_txn_hash = await transfer_funds(rest_client, bob, dis.address(), payment_amount)
        payment_txn_fee = await get_transaction_fee(rest_client, payment_txn_hash)

        dis_balance_after = await rest_client.account_balance(dis.address())
        bob_balance_after = await rest_client.account_balance(bob.address())
        print(f"Distributor balance after payment: {dis_balance_after}")
        print(f"Bob balance after payment: {bob_balance_after}")
        print(f"Transaction fee for Bob's payment: {payment_txn_fee}")

    await rest_client.close()


if __name__ == "__main__":
    asyncio.run(main())
