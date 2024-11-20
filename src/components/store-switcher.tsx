"use client";
import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStoreModal } from "@/hooks";
import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
type PopoversTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoversTriggerProps {
  items: Store[];
}
export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="selecionar una tienda"
            className={cn("w-[200px] justify-between", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            Tienda actual
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Buscar tienda..." />
              <CommandEmpty>Tienda no encontrada.</CommandEmpty>
              <CommandGroup heading="Tiendas">
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    value={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};