/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
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
import { NFT_ABI } from "../config/abi.config";
import { Image, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface MintFormProps {
  contractAddress: `0x${string}`;
}

export function MintForm({ contractAddress }: MintFormProps) {
  const { isConnected } = useAccount();
  const [tokenURI, setTokenURI] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast ID for safe updates
  const toastIdRef = useRef<string | number | null>(null);

  /* ---------------- SIMULATION ---------------- */
  const { error: simError } = useSimulateContract({
    address: contractAddress,
    abi: NFT_ABI,
    functionName: "mint",
    args: tokenURI ? [tokenURI] : undefined,
  });

  /* ---------------- WRITE ---------------- */
  const {
    writeContract,
    
    data: hash,
    error: writeError,
  } = useWriteContract();

  /* ---------------- TX RECEIPT ---------------- */
  const {
    isLoading: isConfirming,
    isSuccess,
    isError: txError,
  } = useWaitForTransactionReceipt({ hash });

  /* ---------------- HANDLERS ---------------- */
  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tokenURI.trim()) {
      toast.error("Token URI is required");
      return;
    }

    if (!isConnected) {
      toast.error("Connect your wallet first");
      return;
    }

    if (simError) {
      console.log("Simulation error:", simError);
      toast.error(
        simError.message.includes("insufficient funds")
          ? "You don’t have enough ETH for gas ⛽"
          : simError.message
      );
      return;
    }

    setIsSubmitting(true);
    console.log("Minting with tokenURI:", tokenURI);
    writeContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: "mint",
      args: [tokenURI],
    });
  };

  /* ---------------- EFFECTS ---------------- */

  // Wallet rejected / write failed
  useEffect(() => {
    if (!writeError) return;
    console.log("Write error:", writeError);
    toast.error(writeError.message);
    setIsSubmitting(false);
  }, [writeError]);

  // Tx mining
  useEffect(() => {
    if (!isConfirming) return;
    console.log("Transaction is being mined...");

    if (!toastIdRef.current) {
      toastIdRef.current = toast.loading("Transaction is being mined...");
    }
  }, [isConfirming]);

  // Tx success
  useEffect(() => {
    if (!isSuccess) return;
    console.log("Minting successfully")
    if (toastIdRef.current) {
      toast.success("NFT minted successfully 🎉", {
        id: toastIdRef.current,
      });
      toastIdRef.current = null;
    }

    setTokenURI("");
    setIsSubmitting(false);
  }, [isSuccess]);

  // Tx reverted / failed
  useEffect(() => {
    if (!txError) return;
    console.log("txerror",txError)
    if (toastIdRef.current) {
      toast.error("Transaction failed or reverted", {
        id: toastIdRef.current,
      });
      toastIdRef.current = null;
    }

    setIsSubmitting(false);
  }, [txError]);

  /* ---------------- UI ---------------- */
  const isBusy = isSubmitting || isConfirming;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="shadow-lg">
        <CardHeader className="bg-purple-50/50 dark:bg-purple-950/10 border-b border-gray-200 dark:border-gray-800">
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
                  placeholder="https://ipfs.io/ipfs/..."
                  value={tokenURI}
                  onChange={(e) => setTokenURI(e.target.value)}
                  disabled={isBusy}
                  className="pl-10 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enter an IPFS hash or HTTPS URL pointing to your NFT metadata JSON
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button
                type="submit"
                disabled={!isConnected || isBusy}
                className="w-full bg-purple-600 text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg disabled:opacity-50"
                size="lg"
              >
                {isBusy ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isConfirming ? "Confirming..." : "Preparing Mint..."}
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
