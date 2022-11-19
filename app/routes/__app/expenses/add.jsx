import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate out of the modal/back when clicking outside the modal
    navigate('..');
  }

  return (
      <Modal onClose={closeHandler}>
          <ExpenseForm />
      </Modal>
  );
}

// form action=post will trigger this method when submitted
export async function action({request}) {
  const formData = await request.formData();
  // formData.get('title')
  const expenseData = Object.fromEntries(formData);
  console.log(expenseData, formData);

  await addExpense(expenseData);
  return redirect('/expenses');
}