import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatDateToRelative = (date: Date | null | undefined) => {
  return date !== null ? dayjs(date).fromNow() : null;
};
