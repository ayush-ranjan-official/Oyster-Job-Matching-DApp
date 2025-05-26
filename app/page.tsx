import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Decentralized Job Marketplace</h1>
        <p className="text-xl max-w-3xl mx-auto">
          A blockchain-powered platform connecting job seekers and employers with smart-contract based 
          matching using an efficient O(n²) algorithm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">For Job Seekers</h2>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Create your profile with skills, experience, and salary expectations</li>
            <li>Get matched with jobs based on your qualifications</li>
            <li>Smart contract ensures transparent, bias-free matching</li>
            <li>Connect directly with employers once matched</li>
          </ul>
          <Link 
            href="/register-seeker" 
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Register as Job Seeker
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">For Employers</h2>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Post job openings with required skills and compensation</li>
            <li>Our algorithm matches you with qualified candidates</li>
            <li>Save time with algorithmic pre-screening</li>
            <li>Pay only for successful matches</li>
          </ul>
          <Link 
            href="/post-job" 
            className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Post a Job
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-slate-100 p-4 rounded-lg max-w-xs">
            <div className="font-bold text-xl bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">1</div>
            <h3 className="font-medium mb-2">Register</h3>
            <p>Create a profile or post a job using your Ethereum wallet</p>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg max-w-xs">
            <div className="font-bold text-xl bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">2</div>
            <h3 className="font-medium mb-2">Match</h3>
            <p>Our O(n²) algorithm compares skills, location, and salary to find optimal matches</p>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg max-w-xs">
            <div className="font-bold text-xl bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">3</div>
            <h3 className="font-medium mb-2">Connect</h3>
            <p>Review your matches and connect with candidates or employers directly</p>
          </div>
        </div>
      </div>
    </div>
  );
} 