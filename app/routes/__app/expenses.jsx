import { Link, Outlet, useLoaderData } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import expensesStyles from '~/styles/expenses.css';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';


export default function ExpensesLayout() {
    // get data from closest loader, in this case same page below
    const expenses = useLoaderData();

    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add Expenses</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={expenses} />
            </main>
        </>
    );
}

export async function loader({request}) {
    // redirect user if not logged in *must add to all nested loaders to ensure data not fetched before redirect
    const userId = await requireUserSession(request);
    // Remix basically does json(rawData) behind scenes for same result
    return await getExpenses(userId);
}

export function links() {
    return [{ rel: 'stylesheet', href: expensesStyles }];
}