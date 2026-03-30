export function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="ui-modal-backdrop">
      <div className="ui-modal">
        <div className="ui-modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="ui-modal-body">{children}</div>
      </div>
    </div>
  );
}
