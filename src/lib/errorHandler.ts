import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
export type Params = {
  slug: string;
};
type RouteFunction<T extends Params, R> = (
  req?: NextRequest,
  params?: T,
) => Promise<R>;
function withErrorHandler<T extends Params, R>(fn: RouteFunction<T, R>) {
  return async function (req?: NextRequest, params?: T): Promise<R> {
    try {
      return await fn(req, params);
    } catch (error) {
      console.log('🚀 ~ file: errorHandler.ts:15 ~ error:', error);
      // Log the error to a logging system

      // Respond with a generic 500 Internal Server Error
      redirect('/error?status=500&message=servererror');
    }
  };
}

export default withErrorHandler;
