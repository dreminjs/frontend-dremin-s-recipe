import { HolidaysPage } from "@/pages/admin";
import { isAdmin } from "@/shared";

function Holidays() {
  return <HolidaysPage />;
}

export default isAdmin(Holidays);
