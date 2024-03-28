import { RecipesAdminPage } from "@/pages/admin/ui/RecipesAdminPage";
import { isAdmin } from "@/shared";

function Recipes() {
  return <RecipesAdminPage />;
}

export default isAdmin(Recipes);
