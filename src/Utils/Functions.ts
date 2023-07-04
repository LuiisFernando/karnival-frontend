export function onlyNumbers (value: string) {
  return value ? value.replace(/\D/g, "") : "";
};


export function formatCellphoneToMask(cellphone: string) {
  return cellphone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
} 