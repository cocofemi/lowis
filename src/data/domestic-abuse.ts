import { Courses } from "@/lib/types";

export const CoursesDB: Courses = {
  course: [{
  id: 1,
  title: 'Domestic Abuse: Learn',
  lessons: [
    {
      id: "L1",
      title: "Why this topic matters",
      summary: "Domestic abuse is a major safeguarding driver; children who see/hear abuse are victims in their own right.",
      bullets: [
        "Domestic abuse is a leading reason for Child-in-Need involvement.",
        "Co-occurring risks often present together (DA, parental mental ill-health, substance misuse).",
        "Law/policy: children exposed to DA are victims, not just witnesses.",
      ],
      quickChecks: [
        {
          id: "L1Q1",
          stem: "How are children framed in current policy when they see/hear domestic abuse?",
          options: [
            { id: "a", label: "They are witnesses only", correct: false, why: "This minimises harm and is outdated." },
            { id: "b", label: "They are victims in their own right", correct: true, why: "Correct—ensures access to support." },
            { id: "c", label: "Only victims if physically injured", correct: false, why: "Emotional harm counts." },
          ],
        },
      ],
      checklist: ["Know your local safeguarding pathway.", "Save emergency and support contacts."],
      hints: ["Think legal framing: policy recognises harm beyond physical injury.", "Ask yourself: does this view unlock support for the child?"],
    },
    {
      id: "L2",
      title: "Impact on children & memory",
      summary: "Exposure functions as emotional abuse; trauma affects development and recall (dates/details).",
      bullets: [
        "Risks include anxiety, hyper‑vigilance, and longer‑term health impacts (ACEs).",
        "Teens may struggle to explain risky choices; decision-making matures into early 20s.",
        "Trauma skews memory for dates—use seasonal/event anchors instead of exacts.",
      ],
      quickChecks: [
        { id: "L2Q1", stem: "When a child struggles with dates, what is best?",
          options: [
            { id: "a", label: "Press for exact dates", correct: false, why: "Can increase distress and reduce accuracy." },
            { id: "b", label: "Anchor to terms/seasons/local events", correct: true, why: "Supportive and accurate enough for notes." },
            { id: "c", label: "Skip all time references", correct: false, why: "Approximate markers still help practice." },
          ],
        },
      ],
      hints: ["Memory under stress holds feelings and anchors better than precise dates.", "Think: terms, holidays, weather, school events."],
    },
    {
      id: "L3",
      title: "Trauma‑informed conversation",
      summary: "Child‑led pace, non‑leading questions, clear confidentiality caveat, and safe closure.",
      bullets: [
        "Start with a brief confidentiality caveat (limits if someone is at risk).",
        "Listen; avoid leading/investigative questions; record keywords only.",
        "If it moves into therapy‑depth, pause and refer; end with a brief recap and grounding.",
      ],
      quickChecks: [
        { id: "L3Q1", stem: "Which opening is best?",
          options: [
            { id: "a", label: "Promise secrecy so they feel safe", correct: false, why: "Never promise secrecy in safeguarding." },
            { id: "b", label: "Calm welcome + confidentiality limits in simple language", correct: true, why: "Sets trust and boundaries." },
            { id: "c", label: "Jump straight to detailed questions", correct: false, why: "Leads and can shut down disclosure." },
          ],
        },
      ],
      checklist: ["Note‑taking: keywords, not full transcripts.", "Time‑box sessions and plan a safe close."],
      hints: ["Start by making the space safe, then the conversation.", "Plain language beats jargon, especially for caveats."],
    },
    {
      id: "L4",
      title: "Safety planning & closure",
      summary: "Check immediate risk, offer choices, agree next steps, and document factually.",
      bullets: [
        "Assess immediate safety (injuries, safe to go home, safe contacts).",
        "Offer options (support lines, trusted adults) and let the child choose.",
        "Agree next steps; document neutral facts; share how you’ll update them.",
      ],
      quickChecks: [
        { id: "L4Q1", stem: "After a disclosure, what is NOT recommended?",
          options: [
            { id: "a", label: "Agree next steps and how you’ll update", correct: false, why: "This builds trust." },
            { id: "b", label: "Give directives with no choice to reduce risk", correct: false, why: "Choice is key; directives can remove control." },
            { id: "c", label: "Offer choices and co‑decide actions", correct: true, why: "Correct approach—child‑led and safe." },
          ],
        },
      ],
      hints: ["Safety plan = simple, concrete, chosen by the child.", "Always finish with a calm, clear close and next contact."],
    },
    {
      id: "L5",
      title: "Worker wellbeing",
      summary: "Use supervision, boundaries, and grounding to prevent vicarious trauma.",
      bullets: ["Book supervision/EAP; use peer support.", "Keep sensitive material at work; practice grounding; flag caseload issues early."],
      quickChecks: [
        { id: "L5Q1", stem: "Which is a healthy next step after multiple disclosures?",
          options: [
            { id: "a", label: "Keep processing at home alone to be strong", correct: false, why: "Poor boundary; risks burnout." },
            { id: "b", label: "Schedule supervision and consider EAP/peer support", correct: true, why: "Protects you and service users." },
          ],
        },
      ],
      hints: ["If it’s heavy, don’t carry it alone—use the system built for support.", "A boundary is a safety tool, not a wall."],
    },
  ],
  scenarios: [
    { id: "s1", title: "The hallway disclosure", situation: "A 12‑year‑old quietly says, ‘Sometimes Mum and her partner fight at night,’ as class ends and other pupils are nearby.", actions: [
      { id: "s1-a1", label: "Acknowledge courage and move to a private space if safe", correct: true, why: "Contain the disclosure; protect privacy and assess immediate safety." },
      { id: "s1-a2", label: "Promise to keep the secret to build trust", correct: false, why: "Never promise secrecy; set the confidentiality caveat." },
      { id: "s1-a3", label: "Briefly explain confidentiality limits (if risk, you must share)", correct: true, why: "Clarity about limits maintains trust and meets duties." },
      { id: "s1-a4", label: "Ask lots of detailed questions to get all facts now", correct: false, why: "Avoid leading/investigative questioning; listen and note keywords." },
      { id: "s1-a5", label: "Check immediate safety (injuries, safe to go home today?)", correct: true, why: "Immediate risk guides next steps." },
    ], notes: ["Keep language calm; avoid visible shock/disbelief.", "Agree next steps and record keywords factually."] },
    { id: "s2", title: "Mixed feelings about the abuser", situation: "A teen says, ‘He hits Mum, but he also keeps us safe from the boys on our street.’", actions: [
      { id: "s2-a1", label: "Validate the complexity without minimising harm", correct: true, why: "Acknowledge ambivalence; stay focused on safety." },
      { id: "s2-a2", label: "Dismiss their view and state he is simply dangerous", correct: false, why: "Invalidates the child’s experience and can shut down disclosure." },
      { id: "s2-a3", label: "Explore safe people/places and sketch a simple safety plan", correct: true, why: "Concrete safety planning is practical and trauma‑informed." },
      { id: "s2-a4", label: "Offer options (support lines, trusted adults) and let them choose", correct: true, why: "Choice restores control and supports engagement." },
    ] },
    { id: "s3", title: "Can’t remember dates", situation: "You need timelines, but the child says, ‘I don’t know… it was cold? Maybe before Easter?’", actions: [
      { id: "s3-a1", label: "Anchor to school terms, seasons, or local events", correct: true, why: "Trauma affects recall of exact dates; use approximate anchors." },
      { id: "s3-a2", label: "Push for exact dates to avoid ambiguity", correct: false, why: "Pressure increases distress and reduces accuracy." },
      { id: "s3-a3", label: "Record approximate markers (early spring, before Easter break)", correct: true, why: "Factual, non‑leading notes suffice for next steps." },
    ] },
    { id: "s4", title: "Care worker in a rush", situation: "You have 10 minutes. The child starts sharing distressing details that edge into therapeutic territory.", actions: [
      { id: "s4-a1", label: "Explain role limits, pause deeper processing, and signpost", correct: true, why: "Stay within competence; plan referral and follow‑up." },
      { id: "s4-a2", label: "Continue deeper work so they feel heard, beyond your role", correct: false, why: "Risky; may leave them dysregulated without containment." },
      { id: "s4-a3", label: "Do a brief recap, grounding, and safe closure", correct: true, why: "Closing well reduces distress and clarifies next steps." },
    ] },
    { id: "s5", title: "Legal framing & advocacy", situation: "A colleague says, ‘The child isn’t a victim—it’s between the adults.’", actions: [
      { id: "s5-a1", label: "Clarify: children who see/hear DA are victims in their own right", correct: true, why: "Reflects policy; ensures access to support." },
      { id: "s5-a2", label: "Avoid conflict; agree they are ‘just witnesses’", correct: false, why: "Perpetuates minimisation and can block safeguarding." },
      { id: "s5-a3", label: "Prioritise safety planning and share policy resources", correct: true, why: "Advocacy + practical steps improve outcomes." },
    ] },
    { id: "s6", title: "‘Don’t tell anyone’", situation: "The young person shares a specific incident and asks you to keep it secret.", actions: [
      { id: "s6-a1", label: "Re‑state the confidentiality caveat kindly before continuing", correct: true, why: "Transparency maintains trust while meeting duties." },
      { id: "s6-a2", label: "Agree to secrecy to protect rapport", correct: false, why: "Never promise secrecy in safeguarding contexts." },
      { id: "s6-a3", label: "Ask how they want information shared and with whom", correct: true, why: "Restores control; keeps the process child‑centred." },
      { id: "s6-a4", label: "If risk is high, follow safeguarding steps and explain why", correct: true, why: "Safety overrides confidentiality when someone is at risk." },
    ] },
    { id: "s7", title: "Worker wellbeing", situation: "After several disclosures, you feel heavy and distracted at home.", actions: [
      { id: "s7-a1", label: "Book supervision and consider EAP/peer support", correct: true, why: "Structured reflection prevents vicarious trauma." },
      { id: "s7-a2", label: "Keep processing it alone at home to ‘be strong’", correct: false, why: "Poor boundary; risks burnout and intrusive thoughts." },
      { id: "s7-a3", label: "Keep sensitive material at work; practice grounding; flag caseload issues", correct: true, why: "Healthy boundaries and load management protect everyone." },
    ] },
  ],
  },
{
  id: 2,
  title: 'Mental Health: First Aid',
  lessons: [
    {
      id: "L1",
      title: "Why this topic matters",
      summary: "Domestic abuse is a major safeguarding driver; children who see/hear abuse are victims in their own right.",
      bullets: [
        "Domestic abuse is a leading reason for Child-in-Need involvement.",
        "Co-occurring risks often present together (DA, parental mental ill-health, substance misuse).",
        "Law/policy: children exposed to DA are victims, not just witnesses.",
      ],
      quickChecks: [
        {
          id: "L1Q1",
          stem: "How are children framed in current policy when they see/hear domestic abuse?",
          options: [
            { id: "a", label: "They are witnesses only", correct: false, why: "This minimises harm and is outdated." },
            { id: "b", label: "They are victims in their own right", correct: true, why: "Correct—ensures access to support." },
            { id: "c", label: "Only victims if physically injured", correct: false, why: "Emotional harm counts." },
          ],
        },
      ],
      checklist: ["Know your local safeguarding pathway.", "Save emergency and support contacts."],
      hints: ["Think legal framing: policy recognises harm beyond physical injury.", "Ask yourself: does this view unlock support for the child?"],
    },
    {
      id: "L2",
      title: "Impact on children & memory",
      summary: "Exposure functions as emotional abuse; trauma affects development and recall (dates/details).",
      bullets: [
        "Risks include anxiety, hyper‑vigilance, and longer‑term health impacts (ACEs).",
        "Teens may struggle to explain risky choices; decision-making matures into early 20s.",
        "Trauma skews memory for dates—use seasonal/event anchors instead of exacts.",
      ],
      quickChecks: [
        { id: "L2Q1", stem: "When a child struggles with dates, what is best?",
          options: [
            { id: "a", label: "Press for exact dates", correct: false, why: "Can increase distress and reduce accuracy." },
            { id: "b", label: "Anchor to terms/seasons/local events", correct: true, why: "Supportive and accurate enough for notes." },
            { id: "c", label: "Skip all time references", correct: false, why: "Approximate markers still help practice." },
          ],
        },
      ],
      hints: ["Memory under stress holds feelings and anchors better than precise dates.", "Think: terms, holidays, weather, school events."],
    },
    {
      id: "L3",
      title: "Trauma‑informed conversation",
      summary: "Child‑led pace, non‑leading questions, clear confidentiality caveat, and safe closure.",
      bullets: [
        "Start with a brief confidentiality caveat (limits if someone is at risk).",
        "Listen; avoid leading/investigative questions; record keywords only.",
        "If it moves into therapy‑depth, pause and refer; end with a brief recap and grounding.",
      ],
      quickChecks: [
        { id: "L3Q1", stem: "Which opening is best?",
          options: [
            { id: "a", label: "Promise secrecy so they feel safe", correct: false, why: "Never promise secrecy in safeguarding." },
            { id: "b", label: "Calm welcome + confidentiality limits in simple language", correct: true, why: "Sets trust and boundaries." },
            { id: "c", label: "Jump straight to detailed questions", correct: false, why: "Leads and can shut down disclosure." },
          ],
        },
      ],
      checklist: ["Note‑taking: keywords, not full transcripts.", "Time‑box sessions and plan a safe close."],
      hints: ["Start by making the space safe, then the conversation.", "Plain language beats jargon, especially for caveats."],
    },
    {
      id: "L4",
      title: "Safety planning & closure",
      summary: "Check immediate risk, offer choices, agree next steps, and document factually.",
      bullets: [
        "Assess immediate safety (injuries, safe to go home, safe contacts).",
        "Offer options (support lines, trusted adults) and let the child choose.",
        "Agree next steps; document neutral facts; share how you’ll update them.",
      ],
      quickChecks: [
        { id: "L4Q1", stem: "After a disclosure, what is NOT recommended?",
          options: [
            { id: "a", label: "Agree next steps and how you’ll update", correct: false, why: "This builds trust." },
            { id: "b", label: "Give directives with no choice to reduce risk", correct: false, why: "Choice is key; directives can remove control." },
            { id: "c", label: "Offer choices and co‑decide actions", correct: true, why: "Correct approach—child‑led and safe." },
          ],
        },
      ],
      hints: ["Safety plan = simple, concrete, chosen by the child.", "Always finish with a calm, clear close and next contact."],
    },
    {
      id: "L5",
      title: "Worker wellbeing",
      summary: "Use supervision, boundaries, and grounding to prevent vicarious trauma.",
      bullets: ["Book supervision/EAP; use peer support.", "Keep sensitive material at work; practice grounding; flag caseload issues early."],
      quickChecks: [
        { id: "L5Q1", stem: "Which is a healthy next step after multiple disclosures?",
          options: [
            { id: "a", label: "Keep processing at home alone to be strong", correct: false, why: "Poor boundary; risks burnout." },
            { id: "b", label: "Schedule supervision and consider EAP/peer support", correct: true, why: "Protects you and service users." },
          ],
        },
      ],
      hints: ["If it’s heavy, don’t carry it alone—use the system built for support.", "A boundary is a safety tool, not a wall."],
    },
  ],
  scenarios: [
    { id: "s1", title: "The hallway disclosure", situation: "A 12‑year‑old quietly says, ‘Sometimes Mum and her partner fight at night,’ as class ends and other pupils are nearby.", actions: [
      { id: "s1-a1", label: "Acknowledge courage and move to a private space if safe", correct: true, why: "Contain the disclosure; protect privacy and assess immediate safety." },
      { id: "s1-a2", label: "Promise to keep the secret to build trust", correct: false, why: "Never promise secrecy; set the confidentiality caveat." },
      { id: "s1-a3", label: "Briefly explain confidentiality limits (if risk, you must share)", correct: true, why: "Clarity about limits maintains trust and meets duties." },
      { id: "s1-a4", label: "Ask lots of detailed questions to get all facts now", correct: false, why: "Avoid leading/investigative questioning; listen and note keywords." },
      { id: "s1-a5", label: "Check immediate safety (injuries, safe to go home today?)", correct: true, why: "Immediate risk guides next steps." },
    ], notes: ["Keep language calm; avoid visible shock/disbelief.", "Agree next steps and record keywords factually."] },
    { id: "s2", title: "Mixed feelings about the abuser", situation: "A teen says, ‘He hits Mum, but he also keeps us safe from the boys on our street.’", actions: [
      { id: "s2-a1", label: "Validate the complexity without minimising harm", correct: true, why: "Acknowledge ambivalence; stay focused on safety." },
      { id: "s2-a2", label: "Dismiss their view and state he is simply dangerous", correct: false, why: "Invalidates the child’s experience and can shut down disclosure." },
      { id: "s2-a3", label: "Explore safe people/places and sketch a simple safety plan", correct: true, why: "Concrete safety planning is practical and trauma‑informed." },
      { id: "s2-a4", label: "Offer options (support lines, trusted adults) and let them choose", correct: true, why: "Choice restores control and supports engagement." },
    ] },
    { id: "s3", title: "Can’t remember dates", situation: "You need timelines, but the child says, ‘I don’t know… it was cold? Maybe before Easter?’", actions: [
      { id: "s3-a1", label: "Anchor to school terms, seasons, or local events", correct: true, why: "Trauma affects recall of exact dates; use approximate anchors." },
      { id: "s3-a2", label: "Push for exact dates to avoid ambiguity", correct: false, why: "Pressure increases distress and reduces accuracy." },
      { id: "s3-a3", label: "Record approximate markers (early spring, before Easter break)", correct: true, why: "Factual, non‑leading notes suffice for next steps." },
    ] },
    { id: "s4", title: "Care worker in a rush", situation: "You have 10 minutes. The child starts sharing distressing details that edge into therapeutic territory.", actions: [
      { id: "s4-a1", label: "Explain role limits, pause deeper processing, and signpost", correct: true, why: "Stay within competence; plan referral and follow‑up." },
      { id: "s4-a2", label: "Continue deeper work so they feel heard, beyond your role", correct: false, why: "Risky; may leave them dysregulated without containment." },
      { id: "s4-a3", label: "Do a brief recap, grounding, and safe closure", correct: true, why: "Closing well reduces distress and clarifies next steps." },
    ] },
    { id: "s5", title: "Legal framing & advocacy", situation: "A colleague says, ‘The child isn’t a victim—it’s between the adults.’", actions: [
      { id: "s5-a1", label: "Clarify: children who see/hear DA are victims in their own right", correct: true, why: "Reflects policy; ensures access to support." },
      { id: "s5-a2", label: "Avoid conflict; agree they are ‘just witnesses’", correct: false, why: "Perpetuates minimisation and can block safeguarding." },
      { id: "s5-a3", label: "Prioritise safety planning and share policy resources", correct: true, why: "Advocacy + practical steps improve outcomes." },
    ] },
    { id: "s6", title: "‘Don’t tell anyone’", situation: "The young person shares a specific incident and asks you to keep it secret.", actions: [
      { id: "s6-a1", label: "Re‑state the confidentiality caveat kindly before continuing", correct: true, why: "Transparency maintains trust while meeting duties." },
      { id: "s6-a2", label: "Agree to secrecy to protect rapport", correct: false, why: "Never promise secrecy in safeguarding contexts." },
      { id: "s6-a3", label: "Ask how they want information shared and with whom", correct: true, why: "Restores control; keeps the process child‑centred." },
      { id: "s6-a4", label: "If risk is high, follow safeguarding steps and explain why", correct: true, why: "Safety overrides confidentiality when someone is at risk." },
    ] },
    { id: "s7", title: "Worker wellbeing", situation: "After several disclosures, you feel heavy and distracted at home.", actions: [
      { id: "s7-a1", label: "Book supervision and consider EAP/peer support", correct: true, why: "Structured reflection prevents vicarious trauma." },
      { id: "s7-a2", label: "Keep processing it alone at home to ‘be strong’", correct: false, why: "Poor boundary; risks burnout and intrusive thoughts." },
      { id: "s7-a3", label: "Keep sensitive material at work; practice grounding; flag caseload issues", correct: true, why: "Healthy boundaries and load management protect everyone." },
    ] },
  ],
}] 
};