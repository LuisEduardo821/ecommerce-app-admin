import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <div>
      <p>Nombre de la tienda: {store?.name}</p>
      <p>Id de la tienda: {params.storeId}</p>
    </div>
  );
};

export default DashboardPage;
