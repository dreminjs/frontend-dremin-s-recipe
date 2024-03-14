import Image from "next/image";
import { Inter } from "next/font/google";
import { RecipesPage } from "@/pages/RecipesPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <RecipesPage />;
}
