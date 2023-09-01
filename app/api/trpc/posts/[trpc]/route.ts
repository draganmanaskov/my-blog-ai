import {fetchRequestHandler} from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers/posts';

const handler = (req: Request) => 
    fetchRequestHandler({
        endpoint: "/api/trpc/posts",
        req,
        router: appRouter,
        createContext: () => ({}),
    });

export {handler as GET, handler as POST};

// old next js implementation

// import * as trpcNext from '@trpc/server/adapters/next';
// import { appRouter } from '../../../server/routers/_app';

// // export API handler
// // @see https://trpc.io/docs/server/adapters
// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: () => ({}),
// });
