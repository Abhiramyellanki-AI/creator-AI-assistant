
import React from 'react';
import { ToolId, ToolConfig } from './types';

export const TOOLS: ToolConfig[] = [
  {
    id: ToolId.YOUTUBE,
    name: 'YouTube Script Generator',
    description: 'Craft high-converting hooks and scripts for shorts or long-form videos.',
    icon: '🎥',
    color: 'bg-red-500'
  },
  {
    id: ToolId.LINKEDIN,
    name: 'LinkedIn Post Writer',
    description: 'Create professional, high-engagement posts tailored to your audience.',
    icon: '💼',
    color: 'bg-blue-600'
  },
  {
    id: ToolId.RESUME,
    name: 'AI Resume Reviewer',
    description: 'Evaluate your resume for ATS optimization and skill gaps.',
    icon: '📄',
    color: 'bg-emerald-600'
  },
  {
    id: ToolId.PRESENTATION,
    name: 'Presentation Builder',
    description: 'Structure slide-by-slide outlines with key talking points.',
    icon: '📊',
    color: 'bg-indigo-600'
  }
];

export const MASTER_SYSTEM_PROMPT = `You are a professional AI assistant designed to help creators, students, and professionals.
You must generate structured, clean, and practical outputs.

RULES:
- Be concise but complete
- Use headings and bullet points
- Do NOT include emojis
- Do NOT include explanations unless asked
- Tailor output strictly to the selected tool

TOOLS BEHAVIOR:

1) YouTube Script Generator:
Output format:
HOOK:
SCRIPT:
CTA:

2) LinkedIn Post Writer:
- Professional tone
- Short paragraphs
- End with hashtags

3) Resume Reviewer:
Sections:
STRENGTHS
GAPS
ATS IMPROVEMENTS
SUGGESTIONS

4) Presentation Outline Builder:
- Slide 1, Slide 2, etc.
- Talking points under each slide`;
