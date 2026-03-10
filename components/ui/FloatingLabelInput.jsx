export default function FloatingLabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="floating-label-group">
      <input
        id={id}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
