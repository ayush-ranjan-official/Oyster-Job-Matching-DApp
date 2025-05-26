/**
 * LLM service to interact with Marlin Oyster CVM's Llama model
 */

interface LlamaGenerateResponse {
  response: string;
  success: boolean;
  error?: string;
}

/**
 * Extract skills from a job description using Llama LLM
 * @param jobDescription - The job description text
 * @returns An object with the LLM response containing extracted skills
 */
export async function extractSkillsFromDescription(jobDescription: string): Promise<LlamaGenerateResponse> {
  try {
    // You'll need to replace this with your actual instance IP
    const instanceIp = process.env.NEXT_PUBLIC_LLAMA_INSTANCE_IP || "localhost";
    const prompt = `Extract and list all technical skills, technologies, and qualifications required from this job description. Format as comma-separated values: 
    
    ${jobDescription}`;
    
    const response = await fetch(`http://${instanceIp}:5000/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      response: data.response || data.generated_text || "",
      success: true
    };
  } catch (error: any) {
    console.error("Error extracting skills:", error);
    return {
      response: "",
      success: false,
      error: error.message
    };
  }
} 