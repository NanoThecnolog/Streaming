/**
 * 
 * @returns Retorna uma string com a data daqui a 5 dias no formato YYYY-MM-DD
 */

export function getFiveDaysLater() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}