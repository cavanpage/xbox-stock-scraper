import { monitorGamestop, monitorNewegg, monitorWalMart } from "./carriers";
import { monitorBestbuy } from "./carriers/bestbuy";
import { monitorTarget } from "./carriers/target";
import { notify } from "./utilities";

notify("Application Started");

try {
  monitorBestbuy();
  monitorGamestop();
  monitorNewegg();
  monitorTarget();
  monitorWalMart();
} catch (e) {
  notify("Application Stopped");
}
