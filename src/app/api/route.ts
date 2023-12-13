import { redirect } from 'next/navigation';

try {
  // something that throws an error
  throw new Error('Internal server error');
} catch (e) {
  // your should probably log the error as well
  redirect('/error?status=500&message=servererror');
}
