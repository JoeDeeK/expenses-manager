/* pathless layout component. file name must match folder name and start with two leading underscores. all files inside __marketing folder wrapped with same styles. */
import marketingStyles from '~/styles/marketing.css';

import { Outlet } from "@remix-run/react";
import MainHeader from '~/components/navigation/MainHeader';
import { getUserFromSession } from '~/data/auth.server';

export default function ExpensesAppLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    );
}

export function loader({request}) {
    return getUserFromSession(request);
}

export function links() {
    return [{rel: 'stylesheet', href: marketingStyles }]
}