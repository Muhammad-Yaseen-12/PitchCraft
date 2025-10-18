// src/services/geminiService.js - Alternative Version
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || "AIzaSyDICIBqjn2-GsBCZLgtlIxDYeXtH8-MVSE";
const genAI = new GoogleGenerativeAI(apiKey);

export const generatePitchContent = async (ideaData) => {
  const { title, description, industry, tone } = ideaData;
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  });

  const prompt = `
    Create a startup pitch package as a JSON object. Be creative and professional.

    Startup Idea: ${title}
    Description: ${description}
    Industry: ${industry}
    Desired Tone: ${tone}

    Return ONLY this JSON structure, nothing else:

    {
      "startup_name": "Creative name here",
      "tagline": "Short catchy tagline",
      "elevator_pitch": "Brief 2-3 sentence summary",
      "problem_statement": "What problem this solves",
      "solution": "How this solution works",
      "target_audience": "Who will use this",
      "value_proposition": "Why this is valuable",
      "landing_copy": "Website hero text"
    }

    Important: Return pure JSON only, no other text or explanations.
  `;

  try {
    console.log('Generating pitch for:', { title, industry, tone });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text().trim();

    console.log('AI Raw Response:', text);

    // Multiple attempts to extract JSON
    let pitchData = null;

    // Attempt 1: Direct JSON parse
    try {
      pitchData = JSON.parse(text);
      console.log('Direct parse successful');
    } catch (e1) {
      console.log('Direct parse failed, trying cleanup...');
      
      // Attempt 2: Remove code blocks and trim
      const cleanText = text.replace(/```json|```/g, '').trim();
      try {
        pitchData = JSON.parse(cleanText);
        console.log('Clean parse successful');
      } catch (e2) {
        console.log('Clean parse failed, trying regex extraction...');
        
        // Attempt 3: Extract JSON with regex
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            pitchData = JSON.parse(jsonMatch[0]);
            console.log('Regex extraction successful');
          } catch (e3) {
            console.log('All parsing attempts failed');
          }
        }
      }
    }

    // If we got valid data, return it
    if (pitchData && pitchData.startup_name) {
      console.log('Successfully generated pitch:', pitchData);
      return pitchData;
    }

    // Fallback to generated data
    console.log('Using generated fallback data');
    return generateFallbackPitch(title, description, industry, tone);

  } catch (error) {
    console.error('API Error:', error);
    return generateFallbackPitch(title, description, industry, tone);
  }
};

const generateFallbackPitch = (title, description, industry, tone) => {
  const names = [
    `${title.split(' ')[0]}AI`,
    `${industry}Pro`,
    `Smart${title.split(' ')[0]}`,
    `NextGen${industry}`
  ];

  const taglines = {
    professional: ["Innovation Meets Excellence", "Transforming Business Solutions", "Enterprise-Grade Technology"],
    casual: ["Making Life Easier", "Simple Solutions for You", "Work Smarter, Not Harder"],
    innovative: ["The Future is Here", "Next-Generation Solutions", "Revolutionizing Technology"],
    fun: ["Where Work Meets Play!", "Making Business Fun Again", "Creative Solutions for Creative Minds"]
  };

  const name = names[Math.floor(Math.random() * names.length)];
  const taglineOptions = taglines[tone] || taglines.professional;
  const tagline = taglineOptions[Math.floor(Math.random() * taglineOptions.length)];

  return {
    startup_name: name,
    tagline: tagline,
    elevator_pitch: `${name} provides innovative solutions for ${description.substring(0, 100)}. We help businesses in the ${industry} industry achieve their goals through cutting-edge technology and expert insights.`,
    problem_statement: `Businesses in the ${industry} sector face challenges with ${title.toLowerCase()}, including inefficiency, high costs, and lack of specialized tools.`,
    solution: `Our platform offers a comprehensive solution that ${description.substring(0, 120)}. We provide user-friendly tools, expert support, and scalable technology to address these challenges effectively.`,
    target_audience: `Startups, small to medium businesses, and professionals in the ${industry} industry who need efficient solutions for ${title.toLowerCase()}.`,
    value_proposition: "Save time, reduce operational costs, increase efficiency, and drive growth with our specialized platform designed for your industry needs.",
    landing_copy: `Welcome to ${name} - Your partner in ${industry} innovation. Discover how we can transform your business and help you achieve remarkable results. Start your journey today!`
  };
};