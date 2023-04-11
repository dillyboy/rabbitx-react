const makeNumberReadable = (num: number) => {
  if (num) {
    return num.toLocaleString('en-US', {maximumFractionDigits:2, minimumFractionDigits:2});
  } else {
    return num
  }
}

const getNumberColor = (num: number) => {
  if (num === 0) {
    return '';
  }
  return num > 0 ? '#16c784': '#ea3943'
}

export { makeNumberReadable, getNumberColor };