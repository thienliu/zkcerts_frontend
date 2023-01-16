import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

export const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";
export const DEFAULT_TIME_FORMAT = "hh:mm A";
export const DEFAULT_DATE_TIME_FORMAT = `${DEFAULT_DATE_FORMAT} - ${DEFAULT_TIME_FORMAT}`;

export const toDateTime = (
  date?: string | number | Dayjs | null,
  format?: string
) => {
  if (!date) return "-";
  const DATE_TIME_FORMAT =
    format || `${DEFAULT_DATE_FORMAT} - ${DEFAULT_TIME_FORMAT}`;
  switch (typeof date) {
    case "number": {
      return dayjs.unix(date).format(DATE_TIME_FORMAT);
    }
    case "string": {
      return dayjs(date).format(DATE_TIME_FORMAT);
    }
    case "object": {
      if (dayjs.isDayjs(date)) {
        return dayjs(date as Dayjs).format(DATE_TIME_FORMAT);
      }
      throw new Error("Unknown date type");
    }
    default:
      throw new Error("Unknown date type");
  }
};
