import apiClient from "./apiClient";
// All requests should run at the same time and produce only one request to the backend. All requests should return or reject.
const batchUrl = "/file-batch-api";

async function runTest() {
  // Should return [{id:”fileid1”},{id:”fileid2”}]
  apiClient.get(batchUrl, { params: { ids: ["fileid1", "fileid2"] } });
  // Should return [{id:”fileid2”}]
  apiClient.get(batchUrl, { params: { ids: ["fileid2"] } });
  // Should reject as the fileid3 is missing from the response
  apiClient.get(batchUrl, { params: { ids: ["fileid3"] } });
}

runTest();
