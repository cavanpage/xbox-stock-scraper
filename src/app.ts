import { getAllHandlerConfigs, notify } from "./utilities";
import { monitor } from "./monitors";

notify("Application Started");

try {
  getAllHandlerConfigs().forEach(x => {
    monitor(x);
  });
} catch (e) {
  notify("Application Stopped");
}
