import { monitorGamestop, monitorNewegg, monitorWalMart } from "./carriers";
import { notify } from "./utilities";

notify("Application Started");

try {
  monitorGamestop();
  monitorNewegg();
  monitorWalMart();
} catch (e) {
  notify("Application Stopped");
}
