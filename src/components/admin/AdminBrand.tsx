import { BrandMark } from '../BrandMark'

export const AdminLogo = () => (
  <span className="admin-brand-logo">
    <BrandMark className="admin-brand-logo__mark" />
    <span>
      Chemillion
      <small>
        CHEMICAL<b>COMPANY</b>
      </small>
    </span>
  </span>
)

export const AdminIcon = () => <BrandMark className="admin-brand-icon" />

export const LoginIntro = () => (
  <div className="ch-login-intro">
    <h1>Website dashboard</h1>
    <p>Sign in to answer inquiries and update the website in English, Indonesian and Chinese.</p>
  </div>
)
