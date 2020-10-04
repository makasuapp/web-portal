import { AuthCheck, ProtectionType } from './AppRoute'

test('undefined user passes auth check', () => {
  const expected = AuthCheck('', '', undefined, ProtectionType.Authenticated)
  expect(expected).toBeTruthy()
})
