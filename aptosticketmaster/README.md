## Create Aptos Dapp Digital Asset Template

Digital Assets are the NFT standard for Aptos. The Digital Asset template provides an end-to-end NFT minting dapp with a beautiful pre-made UI users can quickly adjust and deploy into a live server.

<<<<<<< Updated upstream
Read more about how to use the template [here](https://aptos.dev/create-aptos-dapp/templates/digital-asset)

The Digital Asset template provides 3 pages:
=======
## Installation
### Prerequisites
  * React
  * pnpm
  * npm

### Steps
  1. Clone the repo
```
git clone https://github.com/GSgiansen/Aptos24.git
cd Aptos24/aptosticketmaster
```
  2. Install dependencies
```
npm install
```
  3. Initialise the contract, and enter private key when prompted.
```
npm run move:init
npm run move:publish
```
  4. Update .env file in the root directory and add the following variables:
```
VITE_COLLECTION_CREATOR_ADDRESS=your-wallet-address
VITE_MASTER_ACCOUNTS=your-wallet-address
```
  5. Start the development server:
```
npm run dev
```
## Usage
### Creating an Event
1. Connect your Aptos Wallet.
2. Navigate to the "Create Concert" page.
3. Fill out the form with details about your concerts and upload the necessary files. The files should contain the following.
   1.   collection.jpg
   2.   collection.json
        ```
        "image": "to_fill_after_upload",
        "external_url": "https://your_project_url.io"
        ```
   3.   metadata folder
>>>>>>> Stashed changes

- **Public Mint NFT Page** - A page for the public to mint NFTs.
- **Create Collection Page** - A page for creating new NFT collections. This page is not accessible on production.
- **My Collections Page** - A page to view all the collections created under the current Move module (smart contract). This page is not accessible on production.

### What tools the template uses?

- React framework
- Vite development tool
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter
- Node based Move commands

### What Move commands are available?

The tool utilizes [aptos-cli npm package](https://github.com/aptos-labs/aptos-cli) that lets us run Aptos CLI in a Node environment.

Some commands are built-in the template and can be ran as a npm script, for example:

- `npm run move:init` - a command to initialize an account to publish the Move contract and to configure the development environment
- `npm run move:publish` - a command to publish the Move contract
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract

For all other available CLI commands, can run `npx aptos` and see a list of all available commands.
