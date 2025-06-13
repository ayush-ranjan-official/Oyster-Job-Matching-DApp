import { ethers } from 'ethers';
//import JobMarketplaceABI from '../../artifacts/contracts/JobMarketplace.sol/JobMarketplace.json';

const JobMarketplaceABI = {"abi":[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "employer",
				"type": "address"
			}
		],
		"name": "JobPostingCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "seekerId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "JobSeekerRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "seekerId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "MatchCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "seekerId",
				"type": "uint256"
			}
		],
		"name": "calculateMatchScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "calculateMatches",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "requiredSkills",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			}
		],
		"name": "createJobPosting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllMatches",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "jobId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "seekerId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "score",
						"type": "uint256"
					}
				],
				"internalType": "struct JobMarketplace.Match[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEmployerJobs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			}
		],
		"name": "getJobPosting",
		"outputs": [
			{
				"internalType": "address",
				"name": "employer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "requiredSkills",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "seekerId",
				"type": "uint256"
			}
		],
		"name": "getSeekerProfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "skills",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "expectedSalary",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isMatched",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "jobPostings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "employer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "jobSeekers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "expectedSalary",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "matches",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "seekerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "skills",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "expectedSalary",
				"type": "uint256"
			}
		],
		"name": "registerAsJobSeeker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			}
		],
		"name": "toggleJobActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "seekerId",
				"type": "uint256"
			}
		],
		"name": "toggleSeekerActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]};

// The contract address will be set after deployment
let contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

// Function to set contract address after deployment
export const setContractAddress = (address: string) => {
  contractAddress = address;
};

// Function to get provider
export const getProvider = () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

// Function to get signer
export const getSigner = async () => {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    const signer = await provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Error getting signer:", error);
    return null;
  }
};

// Function to get contract instance
export const getContract = async (withSigner = true) => {
  if (!contractAddress) {
    console.error("Contract address not set");
    return null;
  }

  try {
    if (withSigner) {
      const signer = await getSigner();
      if (!signer) return null;
      return new ethers.Contract(contractAddress, JobMarketplaceABI.abi, signer);
    } else {
      const provider = getProvider();
      if (!provider) return null;
      return new ethers.Contract(contractAddress, JobMarketplaceABI.abi, provider);
    }
  } catch (error) {
    console.error("Error getting contract:", error);
    return null;
  }
};

// Function to connect wallet
export const connectWallet = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { success: true, address };
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return { success: false, error };
    }
  } else {
    return { success: false, error: "MetaMask not installed" };
  }
};

// Add TypeScript types for window
declare global {
  interface Window {
    ethereum: any;
  }
} 