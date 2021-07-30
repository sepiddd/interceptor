import httpAdapter from "axios/lib/adapters/http";

let timeout: any;
let dataHolder: any = [];

/**
 * This function prevent from too much API calls
 * @param {() => void} func is the input function
 * @param {number} delay is the delay time in ms for recall the function
 */
function debounce(func: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(func, delay);
}

/**
 *
 * This function batched the ids and hold the value into dataHolder
 * @param array it is the array of params that holds the ids
 */
const uniqueArray = (array: Array<string>) => {
  dataHolder = [...new Set([...dataHolder, ...array])];
};

function batchInterceptor(instance) {
  instance.interceptors.request.use(
    (request) => {
      request.adapter = (config) => {
        uniqueArray(config.params.ids);
        config.params = { ids: dataHolder };
        return new Promise((resolve, reject) => {
          debounce(() => {
            httpAdapter(config).then(resolve).catch(reject);
          }, 500);
        }).then(config);
      };

      return request;
    },
    (error) => Promise.reject(error)
  );

  /**
   * this section will empty the batched ids after request is snet
   */
  instance.interceptors.response.use(
    (response) => {
      dataHolder = [];
      return response;
    },
    (error) => {
      dataHolder = [];
      return Promise.reject(error);
    }
  );
}
export default batchInterceptor;
