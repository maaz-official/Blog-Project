const Post = [
  {
    id: "1",
    title: "How to Build a Secure Blog Platform",
    author: {
      id: "123",
      name: "John Doe",
      profilePicture: "/assets/profile/person.jpg",
    },
    content:
      "Building a secure blog platform requires attention to several aspects such as authentication, data validation, and secure coding practices...",
    coverImage: "/assets/p1.jpg",
    category: "Tech",
    tags: ["Security", "Web Development", "Best Practices"],
    likes: 150,
    shares: 20,
    views: 500,
    readTime: "7 min read",
    comments: [
      {
        id: "c1",
        author: {
          id: "456",
          name: "Jane Smith",
          profilePicture: "/assets/profile/person.jpg",
        },
        content: "Great article! Really helped me understand web security better.",
        createdAt: "2023-09-20T12:34:56Z",
        likes: 10,
        replies: [
          {
            id: "r1",
            author: {
              id: "789",
              name: "Alex Johnson",
              profilePicture: "/assets/profile/person.jpg",
            },
            content: "Same here, I found the part about authentication especially useful!",
            createdAt: "2023-09-21T14:22:10Z",
          },
        ],
      },
      {
        id: "c2",
        author: {
          id: "777",
          name: "Charlie Adams",
          profilePicture: "/assets/profile/person.jpg",
        },
        content: "Would love to see more examples on secure coding practices!",
        createdAt: "2023-09-22T10:00:00Z",
        likes: 5,
        replies: [],
      },
    ],
    createdAt: "2023-09-19T10:00:00Z",
    updatedAt: "2023-09-21T08:30:00Z",
  },
  {
    id: "2",
    title: "Top 10 JavaScript Frameworks in 2023",
    author: {
      id: "124",
      name: "Alice Cooper",
      profilePicture: "/assets/profile/alicecooper.jpg",
    },
    content: "JavaScript frameworks evolve rapidly. In this post, we review the top 10 frameworks for 2023...",
    coverImage: "/assets/p2.jpg",
    category: "Programming",
    tags: ["JavaScript", "Frameworks", "React", "Vue", "Angular"],
    likes: 200,
    shares: 30,
    views: 1200,
    readTime: "5 min read",
    comments: [],
    createdAt: "2023-09-10T11:00:00Z",
    updatedAt: "2023-09-12T08:45:00Z",
  },
  {
    id: "3",
    title: "The Future of Artificial Intelligence",
    author: {
      id: "125",
      name: "Bob Martin",
      profilePicture: "/assets/profile/bobmartin.jpg",
    },
    content: "Artificial intelligence (AI) is shaping the future of various industries. Let's dive into the advancements...",
    coverImage: "/assets/p3.jpg",
    category: "AI",
    tags: ["Artificial Intelligence", "Machine Learning", "Technology"],
    likes: 350,
    shares: 50,
    views: 900,
    readTime: "10 min read",
    comments: [
      {
        id: "c2",
        author: {
          id: "457",
          name: "Chris Evans",
          profilePicture: "/assets/profile/chrisevans.jpg",
        },
        content: "Exciting times ahead for AI!",
        createdAt: "2023-09-21T16:00:00Z",
        likes: 25,
        replies: [],
      },
    ],
    createdAt: "2023-09-05T09:00:00Z",
    updatedAt: "2023-09-07T10:30:00Z",
  },
  {
    id: "4",
    title: "How to Improve Web Performance",
    author: {
      id: "126",
      name: "Jessica Wright",
      profilePicture: "/assets/profile/jessicawright.jpg",
    },
    content: "Web performance is critical to the success of any website. Here are some tips to improve your site's speed...",
    coverImage: "/assets/p4.jpg",
    category: "Web Development",
    tags: ["Web Performance", "Optimization", "Best Practices"],
    likes: 180,
    shares: 25,
    views: 700,
    readTime: "4 min read",
    comments: [],
    createdAt: "2023-09-03T10:15:00Z",
    updatedAt: "2023-09-04T09:30:00Z",
  },
  {
    id: "5",
    title: "Understanding Cryptocurrency",
    author: {
      id: "127",
      name: "David Brown",
      profilePicture: "/assets/profile/davidbrown.jpg",
    },
    content: "Cryptocurrency has become a hot topic recently. In this post, we'll explore the basics of cryptocurrency...",
    coverImage: "/assets/p5.jpg",
    category: "Finance",
    tags: ["Cryptocurrency", "Blockchain", "Bitcoin", "Ethereum"],
    likes: 220,
    shares: 40,
    views: 1000,
    readTime: "6 min read",
    comments: [],
    createdAt: "2023-08-28T13:30:00Z",
    updatedAt: "2023-08-30T14:45:00Z",
  },
  {
    id: "6",
    title: "How to Master React Hooks",
    author: {
      id: "128",
      name: "Emily Stone",
      profilePicture: "/assets/profile/emilystone.jpg",
    },
    content: "React Hooks have transformed the way developers write React components. Learn how to use them effectively...",
    coverImage: "/assets/p6.jpg",
    category: "Programming",
    tags: ["React", "Hooks", "JavaScript"],
    likes: 300,
    shares: 45,
    views: 950,
    readTime: "5 min read",
    comments: [],
    createdAt: "2023-08-22T09:00:00Z",
    updatedAt: "2023-08-24T12:00:00Z",
  },
  {
    id: "7",
    title: "Exploring Data Science with Python",
    author: {
      id: "129",
      name: "Michael Green",
      profilePicture: "/assets/profile/michaelgreen.jpg",
    },
    content: "Data Science is a rapidly growing field. In this post, we explore how Python can be used for data analysis...",
    coverImage: "/assets/p7.jpg",
    category: "Data Science",
    tags: ["Data Science", "Python", "Machine Learning"],
    likes: 275,
    shares: 60,
    views: 800,
    readTime: "8 min read",
    comments: [],
    createdAt: "2023-08-15T10:00:00Z",
    updatedAt: "2023-08-18T13:30:00Z",
  },
  {
    id: "8",
    title: "Best Practices for Database Optimization",
    author: {
      id: "130",
      name: "Oliver White",
      profilePicture: "/assets/profile/oliverwhite.jpg",
    },
    content: "Database optimization is essential for application performance. Here are some best practices for tuning your database...",
    coverImage: "/assets/p8.jpg",
    category: "Databases",
    tags: ["Databases", "Optimization", "SQL", "NoSQL"],
    likes: 160,
    shares: 20,
    views: 500,
    readTime: "6 min read",
    comments: [],
    createdAt: "2023-08-10T11:15:00Z",
    updatedAt: "2023-08-12T09:45:00Z",
  },
  {
    id: "9",
    title: "How to Create an Engaging User Experience",
    author: {
      id: "131",
      name: "Sophia Lee",
      profilePicture: "/assets/profile/sophialee.jpg",
    },
    content: "Creating an engaging user experience (UX) is key to a successful product. Here's how to keep your users happy...",
    coverImage: "/assets/p9.jpg",
    category: "Design",
    tags: ["UX", "Design", "User Experience", "UI"],
    likes: 240,
    shares: 35,
    views: 900,
    readTime: "5 min read",
    comments: [],
    createdAt: "2023-08-05T10:00:00Z",
    updatedAt: "2023-08-06T11:30:00Z",
  },
  {
    id: "10",
    title: "The Importance of Cloud Security",
    author: {
      id: "132",
      name: "Mark Wilson",
      profilePicture: "/assets/profile/markwilson.jpg",
    },
    content: "Cloud security is a crucial aspect of modern web applications. In this post, we discuss the key aspects of securing your cloud infrastructure...",
    coverImage: "/assets/p10.jpg",
    category: "Cloud",
    tags: ["Cloud Security", "DevOps", "Best Practices"],
    likes: 350,
    shares: 55,
    views: 1300,
    readTime: "9 min read",
    comments: [
      {
        id: "c3",
        author: {
          id: "458",
          name: "Emily Davis",
          profilePicture: "/assets/profile/emilydavis.jpg",
        },
        content: "Excellent overview of cloud security best practices!",
        createdAt: "2023-09-01T14:00:00Z",
        likes: 12,
        replies: [],
      },
    ],
    createdAt: "2023-08-01T09:30:00Z",
    updatedAt: "2023-08-03T10:45:00Z",
  },
];

export default Post;