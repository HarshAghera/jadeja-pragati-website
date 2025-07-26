
import { HelpCircle, ClipboardList, PhoneCall } from "lucide-react";

export default function Assist() {
  const boxes = [
    {
      title: "Expert Guidance",
      desc: "Get personalized help with licensing, compliance, and documentation from industry experts.",
      icon: <HelpCircle className="w-8 h-8 text-white" />,
    },
    {
      title: "Step-by-Step Support",
      desc: "We’ll walk you through the entire process — from paperwork to submission — stress-free.",
      icon: <ClipboardList className="w-8 h-8 text-white" />,
    },
    {
      title: "Talk to an Advisor",
      desc: "Have questions? Our consultants are just a call away to assist you anytime.",
      icon: <PhoneCall className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#0f2557] mb-4">
        Personalized Assistance Throughout the Process
      </h2>
      <p className="text-gray-800 text-base sm:text-lg mb-6">
        Whether you're just starting or stuck in the middle, our team offers
        hands-on help at every stage of your Scrap Battery Import journey.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bg-[#0f2557] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="mb-4">{box.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{box.title}</h3>
            <p className="text-sm text-gray-200 leading-relaxed">{box.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
