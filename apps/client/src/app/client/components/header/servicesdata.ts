export type SectionKey = "Consulting" | "Business" | "Waste" | "EPR";

export type DropdownItem = {
  label: string;
  href: string;
};

export type DropdownCategory = {
  [categoryName: string]: DropdownItem[];
};

export type DropdownMenus = {
  [section in SectionKey]: DropdownCategory;
};

export const dropdownMenus: DropdownMenus = {
  Consulting: {
    "State Pollution Board Clearance": [
      {
        label: "State Pollution Control Board NOC",
        href: "/consulting/spcb-noc",
      },
      {
        label: "Gujarat Pollution Control Board (GPCB)",
        href: "/consulting/gpcb",
      },
      { label: "CTE & CTO", href: "/consulting/cte-cto" },
    ],
    "CPCB MOEF & DGFT Clearance": [
      {
        label: "CPCB Certified Refurbished",
        href: "/consulting/cpcb-refurbished",
      },
      { label: "CPCB MOEF Approvals", href: "/consulting/cpcb-moef-approvals" },
      { label: "DGFT Approvals", href: "/consulting/dgft-approvals" },
      {
        label: "Visit Clearance of CPCB and DGFT",
        href: "/consulting/visit-clearance",
      },
      {
        label: "Renewal of CPCB & DGFT License",
        href: "/consulting/renewal-license",
      },
    ],
    "License & Registration": [
      { label: "MSTC License", href: "/consulting/mstc-license" },
      { label: "ROHS Certification", href: "/consulting/rohs-certification" },
      {
        label: "Refurbished Authorization and License",
        href: "/consulting/refurb-license",
      },
      {
        label: "Vehicle Scrapping Facility Authorization",
        href: "/consulting/vehicle-scrap-auth",
      },
      { label: "TSPF Facility Service", href: "/consulting/tspf-facility" },
      { label: "Fire NOC", href: "/consulting/fire-noc" },
      {
        label: "Electronic Import License",
        href: "/consulting/electronic-import",
      },
      { label: "Waste Import License", href: "/consulting/waste-import" },
      { label: "Plastic Import License", href: "/consulting/plastic-import" },
      {
        label: "Scrap Tyre Import License",
        href: "/consulting/scrap-tyre-import",
      },
      {
        label: "Lead Battery Import License",
        href: "/consulting/lead-battery-import",
      },
      { label: "HMS Import License", href: "/consulting/hms-import" },
      {
        label: "Company Registration",
        href: "/consulting/company-registration",
      },
      { label: "IEC Code", href: "/consulting/iec-code" },
    ],
  },

  Business: {
    "Waste Recycling Business": [
      {
        label: "Plastic Waste Recycling Plant",
        href: "/business/plastic-recycling",
      },
      {
        label: "Bio-Medical Waste Recycling Plant",
        href: "/business/biomedical-recycling",
      },
      {
        label: "Construction and Demolition Waste Plant",
        href: "/business/construction-waste",
      },
      {
        label: "Vehicle Scraping Business",
        href: "/business/vehicle-scraping",
      },
      {
        label: "Lead Battery Recycling Plant",
        href: "/business/lead-battery-recycling",
      },
      {
        label: "Lithium-ion Recycling Plant",
        href: "/business/lithium-recycling",
      },
      {
        label: "Aluminum Recycling Plant",
        href: "/business/aluminum-recycling",
      },
      { label: "Copper Recycling Plant", href: "/business/copper-recycling" },
      { label: "E-Waste Recycling Plant", href: "/business/ewaste-recycling" },
      {
        label: "Food Waste Recycling Plant",
        href: "/business/food-waste-recycling",
      },
      {
        label: "Waste Cooking Oil Recycling Plant",
        href: "/business/cooking-oil-recycling",
      },
      { label: "MSW Waste Used as Fuel", href: "/business/msw-cement-fuel" },
      {
        label: "Waste Oil Recycling Plant",
        href: "/business/waste-oil-recycling",
      },
      { label: "Paper Recycling Plant", href: "/business/paper-recycling" },
      {
        label: "PET Bottle Scrap Recycling Plant",
        href: "/business/pet-recycling",
      },
      {
        label: "Solar Panel Recycling Plant",
        href: "/business/solar-recycling",
      },
      {
        label: "Metal Scrap Recycling Business",
        href: "/business/metal-scrap",
      },
      { label: "Glass Recycling Plant", href: "/business/glass-recycling" },
      {
        label: "Textile Scrap Recycling Plant",
        href: "/business/textile-recycling",
      },
      {
        label: "HDP, PVC, LDPE Recycling Plant",
        href: "/business/plastic-polymer-recycling",
      },
    ],
    "Import Business": [
      { label: "Scrap Tyre Import", href: "/business/scrap-tyre-import" },
      { label: "Metal Scrap Import", href: "/business/metal-scrap-import" },
      {
        label: "Scrap Lead Battery Import",
        href: "/business/lead-battery-import",
      },
      {
        label: "Scrap Lithium-ion Battery Import",
        href: "/business/lithium-import",
      },
      {
        label: "Iron And Steel Scrap Import",
        href: "/business/iron-steel-import",
      },
      { label: "Aluminum Scrap Import", href: "/business/aluminum-import" },
      { label: "Copper Scrap Import", href: "/business/copper-import" },
      { label: "HMS Scrap Import", href: "/business/hms-import" },
      { label: "PET Bottle Scrap Import", href: "/business/pet-import" },
      {
        label: "Mixed Non-Ferrous Scrap (ISRI)",
        href: "/business/isri-import",
      },
      {
        label: "All Type Plastic Scrap Import",
        href: "/business/plastic-scrap-import",
      },
    ],
  },

  Waste: {
    "Battery Waste": [
      {
        label: "Scrap Battery Import License",
        href: "/waste/battery-import-license",
      },
      {
        label: "Lithium-ion Battery Import License",
        href: "/waste/lithium-import-license",
      },
      {
        label: "Lead Acid Battery Import License",
        href: "/waste/lead-acid-import",
      },
      {
        label: "Scrap Lead Acid Battery Recycling Plant",
        href: "/waste/lead-recycling-plant",
      },
      {
        label: "Scrap Lithium-ion Battery Recycling Plant",
        href: "/waste/lithium-recycling-plant",
      },
    ],
    "Plastic Waste": [
      {
        label: "Plastic Waste Processor Authorization",
        href: "/waste/plastic-processor-auth",
      },
      { label: "Plastic Waste Management", href: "/waste/plastic-mgmt" },
      {
        label: "Plastic Waste Import License",
        href: "/waste/plastic-import-license",
      },
      { label: "Plastic Recycling Business", href: "/waste/plastic-recycling" },
    ],
    "Hazardous Waste": [
      {
        label: "Hazardous Waste Management Authorization",
        href: "/waste/hazardous-auth",
      },
      {
        label: "Hazardous Waste Import Authorization",
        href: "/waste/hazardous-import",
      },
      {
        label: "Bio Medical Waste Authorization",
        href: "/waste/biomedical-auth",
      },
      { label: "Industrial Waste Management", href: "/waste/industrial-mgmt" },
    ],
    "E-Waste": [
      { label: "E-Waste Recycling Authorization", href: "/waste/ewaste-auth" },
      {
        label: "E-Waste Dismantler Authorization",
        href: "/waste/ewaste-dismantler",
      },
      {
        label: "Import of Refurbished Electronics",
        href: "/waste/refurbished-import",
      },
      { label: "E-Waste Recycling Plant", href: "/waste/ewaste-plant" },
      {
        label: "Recycler Registration Under CPCB",
        href: "/waste/cpcb-recycler",
      },
    ],
    "Scrap Tyre": [
      {
        label: "Scrap Tyre Recycling Authorization",
        href: "/waste/tyre-recycling-auth",
      },
      {
        label: "Scrap Tyre Import Authorization",
        href: "/waste/tyre-import-auth",
      },
      { label: "Scrap Tyre Recycling Plant", href: "/waste/tyre-plant" },
      {
        label: "Registration Under GPCB",
        href: "/waste/gpcb-tyre-registration",
      },
      {
        label: "Registration Under CPCB & DGFT",
        href: "/waste/cpcb-dgft-tyre-registration",
      },
    ],
  },

  EPR: {
    "EPR Registration": [
      { label: "EPR Authorization for E-Waste", href: "/epr/ewaste-auth" },
      { label: "PRO Authorization", href: "/epr/pro-auth" },
      { label: "EPR for Plastic Waste", href: "/epr/plastic-auth" },
      { label: "EPR for Lead Acid Battery", href: "/epr/lead-battery" },
      { label: "EPR for Lithium-ion Battery", href: "/epr/lithium-battery" },
      { label: "EPR for Waste Tyres", href: "/epr/tyres" },
      { label: "EPR Authorization", href: "/epr/auth" },
      { label: "EPR for Hazardous Waste", href: "/epr/hazardous" },
    ],
    "EPR Compliance": [
      { label: "E-Waste Post Compliance", href: "/epr/ewaste-compliance" },
      { label: "Post Compliance Report", href: "/epr/post-compliance-report" },
      { label: "Quarterly Battery Compliance", href: "/epr/battery-quarterly" },
      { label: "EPR for Waste Oil", href: "/epr/waste-oil" },
      { label: "EPR Certification", href: "/epr/certification" },
      { label: "EPR Target Fulfilment", href: "/epr/target-fulfilment" },
      { label: "EPR Compliance", href: "/epr/compliance" },
      { label: "CPCB EPR for Plastic", href: "/epr/cpcb-plastic" },
      { label: "EPR Recycling Targets", href: "/epr/recycling-targets" },
    ],
    "EPR Credits": [
      { label: "Carbon Credits", href: "/epr/carbon-credits" },
      { label: "Risk Assessment", href: "/epr/risk-assessment" },
      { label: "Carbon Credit Trading", href: "/epr/credit-trading" },
    ],
  },
};
