import { ReactNode } from "react";
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export type SectionKey = "Consulting" | "Business" | "Waste" | "EPR";

export type DropdownItem = {
  label: string; 
  slug: string; 
};

export type DropdownMenus = {
  [section: string]: {
    [category: string]: {
      [subSubCategory: string]: {
        [x: string]: ReactNode;
        title: string;
        slug: string;
      }[];
    };
  };
};

export const fetchDropdownMenus = async (): Promise<DropdownMenus> => {
  try {
    const res = await fetch(`${apiUrl}/pages/nav`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dropdown menus");
    }

    const json = await res.json();


    return json.value as DropdownMenus;
  } catch (err) {
    console.error("Error fetching dropdownMenus:", err);
    return {
      Consulting: {},
      Business: {},
      Waste: {},
      EPR: {},
    };
  }
};
