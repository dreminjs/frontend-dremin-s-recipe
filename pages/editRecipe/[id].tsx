import { EditRecipePage } from "@/pages/EditRecipe";
import { useRouter } from "next/router";
function EditRecipe() {
  const router = useRouter();

  const { id } = router.query;

  return <EditRecipePage id={id} />;
}

export default EditRecipe;
