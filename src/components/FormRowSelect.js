const FormRowSelect = ({ name, value, labelText, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((statusOption) => {
          return (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
