import httpAdapter from "axios/lib/adapters/http";

let timeout: any;
let dataHolder: any = [];

/**
 * @param {*} func is the input function
 * @param {*} delay is the delay time in ms for recall the function
 * This function prevent from too much API calls
 */
function debounce(func: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(func, delay);
}

/**
 *
 * @param array it is the array of params that holds the ids
 * This function batched the ids
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
            httpAdapter(config).then(resolve(config)).catch(reject);
          }, 500);
        }).then(config);
      };

      return request;
    },
    (error) => Promise.reject(error)
  );

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
