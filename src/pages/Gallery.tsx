import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import enevt1 from '@/assets/event1.jpg';
import enevt2 from '@/assets/event2.jpg';
import enevt3 from '@/assets/event3.jpeg';
import enevt4 from '@/assets/event4.jpeg';
import enevt5 from '@/assets/event5.jpeg';
import enevt6 from '@/assets/event6.jpeg';
export default function GalleryPage() {
  const galleryItems = [
    {
      date: "12-Oct-2024",
      title: "Canadian Startup",
      desc: "HUB47 and Canadian Startup Association MOU Ceremony",
      image: enevt1,
    },
    {
      date: "13-Oct-2024",
      title: "Devsinc Dubai Meetup x Hub47",
      desc: "Hub47 hosted a Devsinc Dubai Meetup with Q&A session.",
      image: enevt2,
    },
    {
      date: "14-Oct-2024",
      title: "Hub47 @ GITEX Global 2024",
      desc: "Hub47 proudly participated in GITEX Global 2024.",
      image: enevt3,
    },
    {
      date: "15-Oct-2024",
      title: "Networking Meetup",
      desc: "Founders & Investors networking meetup.",
      image: enevt4,
    },
    {
      date: "16-Oct-2024",
      title: "Founder Stories",
      desc: "Founders sharing their startup journey.",
      image: enevt5,
    },
    {
      date: "17-Oct-2024",
      title: "Community Event",
      desc: "Hub47 community building meetup.",
      image: enevt6,
    },
  ];

  return (
    <div className="bg-[#f7f8ff] min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="pt-24 pb-10">

        {/* TITLE SECTION */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Event Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Explore all our events, meetups, workshops, and startup community moments.
          </p>
        </div>

        {/* GALLERY GRID */}
        <div className="container-hub w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-14">

          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <p className="text-gray-500 text-sm">{item.date}</p>

                <h2 className="font-semibold text-lg text-gray-800 mt-1">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm mt-2 leading-5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* EXTRA SECTION (Optional Like About Page Style) */}
        <div className="container-hub w-11/12 mx-auto mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Want to Join Our Events?
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Become a part of our growing community and take your startup to the next level.
          </p>

          <button className="mt-6 bg-white border px-6 py-2 rounded-full shadow hover:bg-gray-100 font-medium">
            View Upcoming Events
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
