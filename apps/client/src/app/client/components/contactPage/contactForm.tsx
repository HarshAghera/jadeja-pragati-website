"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMobile || !trimmedMessage) {
      toast.error("Please fill in all fields");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(trimmedMobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", trimmedName);
      formData.append("email", trimmedEmail);
      formData.append("mobile", trimmedMobile);
      formData.append("message", trimmedMessage);

      const response = await axios.post(
        "https://formspree.io/f/xyzweeeq",
        formData
      );

      if (response.status === 200) {
        toast.success("Your message has been submitted");
        setName("");
        setEmail("");
        setMobile("");
        setMessage("");
      } else {
        toast.error("Submission failed. Please try again");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Something went wrong. Please try again later");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fields */}
      <div>
        <label className="block mb-1 text-[#0f2557]">Name</label>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-[#0f2557]">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-[#0f2557]">Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-[#0f2557]">Message</label>
        <textarea
          rows={4}
          value={message}
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
          required
        ></textarea>
      </div>
      <Button
        type="submit"
        className="bg-[#0f2557] text-white px-8 py-3 rounded-full font-bold text-base submit-btn cursor-pointer"
      >
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
