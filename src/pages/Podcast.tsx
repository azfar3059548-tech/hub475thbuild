 import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API =
  "https://hub47webservices.raideit.net/api/Hub47/GetPodcast?id=1";

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setPodcasts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f7f8ff] min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">
          Podcast
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="container-hub w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {podcasts.map((p, index) => (
              <motion.div
                key={p.ID}
                className="bg-white rounded-3xl shadow-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="aspect-video rounded-xl overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: p.EmbedCode }}
                />

                <h3 className="font-medium mt-3">{p.Title}</h3>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(p.PodcastDate).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
