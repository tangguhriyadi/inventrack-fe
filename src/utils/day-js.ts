import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.locale("id");
dayjs.extend(relativeTime);
dayjs.extend(duration);

const customDayjs = dayjs;

export default customDayjs;
