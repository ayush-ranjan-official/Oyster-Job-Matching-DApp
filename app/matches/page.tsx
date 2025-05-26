'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContract } from '../utils/web3';

interface Match {
  jobId: number;
  seekerId: number;
  score: number;
  jobTitle?: string;
  seekerName?: string;
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get contract instance
      const contract = await getContract(false);
      if (!contract) {
        throw new Error("Failed to get contract instance.");
      }

      // Get all matches
      const matchesData = await contract.getAllMatches();
      
      // Format matches
      const formattedMatches = await Promise.all(
        matchesData.map(async (match: any) => {
          const jobId = Number(match.jobId);
          const seekerId = Number(match.seekerId);
          
          // Fetch additional details
          let jobTitle = '';
          let seekerName = '';
          
          try {
            const jobData = await contract.getJobPosting(jobId);
            jobTitle = jobData.title;
          } catch (err) {
            console.error(`Error fetching job ${jobId}:`, err);
          }
          
          try {
            const seekerData = await contract.getSeekerProfile(seekerId);
            seekerName = seekerData.name;
          } catch (err) {
            console.error(`Error fetching seeker ${seekerId}:`, err);
          }
          
          return {
            jobId,
            seekerId,
            score: Number(match.score),
            jobTitle,
            seekerName
          };
        })
      );
      
      setMatches(formattedMatches);
      
    } catch (err: any) {
      console.error("Error fetching matches:", err);
      setError(err.message || "Failed to load matches.");
    } finally {
      setLoading(false);
    }
  };

  const runMatchingAlgorithm = async () => {
    try {
      setCalculating(true);
      setError('');
      
      // Get contract instance with signer
      const contract = await getContract(true);
      if (!contract) {
        throw new Error("Failed to get contract instance. Make sure your wallet is connected.");
      }

      // Run the O(n²) matching algorithm
      const tx = await contract.calculateMatches();
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Fetch updated matches
      await fetchMatches();
      
    } catch (err: any) {
      console.error("Error running matching algorithm:", err);
      setError(err.message || "Failed to run matching algorithm.");
    } finally {
      setCalculating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Matches</h1>
        <button 
          onClick={runMatchingAlgorithm}
          disabled={calculating}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {calculating ? 'Calculating...' : 'Run Matching Algorithm'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium mb-2">O(n²) Matching Algorithm</h2>
        <p>
          This algorithm compares each job with each candidate, calculating a match score 
          based on skills (50%), location (30%), and salary (20%). Higher scores indicate better matches.
        </p>
      </div>
      
      {matches.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded text-center">
          <p className="text-lg">No matches found</p>
          <p className="mt-2">
            Add more jobs and candidates, then run the matching algorithm to find matches.
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Match Score</th>
                <th className="py-3 px-4 border-b text-left">Job</th>
                <th className="py-3 px-4 border-b text-left">Candidate</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center">
                      <span className={`text-lg font-bold ${
                        match.score >= 70 ? 'text-green-600' : 
                        match.score >= 40 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {match.score}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <Link href={`/jobs/${match.jobId}`} className="hover:text-blue-600">
                      {match.jobTitle || `Job #${match.jobId}`}
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <Link href={`/candidates/${match.seekerId}`} className="hover:text-blue-600">
                      {match.seekerName || `Candidate #${match.seekerId}`}
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <Link 
                      href={`/matches/${match.jobId}/${match.seekerId}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 