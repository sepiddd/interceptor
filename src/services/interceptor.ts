import { throttle } from "lodash";

let timeout;
let dataHolder: any = [];

/**
 * This function prevent from too much API calls
 * @param {*} func is the input function
 * @param {*} delay is the delay time in ms for recall the function
 */
// function debounce(func, delay) {
//   clearTimeout(timeout);
//   timeout = setTimeout(func, delay);
// }

/**
 *
 * @param array it is the array of params that holds the ids
 * This function batched the ids
 */
const uniqueArray = (array: Array<String>) => {
  dataHolder = [...(new Set([...dataHolder, ...array]) as any)];
};

function batchInterceptor(instance: any) {
  instance.interceptors.request.use(
    (request: any) => {
      uniqueArray(request.params.ids);

      return request;
    },
    (error: any) => Promise.reject(error)
  );

  instance.interceptors.response.use((request: any) => {
    dataHolder = [];
  });
}
export default batchInterceptor;
