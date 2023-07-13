export function onlyNumbers (value: string) {
  return value ? value.replace(/\D/g, "") : "";
};


export function formatCellphoneToMask(cellphone: string) {
  return cellphone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
} 

export function getWeekDayNameByIndex(indice: number) {
  const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  return diasSemana[indice];
}