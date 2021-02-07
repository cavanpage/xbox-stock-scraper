import { getAllMonitorConfigs } from "./utilities";
import { monitor } from "./monitors";
import { notify } from "./notifications";

notify("Application Started");

try {
  getAllMonitorConfigs().forEach((x) => {
    monitor(x);
  });
} catch (e) {
  notify("Application Stopped");
}
