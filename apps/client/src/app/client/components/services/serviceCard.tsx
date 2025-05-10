"use client";
import React, { JSX } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "react-feather";
import Link from "next/link";

type Service = {
  icon: JSX.Element;
  title: string;
  desc: string;
  link: string;
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="card">
      <div>
        {service.icon}
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
      </div>
      <div className="mt-4">
        <Link href={service.link}>
          <Button className="group bg-[#0f2557] text-white text-sm rounded-full px-5 py-2 flex items-center gap-2 third">
            Read More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
