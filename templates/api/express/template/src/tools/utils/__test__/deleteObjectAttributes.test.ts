import { deleteObjectAttributes } from '../deleteObjectAttributes'

test('/tools/utils/deleteObjectAttributes', () => {
  const object = { attribute1: 'value1', attribute2: 'value2' }
  const hiddenObjectAttributes = ['attribute2']
  const result = deleteObjectAttributes(object, hiddenObjectAttributes)
  expect(result.attribute1).toEqual('value1')
  expect(result.attribute2).not.toBeDefined()
})
