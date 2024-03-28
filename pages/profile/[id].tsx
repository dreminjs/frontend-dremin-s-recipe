import { OtherUserProfile } from "@/pages/UserPage";
import { useRouter } from "next/router";
export default function OtherUserPage() {
  const { id } = useRouter().query;

  return <OtherUserProfile id={id} />;
}
