import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-14 items-center px-4">
        <div>Store switch</div>
        <MainNav className="mx-4" />
        <div className="flex ml-auto items-center space-x-4">
          <UserButton showName />
        </div>
      </div>
    </div>
  );
};
