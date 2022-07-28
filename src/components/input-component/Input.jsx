import './input.scss';

const Input = ({ value, type, onChange, maxlength }) => {
  return (
    <input
      className='input-field'
      value={value}
      type={type}
      onChange={onChange}
      maxLength={maxlength}
    />
  );
};

export default Input;
