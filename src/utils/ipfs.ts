const publicGateway = "https://gateway.pinata.cloud/ipfs";

export const uriToUrl = (ipfsUri: string) => {
  const array = ipfsUri.split("/");
  const cid = array[array.length - 1];
  console.debug({ array, cid });
  const url = `${publicGateway}/${cid}`;
  return url;
};
