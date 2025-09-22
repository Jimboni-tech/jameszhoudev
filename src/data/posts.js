const posts = [
    //love for cooking, science based lifting, startupshell idea maybe photography

  {
    id: 'terpbuds',
    title: 'TerpBuds',
    description: 'An introduction to my idea, TerpBuds',
    date: '2025-09-18',
    tags: ['startupshell', 'idea'],
    content: `
At a large university like UMD, it's easy to feel lost in the crowd. Many students struggle to find study partners in large lectures, leading to a sense of academic isolation. The idea of TerpBuds was created to solve this problem. This platform will help students at the University of Maryland easily connect with classmates by forming study groups and building meaningful academic communities. 

I got the idea for this project because, sometimes, I am one of those students that feel lost in the crowd. At times, I have had trouble meeting new people or finding people to simply study with. In fact, I refused to come to the first Startup Shell open house meeting simply because I was scared! When I showed up to the second meeting, however, I immediately new I made a mistake not coming earlier. Just think about it; so many students are missing out on great communities and opportunities just because they are scared to come out of their shells. I believe that when this platform is launched, this problem will be solved, and introverts, people just like me, will be able to find a community where they truly belong.

The impact of TerpBuds extends beyond just finding study groups though:
  •	Increased academic success and collaboration — students who study together perform better and retain knowledge more effectively.
  •	Greater accessibility for first-year and transfer students — helps new Terps find their place quickly in the academic community.

  Existing options like GroupMe or Discord are messy and unorganized, and they are not tailored to individual courses or study needs. With TerpBuds, every single student will belong!


`
  },


  {
    id: 'commit4good',
    title: 'Commit4Good @ HopHacks 2025',
    description: 'A summary of my experience at HopHacks and what I built',
    date: '2025-09-16',
    tags: ['hackathon', 'startupshell'],
    images: ['/hackathon/food.JPG','/hackathon/laptop.JPG'],
    content: `
This past weekend (9/12-9/14), I, along with a handful of other UMD students, travelled down to Baltimore to participate in the annual Johns Hopkins University Hackathon, HopHacks. I was extremely nervous when I first arrived due to a number of reasons. 
One, this was my first hackathon ever, and I knew that there were plenty of cracked CS kids participating - it was pretty intimidating. Two, I was going to see my childhood friend (Hank) for the first time in almost 4 years. After moving to a different high school freshman year, we never really had the opportunity to interact, so we slowly drifted apart.
Anyways, after my nerves settled down and the opening ceremony finished, we started to hack. I quickly realized, however, that my only teammate, Hank, did not know how to code, so, for the next 36 hours, I worked on the project solo.
After an all-nighter, an unhealthy amount of snacks, and copious amounts of coding, I finished the project. 

My inspiration for Commit4Good came from recognizing that early-stage developers often seek real-world experience but struggle to find meaningful opportunities. I realized that if I needed hands-on practice myself, I could create a platform that not only provided that experience but also empowered nonprofits to achieve more.

Commit4Good creates real impact by giving nonprofits access to skilled technical support they couldn’t otherwise afford, while providing volunteers with verifiable experience to strengthen their portfolios. By lowering barriers to tech, the platform makes it easier for anyone to turn their skills into meaningful contributions.

`
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
    images: [
      '/china/IMG_3719.JPEG',
      '/china/IMG_3922.JPEG',
      '/china/IMG_3952.JPEG',
      '/china/IMG_3963.JPEG',
      '/china/IMG_5490.JPG',
      '/china/IMG_5517.JPG',
      '/china/IMG_5534.JPG',
      '/china/IMG_5581.jpg',
      '/china/IMG_5589.jpg',
      '/china/IMG_5665.jpg',
      '/china/IMG_5678.jpg',
      '/china/IMG_5687.jpg',
      '/china/IMG_5722.JPG',
      '/china/IMG_5729.JPG',
      '/china/IMG_5730.JPG',
      '/china/IMG_5752.JPG',
      '/china/IMG_5771.JPG',
      '/china/IMG_5775.jpg',
      '/china/IMG_5776.JPG',
      '/china/IMG_5778.JPG',
      '/china/IMG_5790.JPG',
      '/china/IMG_5805.JPG',
      '/china/IMG_5820.JPG',
      '/china/IMG_5822.JPG',
      '/china/IMG_5832.JPG',
      '/china/IMG_5838.JPG',
      '/china/IMG_5843.JPG',
      '/china/IMG_5854.JPG',
      '/china/IMG_5857.JPG',
      '/china/IMG_5881.JPG',
      '/china/IMG_5887.JPG',
      '/china/IMG_5905.JPG',
      '/china/IMG_5911.JPG',
      '/china/IMG_5912.JPG',
      '/china/IMG_5918.JPG',
      '/china/IMG_5929.JPG',
      '/china/IMG_5944.JPG',
      '/china/IMG_5945.JPG'
    ],
    tags: ['travel', 'personal'],
    content: `
This post summarizes an entropy-weighted hybrid retrieval approach combining BM25 and dense vectors.

Key ideas:
- Use adf hi entropy to measure token uncertainty
- Reweight sparse/dense scores adaptively
- Evaluate on QA benchmarks for practical impact,

More technical details will follow in a dedicated post.`
  },
  {
    id: 'science-based-lifting',
    title: 'Science Based Lifting',
    description: 'My passion for working out, but with science',
    date: '2024-11-14',
    images: ['/4.png','/5.png','/j.png'],
    tags: ['exercise', 'personal'],
    content: `
This post summarizes an entropy-weighted hybrid retrieval approach combining BM25 and dense vectors.

Key ideas:
- Use normalized Shannon entropy to measure token uncertainty
- Reweight sparse/dense scores adaptively
- Evaluate on QA benchmarks for practical impact,

More technical details will follow in a dedicated post.`
  },
  {
    id: 'food',
    title: 'Cooking and Food',
    description: 'My journey with food and cooking',
    date: '2024-11-14',
    images: ['/4.png','/5.png','/j.png'],
    tags: ['food', 'personal'],
    content: `
This post summarizes an entropy-weighted hybrid retrieval approach combining BM25 and dense vectors.

Key ideas:
- Use normalized Shannon entropy to measure token uncertainty
- Reweight sparse/dense scores adaptively
- Evaluate on QA benchmarks for practical impact,

More technical details will follow in a dedicated post.`
  },
  {
    id: 'music',
    title: 'My Love for Music',
    description: 'My journey with music, from listening to making',
    date: '2024-11-14',
    images: ['/4.png','/5.png','/j.png'],
    tags: ['music', 'personal'],
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
