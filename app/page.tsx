"use client";

import { ERC721_ABI } from "@/lib/erc721Abi";
import { uploadImage, uploadJson } from "@/lib/pinata";
import { useState } from "react";
import { useWriteContract } from "wagmi";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { writeContract } = useWriteContract();

  const ERC721_ADDRESS = "0x306F8d9A90567D29b67d3503147ECA860A594475";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image !== null) {
      const imageHash = await uploadImage(image);
      const jsonHash = await uploadJson(name, description, imageHash!);
      writeContract({
        address: ERC721_ADDRESS,
        abi: ERC721_ABI,
        functionName: "safeMint",
        args: [recipient as `0x${string}`, `ipfs://${jsonHash}`],
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <appkit-button />
      <div className="space-y-4 p-4 border rounded shadow-lg bg-white text-black">
        <h2 className="text-xl font-bold mb-4 text-center">Mint NFT</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="mr-7">Recipient:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-64 p-1 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-16">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-64 p-1 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-64 p-1 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-10">Picture:</label>
            <input
              type="file"
              accept="image/"
              className="w-64 p-1 border rounded"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Mint NFT
          </button>
        </form>
      </div>
    </div>
  );
}
