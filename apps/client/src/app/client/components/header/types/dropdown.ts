export type DropdownItem = {
  label: string;
  href: string;
};

export type DropdownCategory = {
  [subcategory: string]: DropdownItem[];
};

export type DropdownMenus = {
  [category: string]: DropdownCategory;
};
