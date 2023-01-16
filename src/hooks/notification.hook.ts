import { notification } from "ant-design-vue";
import type { NotificationType } from "@/types";

export const openNotification = ({
  title,
  description,
  type,
}: {
  title: any;
  description?: any;
  type: NotificationType;
}) => {
  notification[type]({
    message: title,
    description,
  });
};
