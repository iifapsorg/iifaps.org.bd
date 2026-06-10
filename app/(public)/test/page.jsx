import { getSubcategories } from "@/services/category.service";

const Page = async () => {
  const subcategoriesFromCA = await getSubcategories(
    "6a28ba1683ad01003b2e2a43",
  );
  const subcategoriesFromCB = await getSubcategories(
    "6a28b9fa83ad01003b2e2a41",
  );
  const subcategoriesFromCC = await getSubcategories(
    "6a28ba0b83ad01003b2e2a42",
  );

  return (
    <div className="space-y-2">
      <h1>SubCategories of category A</h1>
      {subcategoriesFromCA?.map((sub) => (
        <div key={sub._id} className="border p-3 rounded">
          <h2>{sub.name}</h2>
        </div>
      ))}
      <h1>SubCategories of category B</h1>
      {subcategoriesFromCB?.map((sub) => (
        <div key={sub._id} className="border p-3 rounded">
          <h2>{sub.name}</h2>
        </div>
      ))}
      <h1>SubCategories of category C</h1>
      {subcategoriesFromCC?.map((sub) => (
        <div key={sub._id} className="border p-3 rounded">
          <h2>{sub.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Page;
