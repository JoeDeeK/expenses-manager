import { Form, Link, useActionData, useSearchParams, useTransition } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  // include url search parameters (useSearchParams returns searchParams and setSearchParams)
  const [searchParams] = useSearchParams();
  const navigation = useTransition();

  // pick up on error thrown by serverside validation
  const validationErrors = useActionData();

  const authMode = searchParams.get('mode') || 'login';

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
  const toggleBtnCaption = authMode === 'login' ? 'Create a new user' : 'Log in with existing user';

  const isSubmitting = navigation.state !== 'idle';

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus/>}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={5} maxLength={10} />
      </p>
      {validationErrors && <ul>{Object.values(validationErrors).map((error) => <li key={error}>{error}</li>)}</ul>}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Authenticating...' : submitBtnCaption}</button>
        {/* dynamically use ?mode=signup instead of /auth */}
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>{toggleBtnCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;
