import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useParams,
  // useSubmit
  useTransition
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  // pick up on error thrown by serverside validation
  const validationErrors = useActionData();

  // pick up form data from loader in $id.jsx
  // const expenseData = useLoaderData();

  // get all routes loaded using matches hook (faster)
  const matches = useMatches();
  // could get params in loader data or using params hook
  const params = useParams();
  const expenses = matches.find((match) => match.id === 'routes/__app/expenses').data;
  const expenseData = expenses.find(expense => expense.id === params.id);

  // display message when invalid expense id entered in url (instead of loading 404 error)
  if(params.id && !expenseData) {
    // throw new Response();
    return <p>Invalid expense id.</p>;
  }

  const defaultValues = expenseData ? {
    title: expenseData.title,
    amount: expenseData.amount,
    date: expenseData.date.slice(0, 10)
  } :
  {
    title: "",
    amount: "",
    date: ""
  }

  // // submit programmically
  // const submit = useSubmit();
  // function submitHandler(event) {
  //   event.preventDefault();
  //   // perform own validation
  //   submit(event.target, {
  //     // action: '/expenses/add',
  //     method: 'post',
  //   })
  // }

  const navigation = useTransition();
  const isSubmitting = navigation.state !== 'idle';

  // use <Form instead of <form to generate and send http request by Remix behind scenes. Stay in single page app.
  return (
    <Form
      // use patch for updating, post for adding new
      method={expenseData ? 'patch' : 'post'}
      className="form"
      // onSubmit={submitHandler}
      id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValues.title}/>
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required defaultValue={defaultValues.date}/>
        </p>
      </div>
      {validationErrors && <ul>{Object.values(validationErrors).map((error) => <li key={error}>{error}</li>)}</ul>}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Expense'}</button>
        {/* Can use '/expenses' or '..' to move back to parent folder */}
        <Link to=".." >Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
