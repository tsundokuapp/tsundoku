/**
 * Formata uma data para exibição
 * @param date Data a ser formatada
 * @param extense Se true, retorna formato extenso (ex: "1 de Janeiro de 2024")
 * @param includesDayOfWeek Se true, inclui o dia da semana
 */
export function formatDate(
  date: Date,
  extense = false,
  includesDayOfWeek = false,
): string {
  const isNotValidDate = isNaN(date.getTime());

  if (isNotValidDate) {
    return 'Data inválida';
  }

  const day = date.getDate();
  const monthNumber = date.getMonth() + 1;
  const dayOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ][date.getDay()];
  const month = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ][date.getMonth()];
  const year = date.getFullYear();

  const stringForExtense = extense
    ? `${day} de ${month} de ${year}`
    : `${day}/${monthNumber}/${year}`;

  const result = `${includesDayOfWeek ? `${dayOfWeek}, ` : ''} ${stringForExtense}`;

  return result;
}
