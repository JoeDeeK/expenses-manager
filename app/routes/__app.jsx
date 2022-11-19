/* pathless layout component. file name must match folder name and start with two leading underscores. all files inside __app folder wrapped with same styles. */
import expensesStyles from '~/styles/expenses.css';

import { Outlet } from "@remix-run/react";
import ExpensesHeader from '~/components/navigation/ExpensesHeader';

export default function ExpensesAppLayout() {
    return (
        <>
            <ExpensesHeader />
            <Outlet />
        </>
    );
}

export function links() {
    return [{rel: 'stylesheet', href: expensesStyles }]
}