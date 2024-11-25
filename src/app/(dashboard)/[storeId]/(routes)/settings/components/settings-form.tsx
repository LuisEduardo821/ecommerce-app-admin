"use client";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { CircleCheck, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Tienda actualizada.", {
        icon: <CircleCheck className="text-emerald-500 h-5 w-5" />,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Algo salió mal!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Tienda eliminada", {
        icon: <CircleCheck className="text-emerald-500 h-5 w-5" />,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Asegúrese de eliminar todos los productos y categorías primero.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onCloseModal={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Configuración"
          description="Administrar las preferencias de la tienda"
        />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nombre de la tienda"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto">
            Guardar cambios
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};
