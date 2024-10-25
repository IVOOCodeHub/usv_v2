export const isOnProduction: boolean = false;

export const convertObjectToArray = (object: {
  [key: string]: string;
}): string[] => {
  return Object.keys(object).map((key: string) => object[key]);
};
