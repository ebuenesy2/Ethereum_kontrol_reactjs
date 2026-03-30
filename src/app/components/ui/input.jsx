export function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`ui-input ${className}`}
      {...props}
    />
  );
}
