import Link from "next/link";

export const AdminPage = () => {
  return (
    <>
      <ul className="flex justify-center gap-14 border-2 py-5">
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
    </>
  );
};
