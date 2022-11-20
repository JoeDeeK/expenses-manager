import { Form, Link, useFetcher } from "@remix-run/react";

function ExpenseListItem({ id, title, amount }) {
  // use fetcher when you want to submit requests behind scenes without triggering navigation actions
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    fetcher.submit(null, {method: 'delete', action: `/expenses/${id}`});
  }

  if (fetcher.state !== 'idle') {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* We do not want to use Link here (get request), we are deleting. form does not offer mothod=delete but Form does */}
        {/* could add  ?mode=delete to query parameter, but will use Form method instead */}
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        {/* lets useFetcher hook instead of submit form for deleting */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
