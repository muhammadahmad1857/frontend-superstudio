# NFT Minting Studio

A modern, elegant frontend for minting NFTs on Ethereum Mainnet. Built with React, TypeScript, Vite, wagmi, RainbowKit, and Tailwind CSS. Features light/dark mode, single/batch minting, and owner-only admin controls.

## Features

✨ **Modern UI**
- Minimal, elegant design with Tailwind CSS
- Light and dark mode support with persistent preferences
- Responsive layout for mobile and desktop
- Smooth transitions and animations

🚀 **Web3 Integration**
- Connect wallets with RainbowKit (supports 1000+ wallets)
- Built on wagmi hooks for Ethereum interactions
- Viem for type-safe blockchain calls
- Optimized for Ethereum Mainnet

🎨 **NFT Minting**
- Single NFT minting with custom metadata URI
- Batch mint up to 100 NFTs at once
- Admin panel for setting base URI (owner-only)
- Real-time transaction feedback with Sonner toasts

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- An Ethereum wallet (MetaMask, Rainbow, WalletConnect, etc.)
- A deployed NFT contract on Ethereum Mainnet

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend-superstudio
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:

```env
# Get a free WalletConnect Project ID from https://cloud.walletconnect.com
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id

# Your deployed NFT contract address on Ethereum Mainnet
VITE_CONTRACT_ADDRESS=0x...

# Contract owner address (for admin features)
VITE_CONTRACT_OWNER=0x...
```

### Development

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## Configuration

### Contract Address

Update the `CONTRACT_ADDRESS` in [src/App.tsx](src/App.tsx) or via environment variable `VITE_CONTRACT_ADDRESS`. This must be a deployed NFT contract implementing the ERC721 standard with `mint()` and `batchMint()` functions.

### Admin Features

Set `VITE_CONTRACT_OWNER` to enable the admin panel. Only the contract owner can set the base URI.

### Dark Mode

Dark mode is automatically detected from system preferences and can be toggled via the button in the header. Preferences are saved to localStorage.

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Shadcn/UI** - Component library
- **wagmi** - React hooks for Ethereum
- **RainbowKit** - Wallet connection
- **Viem** - TypeScript Ethereum library
- **Sonner** - Toast notifications
- **Zustand** - State management

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Navigation & wallet button
│   ├── MintForm.tsx            # Single NFT minting
│   ├── BatchMintForm.tsx       # Batch minting
│   ├── AdminPanel.tsx          # Owner-only settings
│   └── ui/                     # Shadcn UI components
├── config/
│   ├── wagmi.ts                # Wagmi & RainbowKit setup
│   └── abi.ts                  # NFT contract ABI
├── hooks/
│   └── useTheme.ts             # Dark mode state management
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point with providers
├── App.css                     # App styles
└── index.css                   # Global styles & Tailwind
```

## Smart Contract Interface

The frontend expects a contract with these functions:

```solidity
function mint(string memory tokenURI) public returns (bool)
function batchMint(string memory tokenURI, uint256 numOfTokens) public returns (bool)
function baseURI(string memory baseUri) public onlyOwner
function baseURI() public view returns (string memory)
function balanceOf(address owner) external view returns (uint256)
function totalSupply() public view returns (uint256)
function owner() public view returns (address)
```

See [smart-contract.sol](smart-contract.sol) for the full ERC721 implementation.

## Usage

### Minting NFTs

1. **Connect Wallet**: Click the "Connect" button and select your wallet
2. **Single Mint**: 
   - Go to "Single Mint" tab
   - Enter a metadata URI (IPFS or HTTPS)
   - Click "Mint NFT"
3. **Batch Mint**:
   - Go to "Batch Mint" tab
   - Enter the metadata URI
   - Set quantity (max 100)
   - Click "Mint Batch"

### Admin Features

1. **Connect as Owner**: Use the wallet that owns the contract
2. **Go to Admin tab**: (only visible if you're the owner)
3. **Set Base URI**: Enter the base URI and submit
   - All token URIs will be generated as `baseURI + tokenId`

## Deployment

### Vercel (Recommended)

```bash
pnpm build
# Deploy the `dist` folder
```

### Manual Hosting

```bash
pnpm build
# Upload contents of `dist` folder to your static host
```

## Troubleshooting

**Connection Issues**
- Ensure you have a valid WalletConnect Project ID
- Check that your wallet is set to Ethereum Mainnet
- Verify the contract address is correct

**Minting Failed**
- Check wallet balance for gas fees
- Ensure you're using the correct chain
- Verify the metadata URI is valid

**Dark Mode Not Working**
- Clear browser cache and localStorage
- Check that JavaScript is enabled

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_WALLET_CONNECT_PROJECT_ID` | Yes | WalletConnect project ID |
| `VITE_CONTRACT_ADDRESS` | Yes | NFT contract address (Mainnet) |
| `VITE_CONTRACT_OWNER` | No | Contract owner address |

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
