type PrepareSearchDataProps = <T>(
  data: Record<string, keyof T>
) => Record<string, RegExp>;
export const prepareSearchData: PrepareSearchDataProps = <T>(
  data: Record<string, keyof T>
) => {
  return Object.keys(data!)
    .filter((key: string) => {
      return !(data[key] === undefined || data[key] === null);
    })
    .reduce<Record<string, RegExp>>((acc, key) => {
      return { ...acc, [`${key}`]: new RegExp(`.*${String(data[key])}.*`) };
    }, {});
};
