import { TypesPage } from "@/pages/admin";
import { isAdmin } from "@/shared";

function Types() {
  return <TypesPage />;
}

export default isAdmin(Types);
