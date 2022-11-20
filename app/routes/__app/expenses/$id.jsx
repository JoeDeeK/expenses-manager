import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpense } from "~/data/expenses.server";


export default function UpdateExpensesPage() {
    const navigate = useNavigate();

    function closeHandler() {
        // navigate programmically
        navigate('..');
    }

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm />
        </Modal>
    );
}

// export async function loader({params}) {
//     // must match file name $id
//     const expenseId = params.id;
//     const expense = await getExpense(expenseId);
//     return expense;
// }

// this function can be triggered by two forms, update ($id) and delete (ExpenseListItem)
export async function action({params, request}) {
    const expenseId = params.id;

    if (request.method === 'PATCH') {
        const formData = await request.formData();
        const expenseData = Object.fromEntries(formData);

        try {
            validateExpenseInput(expenseData);
        } catch (error) {
            return error;
        }

        await updateExpense(expenseId, expenseData);
        return redirect('/expenses');
    } else if (request.method === 'DELETE') {
        await deleteExpense(expenseId);

        // lets useFetcher() hook to update page contents instead of redirecting after form for deletion.
        // return redirect('/expenses');
        // must return something
        return { deletedId: expenseId };
    }
}