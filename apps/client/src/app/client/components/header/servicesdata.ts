
export type SectionKey = "Consulting" | "Business" | "Waste" | "EPR";

// Single item under a sub-subcategory
export type DropdownItem = {
  label: string; 
  slug: string; 
};

export type DropdownMenus = {
  [section: string]: {
    [category: string]: {
      [subSubCategory: string]: {
        title: string;
        slug: string;
      }[];
    };
  };
};



export const fetchDropdownMenus = async (): Promise<DropdownMenus> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pages/nav`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dropdown menus");
    }

    const json = await res.json();

    // console.log("✅ Fetched DropdownMenus from backend:", json.value);

    return json.value as DropdownMenus;
  } catch (error) {
    // console.error("❌ Error fetching dropdownMenus:", error);
    return {
      Consulting: {},
      Business: {},
      Waste: {},
      EPR: {},
    };
  }
};
