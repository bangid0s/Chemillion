import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor'
type Staff = { role?: Role; active?: boolean }
// Deactivated users keep a valid session until it expires, so every check must reject them, not only login.
const staff = (user: unknown) => {
  const u = user as Staff | null
  return u && u.active !== false ? u : null
}
const role = (user: unknown): Role | undefined => staff(user)?.role

export const isAdmin: Access = ({ req: { user } }) => role(user) === 'admin'
export const isAdminField: FieldAccess = ({ req: { user } }) => role(user) === 'admin'
export const isStaff: Access = ({ req: { user } }) => Boolean(staff(user))

/** Logged-in staff see drafts and hidden items; everyone else only sees published, visible documents. */
export const publishedOrStaff: Access = ({ req: { user } }) =>
  staff(user) ? true : { _status: { equals: 'published' }, hidden: { not_equals: true } }

/** Admins see all users; editors only themselves. */
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!staff(user)) return false
  if (role(user) === 'admin') return true
  return { id: { equals: user!.id } }
}
