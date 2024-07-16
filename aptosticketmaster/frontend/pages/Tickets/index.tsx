import { useEffect, useState } from "react";
import { getEventsAndTickets, Ticket } from "@/hooks/getEventsAndTickets";
import TicketCard from "@/pages/Tickets/TicketCard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function Tickets() {
  const wallet = useWallet(); // Ensure this is directly within the functional component
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      if (wallet) {
        const data = await getEventsAndTickets(wallet);
        setTickets(data.tickets);
      }
    }

    fetchTickets();
  }, [wallet]);

  return (
    <div>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} {...ticket} />
      ))}
    </div>
  );
}