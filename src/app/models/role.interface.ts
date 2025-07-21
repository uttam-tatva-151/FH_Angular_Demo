export interface RoleInterface {
  user: string;
  role: string;
}

export function createDefaultRole(): RoleInterface {
  return {
    user: 'U',
    role: 'R'
  };
}
