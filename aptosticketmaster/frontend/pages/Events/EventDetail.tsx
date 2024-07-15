import React from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assume you have a Button component

const EventDetail = () => {
  const { eventId } = useParams();
  const events = [
    {
      eventId: "1",
      eventName: "Concert Fun",
      eventUnixTime: 1720581515,
    },
    {
      eventId: "2",
      eventName: "Festival Fun",
      eventUnixTime: 1717989515,
    },
    {
      eventId: "3",
      eventName: "Conference Fun",
      eventUnixTime: 1721445515,
    },
    {
      eventId: "4",
      eventName: "Seminar Yes",
      eventUnixTime: 1723581515,
    },
    {
      eventId: "5",
      eventName: "Workshop Yes",
      eventUnixTime: 1724581515,
    },
  ];
  const event = events.find((e) => e.eventId === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handlePurchase = () => {
    alert(`Purchasing tickets for ${event.eventName}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
      <p className="text-lg mb-2">Date: {format(new Date(event.eventUnixTime * 1000), "MMM dd, yyyy")}</p>
      <p className="text-lg mb-2">Time: {format(new Date(event.eventUnixTime * 1000), "HH:mm")}</p>
      <Button onClick={handlePurchase} className="mt-4">
        Purchase Tickets
      </Button>
      <div className="mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 border rounded shadow"
        >
          <p className="text-md">
            Enjoy an unforgettable experience at {event.eventName}. Get your tickets now and be part of an amazing
            event!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetail;
