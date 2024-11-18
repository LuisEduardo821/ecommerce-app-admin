export default function DashboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div>
      Estas en la pagina del dashboard
      {params.storeId}
    </div>
  );
}
