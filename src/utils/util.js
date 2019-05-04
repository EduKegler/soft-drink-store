// Somente coloca a mascara do REAL (R$) em determinado float/int
export const floatToMoney = (value) => {
    value = value.toString()
    if (value.includes('.')) {
      value = value.split('.')
      if (value[1].length === 1) {
        return `R$ ${value[0]},${value[1]}0`;
      } else {
        return `R$ ${value[0]},${value[1]}`;
      }
    } else {
      return `R$ ${value},00`;
    }
  }