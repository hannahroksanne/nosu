const fff = window.fetch;

const handleSearchResponse = async (response, inputData) => {
  const clonedResponse = response.clone();
  const data = await clonedResponse.json();
  const currentStoredData = localStorage.getItem("_steel") || "[]";
  const storedData = JSON.parse(currentStoredData);
  const queryObject = JSON.parse(inputData.body).search_queries[0];
  const queryName = queryObject.name;
  const clips = data.result[queryName].result;
  const existingIds = storedData.map((clip) => clip.id);
  const uniqueClips = clips.filter((clip) => !existingIds.includes(clip.id));

  console.log("FOUND UNIQUE CLIPS:", uniqueClips.length);
  storedData.push(...uniqueClips);
  localStorage.setItem("_steel", JSON.stringify(storedData));
  console.log({
    existingIds,
    queryObject,
    queryName,
    data,
    uniqueClips,
    storedData,
    inputData,
  });
};

window.fetch = async (...args) => {
  const url = args[0].toString();
  const method = args[1]?.method;
  const searchUrl = "https://studio-api.suno.ai/api/search/";
  const searchMethod = "POST";

  const response = await fff(...args);

  if (url === searchUrl && method === searchMethod) {
    console.log("Got a search call...", {
      url,
      options: args[1],
    });

    handleSearchResponse(response, args[1]);
  }

  return response;
};
