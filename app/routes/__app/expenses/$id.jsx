import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
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