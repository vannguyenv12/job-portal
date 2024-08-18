export function checkOwner(user: UserPayload, id: number) {
  if (user.id === id || user.role === 'ADMIN') return true;

  return false;
}
