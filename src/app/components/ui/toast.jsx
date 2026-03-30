import { useUiStore } from '../../store/ui.store';

export function Toast() {
  const { toast } = useUiStore();

  if (!toast) return null;

  return <div className={`ui-toast ${toast.type || 'info'}`}>{toast.message}</div>;
}
