export function Dropdown({ label, items = [] }) {
  return (
    <div className="ui-dropdown">
      <button className="ui-dropdown-trigger">{label}</button>
      <div className="ui-dropdown-menu">
        {items.map((item, i) => (
          <div key={i} className="ui-dropdown-item" onClick={item.onClick}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
