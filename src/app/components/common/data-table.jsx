import { Table } from '../ui/table';
import { EmptyState } from './empty-state';

export function DataTable({ columns, data }) {
  if (!data || data.length === 0) {
    return <EmptyState title="Veri bulunamadı" description="Henüz kayıt yok" />;
  }

  return <Table columns={columns} data={data} />;
}
