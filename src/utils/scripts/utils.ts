export const isOnProduction: boolean = false;

export const convertENDateToFr = (dateString: string): string => {
  const date = new Date(dateString);

  const day: string = String(date.getDate()).padStart(2, "0"); // Ajoute un zéro si le jour est inférieur à 10
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0 donc on ajoute +1
  const year: number = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const convertFrDateToEn = (dateString: string): string => {
  const date = new Date(dateString);

  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: number = date.getFullYear();

  return `${year}-${day}-${month}`;
};

export const convertFrDateToServerDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("/");

  return `${year}-${month}-${day}`;
};
