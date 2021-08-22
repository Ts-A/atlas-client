const InputField = (props) => {
  const { labelProp, inputProp } = props;

  return (
    <div>
      <label>{labelProp}</label>
      <input type={inputProp?.type} />
    </div>
  );
};

export default InputField;
