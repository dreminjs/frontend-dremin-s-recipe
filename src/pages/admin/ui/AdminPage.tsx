import Link from "next/link";

export const AdminPage = () => {
  return (
    <>
      <ul className="flex justify-center flex-wrap gap-14 border-2 py-5 mb-5">
        <li>
          <Link className="text-xl underline" href={"admin/types"}>
            типы
          </Link>
        </li>
        <li>
          <Link className="text-xl underline" href={"admin/nationalCuisines"}>
            национальные кухни
          </Link>
        </li>
        <li>
          <Link className="text-xl underline" href={"admin/holidays"}>
            праздники
          </Link>
        </li>
      </ul>

      <Link
        className="text-xl underline block text-center"
        href={"admin/recipes"}
      >
        управление рецептами
      </Link>
    </>
  );
};
