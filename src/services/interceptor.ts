function batchInterceptor(instance: any) {
  instance.interceptors.request.use(
    (request: any) => {
      // Add your code here
      console.log(`${request.method} ${request.url}`);
      return request;
    },
    (error: any) => Promise.reject(error)
  );
}
export default batchInterceptor;
