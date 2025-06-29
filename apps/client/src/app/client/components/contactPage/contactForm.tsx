"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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

    if (!trimmedName || !trimmedEmail || !trimmedMobile ) {
      toast.error("Please fill in all fields");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(trimmedMobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }


    try {
      const res = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          mobile: trimmedMobile,
          message: trimmedMessage,
        }),
      });

      if (res.ok) {
        toast.success("Your message has been submitted");
        setName("");
        setEmail("");
        setMobile("");
        setMessage("");
      } else {
        toast.error("Submission failed. Please try again");
      }
    } catch {
      toast.error("Something went wrong. Please try again later");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-[#0f2557]">Name</label>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
        />
      </div>
      <div>
        <label className="block mb-1 text-[#0f2557]">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
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
