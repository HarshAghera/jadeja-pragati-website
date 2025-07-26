"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const ContactFormSmall = () => {
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

    if (!trimmedName || !trimmedEmail || !trimmedMobile) {
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
        toast.success("Message submitted successfully");
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
    <form onSubmit={handleSubmit} className="space-y-8 text-sm w-full">
      <input
        type="text"
        value={name}
        name="name"
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0f2557] text-[#0f2557] bg-white"
      />
      <input
        type="email"
        value={email}
        name="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0f2557] text-[#0f2557] bg-white"
      />
      <input
        type="tel"
        value={mobile}
        name="mobile"
        placeholder="Mobile Number"
        onChange={(e) => setMobile(e.target.value)}
        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0f2557] text-[#0f2557] bg-white"
      />

      <div className="flex justify-center">
        <Button
          type="submit"
          className="custom-gradient-btn w-1/2 py-5 px-4 rounded-md font-semibold text-base mt-3 cursor-pointer"
        >
          Submit
        </Button>
      </div>

      <p className="text-xs text-white text-center mt-2">
        We'll get back to you within 24 hours.
      </p>
    </form>
  );
};

export default ContactFormSmall;
