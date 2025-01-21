import dayjs from "dayjs";
import "dayjs/locale/uk";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatDateToRelative = (
  date: Date | null | undefined,
  locale: string
) => {
  dayjs.locale(locale);

  return date !== null && date !== undefined ? dayjs(date).fromNow() : null;
};
