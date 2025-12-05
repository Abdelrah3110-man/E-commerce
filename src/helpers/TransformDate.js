export default function TransformDate(data) {
  const selectedData = new window.Date(data);
  const getfullyear = selectedData.getFullYear();
  const getMonth = (selectedData.getMonth() + 1).toString().padStart(2, "0");
  const getDay = selectedData.getDate().toString().padStart(2, "0");

  return `${getfullyear}-${getMonth}-${getDay}`;
}
