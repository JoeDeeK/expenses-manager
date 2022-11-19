import { Link, Outlet, useLoaderData } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import expensesStyles from '~/styles/expenses.css';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { getExpenses } from '~/data/expenses.server';


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

export async function loader() {
    return await getExpenses();
}

export function links() {
    return [{ rel: 'stylesheet', href: expensesStyles }];
}