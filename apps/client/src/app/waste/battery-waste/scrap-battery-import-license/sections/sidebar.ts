import Overview from "./overview";
import Eligibility from "./eligibility";
import Documents from "./documents";
import Procedure from "./procedure";
import Rules from "./rules";
import AssistSection from "./assistSection";

export const sections = [
  { id: "Overview", Component: Overview },
  { id: "Eligibility", Component: Eligibility },
  { id: "Documents Required", Component: Documents },
  { id: "Procedure", Component: Procedure },
  { id: "Battery Rules", Component: Rules },
  { id: "Assist", Component: AssistSection },
];
