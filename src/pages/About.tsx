 import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Tag,
  X,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import about1 from '@/assets/Story-Of-Us.png';
import about2 from '@/assets/What-is-Hub47.png';
import about3 from '@/assets/How-our-community-is-connected.png';
import about4 from '@/assets/easier-shape1.png';
export default function AboutPage() {
  return (
    <div className="bg-[#f7f8ff] min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="pt-24 pb-10">

        {/* TITLE SECTION */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Story of Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            HUB-47 is more than just an incubator—it's a vibrant community...
            providing tools, mentorship, and network to turn ideas into
            impactful businesses.
          </p>
        </div>

        {/* HERO IMAGE */}
        <div className="flex justify-center mt-10">
          <img src={about1} alt="PAD" className="" />
        </div>

        {/* Mission / Vision / Values */}
        <div className="container-hub grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-14">

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-blue-600 text-3xl mb-3">
              <Sparkles />
            </div>
            <h2 className="font-semibold mb-2 text-lg">Our Mission</h2>
            <p className="text-gray-600 text-sm">
              To empower Pakistani startups in the UAE by fostering innovation,
              collaboration, and growth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-blue-600 text-3xl mb-3">
              <Globe />
            </div>
            <h2 className="font-semibold mb-2 text-lg">Our Vision</h2>
            <p className="text-gray-600 text-sm">
              To be the leading incubation center connecting entrepreneurs to
              global success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-blue-600 text-3xl mb-3">
              <Users />
            </div>
            <h2 className="font-semibold mb-2 text-lg">Our Values</h2>
            <p className="text-gray-600 text-sm">
              Innovation, Collaboration, Entrepreneurship, and Growth.
            </p>
          </div>
        </div>

        {/* What is HUB47? */}
        <div className="container-hub grid grid-cols-1 md:grid-cols-2 gap-10 w-11/12 mx-auto mt-20">
          <div>
            <h2 className="text-2xl font-bold mb-3">What is HUB47?</h2>
            <p className="text-gray-600 text-sm leading-6">
              Our incubation center works to unite Pakistan entrepreneurs...
              supporting startups to grow beyond horizons and build profitable
              businesses.
            </p>
          </div>

           <img src={about2} alt="PAD" className="" />
        </div>

        {/* COMMUNITY CONNECTED */}
        <div className="container-hub grid grid-cols-1 md:grid-cols-2 gap-10 w-11/12 mx-auto mt-20">

          <img src={about3} alt="PAD" className="" />

          <div>
            <h2 className="text-2xl font-bold mb-3">
              How our community is connected?
            </h2>
            <p className="text-gray-600 text-sm leading-6">
              HUB47 conducts one-on-one and online events that become a source
              of gaining knowledge, exchange ideas, and planning for the future
              of startups in the UAE.
            </p>
          </div>
        </div>

        {/* CALL TO ACTION */}
       <div className="container-hub w-11/12 mx-auto mt-20 ext-bg-bottom">
  <div
    className="rounded-2xl py-16 px-6 text-center"
    style={{
      backgroundImage: `url(${about4})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-[#1a3354]">
      Elevate Your Startup
    </h2>

    <p className="text-gray-700 mt-3 text-sm md:text-base max-w-3xl mx-auto">
      Discover how our incubation can lead your entrepreneurship aspiration
      towards innovations and Success.
    </p>

    <button className="mt-6 bg-white border px-6 py-2 rounded-full shadow hover:bg-gray-100 font-medium">
      Register Your Startup
    </button>
  </div>
</div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
