export default (word) => {
  let to;
  if (word !== null) to = word.toLowerCase();
  let wordConvert;
  switch (to) {
    case "japan":
      wordConvert = "Япон";
      break;
    case "united kingdom":
      wordConvert = "Их Британи";
      break;
    case "korea":
      wordConvert = "Солонгос";
      break;
    case "thailand":
      wordConvert = "Тайланд";
      break;
    case "singapore":
      wordConvert = "Сингапур";
      break;
    case "dubai":
      wordConvert = "Дубай";
      break;
    case "petrol":
      wordConvert = "Бензин";
      break;
    case "diesel":
      wordConvert = "Дизель";
      break;
    case "hybrid(petrol)":
      wordConvert = "Хайбрид (Бензин)";
      break;
    case "electric":
      wordConvert = "Цахилгаан";
      break;
    case "other":
      wordConvert = "Бусад";
      break;
    case "hybrid(diesel)":
      wordConvert = "Хайбрид (Дизель)";
      break;
    case "right":
      wordConvert = "Баруун";
      break;
    case "left":
      wordConvert = "Зүүн";
      break;
    default:
      wordConvert = word;
      break;
  }

  return wordConvert;
};
