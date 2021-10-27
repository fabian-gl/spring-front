exports.extractDataFromForm = (formElem) => {
  const inputs = Array.from(formElem.querySelectorAll("input"));

  const dataObject = inputs.reduce(
    (prev, curr) => ({ ...prev, [curr.name]: curr.value }),
    {}
  );

  return dataObject;
};
