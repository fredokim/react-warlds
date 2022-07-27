export const fillZero = (length: number, value: any) => {
  value = String(value);
  return value.length >= length
    ? value
    : new Array(length - value.length + 1).join("0") + value;
};
