export function onlyNumbers (value: string) {
  return value ? value.replace(/\D/g, "") : "";
};


export function formatCellphoneToMask(cellphone: string) {
  return cellphone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
} 

export function getWeekDayNameByIndex(indice: number) {
  const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  return diasSemana[indice];
}

export function getDateFromPtBrPattern(date: string) {
  const dateSplited = date.split('/');

  const year = Number(dateSplited[2]);
  const month = Number(dateSplited[1]) - 1;
  const day = Number(dateSplited[0]);

  return new Date(year, month, day);
}