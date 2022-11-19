import { redirect } from "@remix-run/node";

/*
    splat route. Remix loads then when no other routes match.
    contains * with route details.
    could move this into expenses folder to catch all unknown url requests for example
*/
export function loader({params}) {
    if (params['*'] === 'exp') {
        return redirect('/expenses');
    }

    throw new Response('Not Found', { status: 404 });
}