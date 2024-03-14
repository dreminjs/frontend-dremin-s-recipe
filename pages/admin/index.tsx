import { AdminPage } from "@/pages/admin";
import { isAdmin } from "@/shared";

function Admin() {
  return <AdminPage />;
}

export default isAdmin(Admin);
