import { parseIntOrDefaultValue } from '../parseIntOrDefaultValue'

test('/tools/utils/parseIntOrDefaultValue', () => {
  expect(parseIntOrDefaultValue('12', 10)).toEqual(12)
  expect(parseIntOrDefaultValue('shshsksk2', 10)).toEqual(10)
  expect(parseIntOrDefaultValue('', 10)).toEqual(10)
  expect(parseIntOrDefaultValue(' ', 10)).toEqual(10)
})
