import { AuthCheck, ProtectionType } from './AppRoute'

test('undefined user passes auth check', () => {
  const expected = AuthCheck('', '', undefined, ProtectionType.Authenticated)
  expect(expected).toBeTruthy()
})

test('null user fails auth check', () => {
  const expected = AuthCheck('', '', null, ProtectionType.Authenticated)
  expect(expected).toBeFalsy()
})
