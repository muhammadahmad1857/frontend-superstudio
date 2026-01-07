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
import { NFT_ABI } from "../config/abi.config.ts";
import { Image, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface MintFormProps {
  contractAddress: `0x${string}`;
}

export function MintForm({ contractAddress }: MintFormProps) {
  const { isConnected } = useAccount();
  const [tokenURI, setTokenURI] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isTxLoading } = useWaitForTransactionReceipt({ hash });

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tokenURI.trim()) {
      toast.error("Please enter a token URI");
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
        functionName: "mint",
        args: [tokenURI],
      });

      toast.loading("Minting your NFT...");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Minting failed");
      setIsLoading(false);
    }
  };

  if (isTxLoading) {
    toast.loading("Processing transaction...");
  }

  if (hash && !isTxLoading) {
    toast.success("NFT minted successfully! 🎉");
    setTokenURI("");
    setIsLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-gray-200 shadow-lg dark:border-gray-800">
        <CardHeader className="border-b border-gray-200 bg-purple-50/50 dark:border-gray-800 dark:bg-purple-950/10">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 dark:bg-purple-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Mint Single NFT
              </CardTitle>
              <CardDescription className="mt-1 text-sm">
                Create a unique NFT with custom metadata
              </CardDescription>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleMint} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-2"
            >
              <Label
                htmlFor="tokenURI"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Metadata URI
              </Label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="tokenURI"
                  placeholder="https://example.com/metadata/1.json"
                  value={tokenURI}
                  onChange={(e) => setTokenURI(e.target.value)}
                  disabled={isLoading || isTxLoading}
                  className="pl-10 transition-all focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enter an IPFS hash or HTTPS URL pointing to your NFT metadata
                JSON file
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
                className="w-full bg-purple-600 text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg disabled:opacity-50"
                size="lg"
              >
                {isTxLoading || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isTxLoading
                      ? "Processing Transaction..."
                      : "Preparing Mint..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Mint NFT
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
