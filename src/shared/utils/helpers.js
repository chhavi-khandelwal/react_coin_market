/**
 * Get formatted string of a number eg: 171155540318 => 171,155,540,318
 * @param number
 * @returns { String }
 */
export const getFormattedString = number => {
  const nf = new Intl.NumberFormat();
	return nf.format(Number(number).toFixed(2)); 
}
