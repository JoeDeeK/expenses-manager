import authStyles from '~/styles/auth.css';
import AuthForm from '~/components/auth/AuthForm';
import { validateAuthInput } from '~/data/validation.server';

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
        console.log('try to validate auth input')
        validateAuthInput(credentials);
    } catch (error) {
        return error;
    }

    // if (authMode === 'login') {

    // } else {
    //     // signup mode (create user)
    // }
    return { bla:'bla' }
}

export function links() {
    return [{ rel: 'stylesheet', href: authStyles }];
}