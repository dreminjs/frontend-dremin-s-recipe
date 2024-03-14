import { NationalCuisinesPage } from "@/pages/admin";
import { isAdmin } from "@/shared";

function NationalCuisines() {
  return <NationalCuisinesPage />;
}

export default isAdmin(NationalCuisines);
