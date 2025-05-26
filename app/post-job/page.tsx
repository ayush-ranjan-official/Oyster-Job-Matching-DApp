'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getContract } from '../utils/web3';
import { extractSkillsFromDescription } from '../utils/llmService';

export default function PostJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    location: '',
    salary: '',
  });
  const [loading, setLoading] = useState(false);
  const [extractingSkills, setExtractingSkills] = useState(false);
  const [error, setError] = useState('');
  const [skillExtractionError, setSkillExtractionError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const extractSkills = async () => {
    if (!formData.description) {
      setSkillExtractionError('Please enter a job description first');
      return;
    }

    try {
      setExtractingSkills(true);
      setSkillExtractionError('');
      
      const result = await extractSkillsFromDescription(formData.description);
      
      if (result.success) {
        setFormData(prev => ({ ...prev, skills: result.response }));
      } else {
        setSkillExtractionError(result.error || 'Failed to extract skills. Please try again or enter skills manually.');
      }
    } catch (err: any) {
      console.error("Error extracting skills:", err);
      setSkillExtractionError(err.message || 'An error occurred while extracting skills');
    } finally {
      setExtractingSkills(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      // Get contract instance
      const contract = await getContract();
      if (!contract) {
        throw new Error("Failed to get contract instance. Make sure your wallet is connected.");
      }
      
      // Format the data for the contract
      const { title, description, location, salary } = formData;
      const skills = formData.skills.split(',').map(skill => skill.trim());
      
      // Call the contract method to create a job posting
      const tx = await contract.createJobPosting(
        title,
        description,
        skills,
        location,
        parseInt(salary, 10)
      );
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Redirect to jobs page
      router.push('/jobs');
      
    } catch (err: any) {
      console.error("Error posting job:", err);
      setError(err.message || "Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="skills" className="block mb-1 font-medium">
            Required Skills (comma-separated)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              placeholder="e.g. JavaScript, React, Solidity"
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={extractSkills}
              disabled={extractingSkills || !formData.description}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded disabled:opacity-50"
            >
              {extractingSkills ? 'Extracting...' : 'Extract Skills'}
            </button>
          </div>
          {skillExtractionError && (
            <p className="text-red-600 text-sm mt-1">{skillExtractionError}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Click "Extract Skills" to use AI to extract skills from your job description
          </p>
        </div>
        
        <div>
          <label htmlFor="location" className="block mb-1 font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="salary" className="block mb-1 font-medium">
            Salary (USD)
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
} 