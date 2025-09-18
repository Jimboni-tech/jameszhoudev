const posts = [
    //love for cooking, science based lifting, startupshell idea maybe photography

  {
    id: 'terpbuds',
    title: 'TerpBuds',
    description: 'An introduction to my idea, TerpBuds',
    date: '2025-09-18',
    tags: ['startupshell', 'idea'],
    content: `
Hello! This blog will host project updates, learning notes, and experiments.

I'll share short writeups about projects, technical deep-dives, and occasional essays on productivity and design.

Stay tuned for the first in-depth post where I walk through a recent project.`
  },
  {
    id: 'commit4good',
    title: 'Commit4Good @ HopHacks 2025',
    description: 'A summary of my experience at HopHacks and what I built',
    date: '2025-08-02',
    tags: ['hackathon', 'startupshell'],
    content: `
This post summarizes an entropy-weighted hybrid retrieval approach combining BM25 and dense vectors.

Key ideas:
- Use normalized Shannon entropy to measure token uncertainty
- Reweight sparse/dense scores adaptively
- Evaluate on QA benchmarks for practical impact

More technical details will follow in a dedicated post.`
  },
  {
    id: 'why-startupshell',
    title: 'Why Startup Shell',
    description: 'A description of why I am a great fit for Startup Shell',
    date: '2024-11-14',
    images: ['/1.png','/3.png'],
    tags: ['me', 'startupshell'],
    content: `
In a 36-hour hackathon we built Commit4Good, a platform connecting nonprofits with volunteer developers.

Lessons learned:
- Keep the MVP focused on matching and onboarding
- Database schemas that prioritize profiles and skills are essential
- Timeboxing features helps ship working product

I'll open-source more of the code and provide deployment notes soon.`
  },
  {
    id: 'china-trip-2025',
    title: 'Summer Trip to China 2025',
    description: 'Recollection of my family trip to China (Beijing, Shanghai, Shanhaiguan, Chongqing)',
    date: '2024-11-14',
    images: ['/4.png','/5.png','/j.png'],
    tags: ['travel', 'personal'],
    content: `
This post summarizes an entropy-weighted hybrid retrieval approach combining BM25 and dense vectors.

Key ideas:
- Use normalized Shannon entropy to measure token uncertainty
- Reweight sparse/dense scores adaptively
- Evaluate on QA benchmarks for practical impact,

More technical details will follow in a dedicated post.`
  }
];

export default posts;
