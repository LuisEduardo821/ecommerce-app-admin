"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Portadas (9)"
          description="Administra las portadas de tu tienda"
        />
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo
        </Button>
      </div>
      <Separator />
    </>
  );
};
