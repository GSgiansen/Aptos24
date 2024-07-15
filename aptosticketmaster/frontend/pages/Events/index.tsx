import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { addDays, format, isAfter, isBefore } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";

export function Events() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [filter, setFilter] = useState<string>("");

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
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.eventUnixTime * 1000);
    const isWithinDateRange =
      date?.from && date?.to ? isAfter(eventDate, date.from) && isBefore(eventDate, date.to) : true;
    const matchesFilter = event.eventName.toLowerCase().includes(filter.toLowerCase());
    return isWithinDateRange && matchesFilter;
  });
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search for event name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <DatePickerWithRange date={date} setDate={setDate} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {filteredEvents.map((event) => (
          <motion.div key={event.eventId} variants={itemVariants}>
            <Link to={`/events/${event.eventId}`} className="block">
              <Card className="flex flex-row gap-4 p-4 items-center hover:bg-gray-100 transition-colors duration-200">
                <div className="text-4xl font-bold text-gray-700">
                  {format(new Date(event.eventUnixTime * 1000), "MMM dd, yyyy")}
                  <div className="text-lg font-normal">{format(new Date(event.eventUnixTime * 1000), "HH:mm")}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{event.eventName}</div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
