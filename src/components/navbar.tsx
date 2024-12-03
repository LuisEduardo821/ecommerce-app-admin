import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { StoreSwitcher } from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export const Navbar = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-14 items-center px-4 justify-between">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-4" />
        <div className="flex ml-2 items-center space-x-4">
          <UserButton showName />
        </div>
      </div>
    </div>
  );
};
