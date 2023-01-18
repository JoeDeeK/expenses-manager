import authStyles from '~/styles/auth.css';
import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '~/data/validation.server';
import { login, signup } from '~/data/auth.server';
import { redirect } from '@remix-run/node';
// import { validateAuthInput } from '~/data/validation.server';

export default function AuthPage() {
    return <AuthForm />;
}

export async function action({request}) {
    // using searchParams because we are including them in the frontend
    const searchParams = new URL(request.url).searchParams
    const authMode = searchParams.get('mode') || 'login';

    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    // validate auth input
    try {
        // console.log('try to validate auth input')
        // validateAuthInput(credentials);
        validateCredentials(credentials)
    } catch (error) {
        return error;
    }

    try {
        if (authMode === 'login') {
            return await login(credentials);
        } else {
            return await signup(credentials);
            // return redirect('/expenses');
        }
    } catch (error) {
        if (error.status === 422 || error.status === 401) {
            return {credentials: error.message};
        }
    }
    return null;
}

export function links() {
    return [{ rel: 'stylesheet', href: authStyles }];
}