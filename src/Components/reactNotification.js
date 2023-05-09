/* eslint-disable default-case */
import { NotificationManager } from "react-notifications";

export default function createNotification(type, msg) {
  switch (type) {
    case "info":
      NotificationManager.info(msg);
      console.log("info");
      break;
    case "success":
      NotificationManager.success(msg);
      console.log("success");
      break;
    case "warning":
      NotificationManager.warning(msg);
      console.log("warning");
      break;
    case "error":
      NotificationManager.error(msg);
      console.log("error");
      break;
  }
}
