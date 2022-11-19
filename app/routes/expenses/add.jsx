import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

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