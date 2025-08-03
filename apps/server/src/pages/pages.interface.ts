export interface NavItem {
  title: string;
  slug: string;
}

export type GroupedNav = {
  [category: string]: {
    [subcategory: string]: {
      [subsubcategory: string]: NavItem[];
    };
  };
};
