 import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import contactShape from "@/assets/Contact-uss.png";

export default function Contact() {

  // ================= STATE =================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    organizationName: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ID: 0,
      Name: formData.name,
      Email: formData.email,
      ContactNo: formData.contactNo,
      Membership: "Contact Us",
      Notes: formData.notes,
      EntryDate: new Date().toISOString(),
      Status: true,
      OrganizationName: formData.organizationName,
    };

    try {
      const res = await fetch("https://hub47webservices.raideit.net/api/Hub47/addContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
console.log(res)
const data = await res.json();
console.log(data)
      if (res.ok) {
        alert("Submit Successfully");
        setFormData({
          name: "",
          email: "",
          contactNo: "",
          organizationName: "",
          notes: "",
        });
      } else {
        alert("error");
      }
    } catch (error) {
      alert("test");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="bg-[#f7f8ff] min-h-screen overflow-hidden">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative pt-28 pb-24">
        <img
          src={contactShape}
          alt=""
          className="absolute -top-24 -right-24 w-[420px] opacity-40 pointer-events-none"
        />

        <div className="container-hub w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles size={16} />
              Contact HUB47
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Let’s Build Something <br /> Great Together
            </h1>

            <p className="text-gray-600 mt-4 max-w-lg text-sm md:text-base">
              Whether you’re a startup founder, volunteer, or partner —  
              our team is here to support you.
            </p>

            <div className="mt-8 space-y-4">
              <InfoItem icon={<Mail />} title="Email" value="info@hub47.ae" />
              <InfoItem icon={<Phone />} title="Phone" value="+971 XX XXX XXXX" />
              <InfoItem
                icon={<MapPin />}
                title="Location"
                value="Pakistan Association Dubai, UAE"
              />
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-10 border border-white/50"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Send us a Message
            </h2>
            <p className="text-center text-gray-600 text-sm mt-2">
              We usually respond within 24 hours
            </p>

            <form
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="inputFancy"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="inputFancy"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="contactNo"
                placeholder="Contact Number"
                className="md:col-span-2 inputFancy"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="organizationName"
                placeholder="Organization Name"
                className="md:col-span-2 inputFancy"
                value={formData.organizationName}
                onChange={handleChange}
              />

              <textarea
                rows={4}
                name="notes"
                placeholder="Your Message"
                className="md:col-span-2 inputFancy resize-none"
                value={formData.notes}
                onChange={handleChange}
                required
              />

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-primary/90 transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="pb-24">
        <div className="container-hub w-11/12 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <iframe
              title="Hub47 Location"
              src="https://www.google.com/maps?q=Pakistan%20Association%20Dubai&output=embed"
              className="w-full h-[380px] border-0"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ================= INFO ITEM ================= */
function InfoItem({ icon, title, value }) {
  return (
    <div className="flex items-start gap-4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-gray-600 text-sm">{value}</p>
      </div>
    </div>
  );
}
