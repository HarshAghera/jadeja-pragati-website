import { DropdownMenus } from "@/app/client/components/header/types/dropdown";

type PageData = {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  subsubcategory: string;
};

export async function getDropdownMenus(): Promise<DropdownMenus> {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${apiUrl}/pages`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Invalid API response:", text);
    throw new Error("Invalid API response");
  }

  const data: PageData[] = await res.json();
  const allowedCategories = ["Consulting", "Business", "Waste", "EPR"];
  const menus: DropdownMenus = {};

  for (const page of data) {
    const category = page.category?.trim();
    if (!category || !allowedCategories.includes(category)) continue;

    const subcategory = page.subcategory?.trim() || "General";
    const label = page.subsubcategory?.trim() || page.title?.trim() || "";
    const href = `/${page.slug}`;

    if (!menus[category]) {
      menus[category] = {};
    }

    if (!menus[category][subcategory]) {
      menus[category][subcategory] = [];
    }

    menus[category][subcategory].push({ label, href });
  }

  return menus;
}
