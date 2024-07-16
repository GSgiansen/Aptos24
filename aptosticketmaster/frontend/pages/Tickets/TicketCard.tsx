import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assume you have a Button component
import { Ticket } from "@/hooks/getEventsAndTickets";
import { useEffect, useState } from "react";

const TicketCard = (ticket: Ticket) => {
  const [metadata, setMetadata] = useState<TicketMetadata | null>(null);

  interface TicketMetadata {
    image: string;
    external_url: string;
    attributes: { trait_type: string; value: string }[];
  }

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(ticket.uri);
        const data: TicketMetadata = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching ticket metadata:', error);
      }
    };

    fetchMetadata();
  }, [ticket.uri]);

  return (
      <Card>
        <CardHeader> 
          <CardTitle>{ticket.event_name}</CardTitle>
        </CardHeader>
        <CardContent>
            <img src={metadata?.image || "" } alt={ticket.event_name} />
            <Button>Verify Ticket</Button>
        </CardContent>
      </Card>
  );
};

export default TicketCard;
