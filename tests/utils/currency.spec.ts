import { convertCurrency } from '../../src/utils/currency'

describe('Currency utils', () => {
  it('convert from CLP to USD', () => {
    const amount = 116.54
    const rate = 798.050097

    const converted = convertCurrency(rate, amount)

    expect(converted).toBe(116.54 / 798.050097)
  })
})