import { useState } from 'react';

interface PromiseResult<T> {
  status: 'fulfilled' | 'rejected';
  index: number;
  data: T | Error;
}

export const usePromise = () => {
  const [results, setResults] = useState<PromiseResult<unknown>[]>([]);
  const [loading, setLoading] = useState(false);

  function limitConcurrency<T>(
    promiseFns: (() => Promise<T>)[],
    limit = 3,
  ): Promise<PromiseResult<T>[]> {
    let activePromises = 0;
    const results: PromiseResult<T>[] = [];
    const queue = promiseFns.map((promiseFn, index) => ({ promiseFn, index }));

    setLoading(true);
    setResults([]);

    return new Promise((resolve) => {
      function runNext() {
        if (queue.length === 0 && activePromises === 0) {
          const allPromises = results.sort((a, b) => a.index - b.index);

          resolve(allPromises);
          setLoading(false);

          return;
        }

        while (activePromises < limit && queue.length > 0) {
          const { promiseFn, index } = queue.shift()!;
          if (promiseFn) {
            activePromises++;

            promiseFn()
              .then((result) => {
                const successResult: PromiseResult<T> = {
                  status: 'fulfilled',
                  index,
                  data: result,
                };
                results.push(successResult);
                setResults((prevResults) => [...prevResults, successResult]);
              })
              .catch((error) => {
                const errorResult: PromiseResult<T> = {
                  status: 'rejected',
                  index,
                  data: error,
                };
                results.push(errorResult);
                setResults((prevResults) => [...prevResults, errorResult]);
              })
              .finally(() => {
                activePromises--;
                runNext();
              });
          }
        }
      }

      runNext();
    });
  }

  return {
    results,
    loading,
    limitConcurrency,
  };
};
