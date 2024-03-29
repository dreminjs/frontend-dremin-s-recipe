import { RecipePage } from "@/pages/RecipePage";
import { useRouter } from "next/router";
export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/recipes");

  const posts = await response.json();

  const paths = posts.map((post: any) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`http://localhost:3000/recipes/${params.id}`);

  const recipe = await res.json();

  return { props: { recipe }, revalidate: 10 };
}

const Index = ({ recipe }: any) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <RecipePage
      countOfLikes={recipe.countOfLikes}
      description={recipe.description}
      imgName={recipe.img}
      ingredients={recipe.ingredients}
      typeName={recipe.type.name}
      nationalCuisineName={recipe.nationalCuisine.name}
      holidayName={recipe.holiday.name}
      steps={recipe.steps}
      title={recipe.title}
      authorId={recipe.author.id}
      authorName={recipe.author.username}
      recipeId={id}
    />
  );
};

export default Index;
