 import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)([^"&?/ ]{11}))/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

// Sample data
const videos = [
  {
    title: "PACE 03 - Akademos: Mentors are important",
    date: "11/19/2024",
    link: "https://www.youtube.com/embed/TY7evtVCAhQ",
  },
  {
    title: "PACE 02 - Umar Rana: What is HUB47?",
    date: "11/10/2024",
    link: "https://www.youtube.com/embed/zB7jgfhLBlE",
  },
  {
    title: "PACE 01 - Siddiq Farid: Why being first to market is important",
    date: "11/2/2024",
    link: "https://www.youtube.com/embed/xcYqU_D5JTo",
  },
];

export default function PodcastPage() {
  return (
    <div className="bg-[#f7f8ff] min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Podcast
        </h1>

        <div className="container-hub w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-video rounded-xl overflow-hidden">
                 <iframe width="345" height="210" src={video.link} title="PACE 03- Akademos: Mentors are important to avoid pitfalls" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <h3 className="font-medium text-gray-900 mt-3 text-sm md:text-base">
                {video.title}
              </h3>
              <p className="text-gray-500 text-xs mt-1">{video.date}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
 