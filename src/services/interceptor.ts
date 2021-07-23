import httpAdapter from "axios/lib/adapters/http";

let timeout: any;
let dataHolder: any = [];

/**
 * This function prevent from too much API calls
 * @param {*} func is the input function
 * @param {*} delay is the delay time in ms for recall the function
 */
function debounce(func: any, delay: any) {
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

function batchInterceptor(instance: any) {
  instance.interceptors.request.use(
    (request: any) => {
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
    (error: any) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (request: any) => {
      dataHolder = [];
      return request;
    },
    (error: any) => {
      dataHolder = [];
      return Promise.reject(error);
    }
  );
}
export default batchInterceptor;
