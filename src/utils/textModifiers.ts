const makeNumberReadable = (num: number) => {
  return num.toLocaleString('en-US', {maximumFractionDigits:2, minimumFractionDigits:2}); // "1,234.57"
}

const getNumberColor = (num: number) => {
  if (num === 0) {
    return '';
  }
  return num > 0 ? '#16c784': '#ea3943'
}

export { makeNumberReadable, getNumberColor };