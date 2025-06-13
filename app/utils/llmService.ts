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
    const prompt = `Analyze the following job description and extract only the technical skills, technologies, frameworks, programming languages, and tools mentioned or required.

Your response should ONLY contain the extracted skills as a comma-separated list with no additional text, explanations, or formatting.

For example, a good response would be: "JavaScript, React, Node.js, TypeScript, Git, AWS"

Job Description:
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
    let skillsText = data.response || data.generated_text || "";
      // Clean up the response to ensure it's just a comma-separated list
    // Remove any leading/trailing text that's not part of the skills list
    skillsText = skillsText.replace(/^.*?(?=[\w])/, ''); // Remove text before first word
    skillsText = skillsText.replace(/[.:](?:\s*$|\s*\n.*$)/, ''); // Remove trailing periods or any text after
    
    return {
      response: skillsText.trim(),
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