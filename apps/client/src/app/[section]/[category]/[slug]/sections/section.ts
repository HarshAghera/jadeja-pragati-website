import Overview from "./overview";
import Documents from "./documents";
import Procedure from "./procedure";
import Rules from "./rules";
import Assist from "./assistSection";
import Eligibility from "./eligibility";


export const sections = [
  { id: "Overview", Component: Overview },
  { id: "Eligibility", Component: Eligibility },
  { id: "Documents Required", Component: Documents },
  { id: "Procedure", Component: Procedure },
  { id: "Battery Rules", Component: Rules },
  { id: "Assist", Component: Assist },
];
