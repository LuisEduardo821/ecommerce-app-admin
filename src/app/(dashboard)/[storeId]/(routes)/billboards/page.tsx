import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";

export default async function BillboardsPage() {

  const billboards = await prismadb.billboard.findMany();
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
}
