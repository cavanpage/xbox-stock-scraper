import { getAllHandlerConfigs } from "./utilities";
import { monitor } from "./monitors";
import { notify } from "./notifications";

notify("Application Started", undefined, false, true);

try {
  getAllHandlerConfigs().forEach((x) => {
    monitor(x);
  });
} catch (e) {
  notify("Application Stopped");
}
