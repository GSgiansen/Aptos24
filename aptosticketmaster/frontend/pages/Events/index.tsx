import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { addDays, format, isAfter, isBefore } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import {CAS, TS_ERA} from "./EventType";
import { ConnectWalletAlert } from "../Mint/components/ConnectWalletAlert";
import { BannerSection } from "../Mint/components/BannerSection";
import { FAQSection } from "../Mint/components/FAQSection";
import { HeroSection } from "../Mint/components/HeroSection";
import { HowToMintSection } from "../Mint/components/HowToMintSection";
import { OurStorySection } from "../Mint/components/OurStorySection";
import { OurTeamSection } from "../Mint/components/OurTeamSection";
import { StatsSection } from "../Mint/components/StatsSection";

export function Events() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [filter, setFilter] = useState<string>("");

  const events = [
    CAS, TS_ERA
  ];
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.eventUnixTime * 1000);
    const isWithinDateRange =
      date?.from && date?.to ? isAfter(eventDate, date.from) && isBefore(eventDate, date.to) : true;
    const matchesFilter = event.name.toLowerCase().includes(filter.toLowerCase());
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
    <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
      <Header/>
      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Search for event name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <DatePickerWithRange date={date} setDate={setDate} className="p-4"/>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4"
      >
        {filteredEvents.map((event) => (
          <motion.div key={event.id} variants={itemVariants}>
            <Link to={`/${event.id}`} className="block p-4" >
              <Card className="flex flex-row gap-4 p-4 items-center hover:bg-gray-100 transition-colors duration-200">
                <img src={event.image_uri} alt={event.name} className="w-64 h-64 object-cover rounded-lg" />
                <div className="text-4xl font-bold text-gray-700">
                  {format(new Date(event.eventUnixTime * 1000), "MMM dd, yyyy")}
                  <div className="text-lg font-normal">{format(new Date(event.eventUnixTime * 1000), "HH:mm")}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{event.name}</div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
        
    </div>
  );
}
