'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContract } from '../utils/web3';

interface Job {
  id: number;
  employer: string;
  title: string;
  description: string;
  requiredSkills: string[];
  location: string;
  salary: number;
  isActive: boolean;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        // Get contract instance
        const contract = await getContract(false);
        if (!contract) {
          throw new Error("Failed to get contract instance.");
        }

        // Get all job IDs (this is a simplified approach)
        // In a full implementation, we'd have a way to query all jobs or page through them
        const jobCount = await contract.jobIdCounter();
        const jobPromises = [];
        
        for (let i = 1; i <= jobCount; i++) {
          jobPromises.push(fetchJobDetails(contract, i));
        }
        
        const fetchedJobs = await Promise.all(jobPromises);
        setJobs(fetchedJobs.filter(job => job !== null));
        
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError(err.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const fetchJobDetails = async (contract: any, jobId: number) => {
    try {
      const jobData = await contract.getJobPosting(jobId);
      
      // Skip non-active jobs
      if (!jobData.isActive) return null;
      
      return {
        id: jobId,
        employer: jobData.employer,
        title: jobData.title,
        description: jobData.description,
        requiredSkills: jobData.requiredSkills,
        location: jobData.location,
        salary: Number(jobData.salary),
        isActive: jobData.isActive
      };
    } catch (err) {
      console.error(`Error fetching job ${jobId}:`, err);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <p className="mt-2">Please make sure you have MetaMask installed and connected to the correct network.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Jobs</h1>
        <Link 
          href="/post-job" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Post a Job
        </Link>
      </div>
      
      {jobs.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded text-center">
          <p className="text-lg">No jobs found</p>
          <p className="mt-2">Be the first to post a job!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map(job => (
            <div key={job.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-500 mb-3">{job.location} • ${job.salary.toLocaleString()}</p>
              
              <div className="mb-3">
                <p className="font-medium">Required Skills:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.requiredSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
              
              <Link 
                href={`/jobs/${job.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 