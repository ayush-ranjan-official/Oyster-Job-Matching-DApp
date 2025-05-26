# Decentralized Job Marketplace with Dynamic Matching

A blockchain-based job marketplace that implements an O(n²) matching algorithm to connect job seekers with employers based on skills, location, and salary requirements.

## Features

- Smart contract for job postings and candidate profiles
- O(n²) matching algorithm that evaluates each job against each candidate
- Scoring based on skills (50%), location (30%), and salary (20%)
- Next.js TypeScript frontend with Tailwind CSS for a modern UI
- Ethereum wallet integration (MetaMask support)

## Project Structure

```
job-marketplace/
├── contracts/ - Solidity smart contracts
│   ├── contracts/JobMarketplace.sol - Main contract with O(n²) matching
│   ├── scripts/deploy.ts - Deployment script
│   └── ...
└── frontend/ - Next.js frontend
    ├── app/ - Next.js App Router
    │   ├── components/ - React components
    │   ├── utils/ - Utility functions
    │   ├── page.tsx - Homepage
    │   └── ... - Various page routes
    └── ... - Next.js config files
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MetaMask extension installed in your browser

### Smart Contract Deployment

1. Navigate to the contracts directory:

```bash
cd job-marketplace/contracts
```

2. Install dependencies:

```bash
npm install
```

3. Start a local Hardhat node:

```bash
npx hardhat node
```

4. In a new terminal, deploy the contract to the local network:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

This will output the deployed contract address, which you'll need for the frontend.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd job-marketplace/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

5. On first use, you'll be asked to enter the contract address from the deployment step. Enter the address and connect your MetaMask.

## Using the Application

### As an Employer

1. Connect your Ethereum wallet
2. Navigate to "Post a Job"
3. Fill in the job details, including title, description, required skills, location, and salary
4. Submit the transaction through your wallet

### As a Job Seeker

1. Connect your Ethereum wallet
2. Navigate to "Register as Job Seeker"
3. Fill in your profile, including name, skills, location, and expected salary
4. Submit the transaction through your wallet

### Finding Matches

1. Navigate to "View Matches"
2. If you have both jobs and candidates registered, click "Run Matching Algorithm"
3. The system will calculate matches using the O(n²) algorithm described in the smart contract
4. View the matches with their scores, sorted by match quality

## Development

### Smart Contract

- The matching algorithm is implemented in the `calculateMatches()` function in JobMarketplace.sol
- Match scores are calculated based on:
  - Skills matching (50% of total score)
  - Location matching (30% of score)
  - Salary matching (20% of score)

### Frontend

- The application uses Next.js App Router with React Server Components
- Ethereum connectivity is handled through ethers.js
- UI is styled with Tailwind CSS

## LLM Integration for Skill Extraction

This project integrates with a Llama LLM deployed on Marlin Oyster CVM to automatically extract skills from job descriptions. To set up:

1. Copy `env.example` to `.env.local`
2. Replace the `NEXT_PUBLIC_LLAMA_INSTANCE_IP` value with your deployed Llama instance IP
3. The skill extraction feature will be available on the job posting page

Example LLM API call:
```bash
curl http://{{instance-ip}}:5000/api/generate -d '{
  "model": "llama3.2",
  "prompt":"What is Ethereum?"
}'
```

