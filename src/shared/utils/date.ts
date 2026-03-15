/**
 * Formata uma data para exibição
 * @param date Data a ser formatada
 * @param extense Se true, retorna formato extenso (ex: "1 de Janeiro de 2024")
 * @param includesDayOfWeek Se true, inclui o dia da semana
 */

function parseDate(date: Date | string): Date {
  if (date instanceof Date) {
    return date;
  }

  const normalizedDate = date.trim();
  const brazilianDatePattern =
    /^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/;
  const match = normalizedDate.match(brazilianDatePattern);

  if (match) {
    const [, day, month, year, hour = '0', minute = '0', second = '0'] = match;
    const parsedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    );

    const isValidBrazilianDate =
      parsedDate.getFullYear() === Number(year) &&
      parsedDate.getMonth() === Number(month) - 1 &&
      parsedDate.getDate() === Number(day) &&
      parsedDate.getHours() === Number(hour) &&
      parsedDate.getMinutes() === Number(minute) &&
      parsedDate.getSeconds() === Number(second);

    return isValidBrazilianDate ? parsedDate : new Date('invalid');
  }

  return new Date(normalizedDate);
}

export function formatDate(
  date: Date | string,
  extense = false,
  includesDayOfWeek = false,
): string {
  const parsedDate = parseDate(date);
  const isNotValidDate = isNaN(parsedDate.getTime());

  if (isNotValidDate) {
    return 'Data inválida';
  }

  const day = parsedDate.getDate();
  const monthNumber = parsedDate.getMonth() + 1;
  const dayOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ][parsedDate.getDay()];
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
  ][parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  const stringForExtense = extense
    ? `${day} de ${month} de ${year}`
    : `${day}/${monthNumber}/${year}`;

  const result = `${includesDayOfWeek ? `${dayOfWeek}, ` : ''} ${stringForExtense}`;

  return result;
}
