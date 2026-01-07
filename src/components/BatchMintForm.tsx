import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Label } from "./ui/label";
import { NFT_ABI } from "../config/abi";
import { Image, Loader2, Layers, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface BatchMintFormProps {
  contractAddress: `0x${string}`;
}

export function BatchMintForm({ contractAddress }: BatchMintFormProps) {
  const { isConnected } = useAccount();
  const [tokenURI, setTokenURI] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isTxLoading } = useWaitForTransactionReceipt({ hash });

  const handleBatchMint = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tokenURI.trim()) {
      toast.error("Please enter a token URI");
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (qty > 100) {
      toast.error("Maximum 100 NFTs per batch");
      return;
    }

    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }

    setIsLoading(true);

    try {
      writeContract({
        address: contractAddress,
        abi: NFT_ABI,
        functionName: "batchMint",
        args: [tokenURI, BigInt(qty)],
      });

      toast.loading(`Minting ${qty} NFTs...`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Batch minting failed"
      );
      setIsLoading(false);
    }
  };

  if (isTxLoading) {
    toast.loading("Processing transaction...");
  }

  if (hash && !isTxLoading) {
    toast.success(`Successfully minted ${quantity} NFTs! 🎉`);
    setTokenURI("");
    setQuantity("1");
    setIsLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-gray-200 shadow-lg dark:border-gray-800">
        <CardHeader className="border-b border-gray-200 bg-pink-50/50 dark:border-gray-800 dark:bg-pink-950/10">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-600 dark:bg-pink-500">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Batch Mint NFTs
              </CardTitle>
              <CardDescription className="mt-1 text-sm">
                Create multiple NFTs efficiently in one transaction
              </CardDescription>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleBatchMint} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-2"
            >
              <Label
                htmlFor="batchTokenURI"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Metadata URI
              </Label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="batchTokenURI"
                  placeholder="https://example.com/metadata.json"
                  value={tokenURI}
                  onChange={(e) => setTokenURI(e.target.value)}
                  disabled={isLoading || isTxLoading}
                  className="pl-10 transition-all focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                All NFTs in this batch will use the same metadata URI
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="space-y-2"
            >
              <Label
                htmlFor="quantity"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Quantity
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={isLoading || isTxLoading}
                  className="pl-10 transition-all focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Maximum 100 NFTs per batch transaction
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button
                type="submit"
                disabled={isLoading || isTxLoading || !isConnected}
                className="w-full bg-pink-600 text-white shadow-md transition-all hover:bg-pink-700 hover:shadow-lg disabled:opacity-50"
                size="lg"
              >
                {isTxLoading || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isTxLoading
                      ? "Processing Transaction..."
                      : "Preparing Batch..."}
                  </>
                ) : (
                  <>
                    <Layers className="mr-2 h-4 w-4" />
                    Mint {quantity} {quantity === "1" ? "NFT" : "NFTs"}
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
