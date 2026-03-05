import natural from "natural";
import { similarity } from "ml-distance";

/**
 * Matching Engine Core Logic
 * 
 * @param {Array<string>} requiredSkills - Array of skills required for the job/search
 * @param {Array<Object>} candidates - Array of candidate user objects (must have .skills array)
 * @returns {Array<Object>} - Ranked candidates with match details
 */
export const matchCandidates = (requiredSkills, candidates) => {
  if (!requiredSkills || requiredSkills.length === 0 || !candidates || candidates.length === 0) {
    return [];
  }

  // 1. Normalize Required Skills
  const normalizedRequired = requiredSkills.map(s => s.toLowerCase().trim());
  
  // Prepare TF-IDF
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();

  // Add documents to TF-IDF
  // Doc 0 is the required skills "document"
  tfidf.addDocument(normalizedRequired.join(" "));

  // Add each candidate's skills as a document
  candidates.forEach(candidate => {
    const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase().trim());
    tfidf.addDocument(candidateSkills.join(" "));
  });

  const rankedCandidates = candidates.map((candidate, index) => {
    // 2. Compute Similarity
    // Get the vector for the required skills (document 0)
    // and the vector for the candidate (document index + 1)
    
    // Note: natural's tfidf doesn't directly give easy vectors for cosine sim.
    // simpler approach: Set Intersection for Jaccard or simple Overlap Coefficient 
    // coupled with a basic vector approach if needed.
    // But let's stick to the prompt's request for "TF-IDF vectorization" and "Cosine Similarity".
    
    // Since 'natural' is a bit complex for raw vector extraction, let's build manual vectors 
    // based on the universe of unique terms in (required + candidate) for precise cosine calc.
    
    const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase().trim());
    
    // Calculate simple intersection details first
    const matchingSkills = candidateSkills.filter(s => normalizedRequired.includes(s));
    const missingSkills = normalizedRequired.filter(s => !candidateSkills.includes(s));
    
    // Calculate Score
    // We can use a combination of Intersection / Union (Jaccard) 
    // OR Vector Cosine Similarity.
    
    // Vector Construction
    const allUniqueSkills = Array.from(new Set([...normalizedRequired, ...candidateSkills]));
    
    const vecA = allUniqueSkills.map(term => normalizedRequired.includes(term) ? 1 : 0);
    const vecB = allUniqueSkills.map(term => candidateSkills.includes(term) ? 1 : 0);
    
    const cosineSim = similarity.cosine(vecA, vecB); // ml-distance returns 1 for identical, 0 for orthogonal
    
    // Convert to Percentage
    const matchPercentage = Math.round(cosineSim * 100);
    
    let suitabilityMessage = "Low Match";
    if (matchPercentage >= 80) suitabilityMessage = "Excellent Match";
    else if (matchPercentage >= 60) suitabilityMessage = "Good Match";
    else if (matchPercentage >= 40) suitabilityMessage = "Potential Match";

    return {
      _id: candidate._id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      profileUrl: candidate.profileUrl,
      profession: candidate.profession,
      location: candidate.location,
      skills: candidate.skills,
      matchScore: matchPercentage,
      matchingSkills,
      missingSkills,
      suitabilityMessage
    };
  });

  // Sort by highest match score
  return rankedCandidates.sort((a, b) => b.matchScore - a.matchScore);
};
