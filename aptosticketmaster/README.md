# Aptos Ticket Master
Aptos Ticket Master is a decentralized application built on the Aptos blockchain. Taking advantage of the features of NFTs, Aptos Ticket Master aims to eliminate ticket fraud, simplyfy ticket transfer and enhance concert experiences.

## Features
  * Unqiue NFT Tickets: Each ticket is a non-fungible token, providing a unique and tamper-proof record.
  * Event Tacketing & Management: Provides a user-friendly platform for event organisers to manage ticketing sales.
  * Real Time Verification: System to verify ticket ownership and validity instantly at the event entrance.

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

        Each of the file should contain the following, with the number corresponding to the ID.
        ```
        "image": "to_fill_after_upload",
        "name": "Ticket ID 01",
        "external_url": "https://your_project_url.io/1"
        ```
   4.   images

        Each of the file should be named its corresponding ID, i.e. 1.
4. Click "Add Concert Event" to create the concert.
### Viewing Collections
1. Navigate to the "My Collections" page.
2. View all collections created under the current contract.
