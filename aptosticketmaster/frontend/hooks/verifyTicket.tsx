import { Ticket } from "./getEventsAndTickets"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

export const isOwner = (ticket: Ticket) => {
  const wallet = useWallet();

  return wallet.account?.address === ticket.owner
}

export const ticketVerification = (ticket: Ticket) => {
  const displayModal = () => {
    if (!isOwner(ticket)) {
      alert("You are not the owner of this ticket")
    }
    else {
      alert("Ticket Verified")
    }
  }

  return (
    <div>
      <button onClick={displayModal}>Verify Ticket</button>
    </div>
  )
}