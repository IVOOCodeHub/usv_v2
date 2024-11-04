export const isOnProduction: boolean = false;

export const convertENDateToFr = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); // Ajoute un zéro si le jour est inférieur à 10
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0 donc on ajoute +1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
