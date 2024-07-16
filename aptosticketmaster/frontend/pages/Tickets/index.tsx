import { getEventsAndTickets, Ticket } from "@/hooks/getEventsAndTickets";
import TicketCard from "@/pages/Tickets/TicketCard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function Tickets() {
  const wallet = useWallet();
  const { tickets } = getEventsAndTickets(wallet);

  return (
    <div>
      {tickets.map((ticket) => {
        return (
          <TicketCard key={ticket.id} {...ticket} />
        )})};
    </div>
  );
}
