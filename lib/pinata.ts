import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL!,
});

export const uploadImage = async (image: File) => {
  try {
    const { cid } = await pinata.upload.file(image);
    console.log("Uploaded image at", cid);
    return cid;
  } catch (error) {
    console.log(error);
  }
};

export const uploadJson = async (
  title: string,
  description: string,
  imageHash: string
) => {
  const { cid } = await pinata.upload.json({
    name: title,
    description: description,
    image: `ipfs://${imageHash}`,
  });
  console.log("Uploaded json at", cid);
  return cid;
};
