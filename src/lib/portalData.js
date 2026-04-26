export const fests = [
  {
    id: "ignus",
    name: "IGNUS",
    tagline: "The Desert's Grandest Spectacle",
    coverImage: "src/assets/amaal2.jpeg",
    color: "#811811",
    badge: "Main Fest",
    date: "Feb 15-18",
    year: "2025"
  },
  {
    id: "spandan",
    name: "SPANDAN",
    tagline: "A Symphony of Arts & Culture",
    coverImage: "src/assets/band2.jpeg",
    color: "#1a3a6b",
    badge: "Cultural",
    date: "Mar 10-12",
    year: "2025"
  },
  {
    id: "vortex",
    name: "VORTEX",
    tagline: "Unleashing Technical Innovation",
    coverImage: "src/assets/amanraj.jpeg",
    color: "#1a4a1a",
    badge: "Technical",
    date: "Apr 05-07",
    year: "2025"
  }
];

export const allEvents = [
  {
    id: 1,
    fest: "ignus",
    icon: "🔥",
    category: "Main Stage",
    title: "The Inferno Concert",
    date: "Feb 15",
    time: "7:00 PM",
    venue: "Main Ground",
    seats: 5000
  },
  {
    id: 2,
    fest: "ignus",
    icon: "🎸",
    category: "Competition",
    title: "Battle of Bands",
    date: "Feb 16",
    time: "4:00 PM",
    venue: "OAT",
    seats: 1200
  },
  {
    id: 3,
    fest: "spandan",
    icon: "🎭",
    category: "Arts",
    title: "Dramatic Monologues",
    date: "Mar 10",
    time: "2:00 PM",
    venue: "Seminar Hall",
    seats: 300
  },
  {
    id: 4,
    fest: "vortex",
    icon: "💻",
    category: "Hackathon",
    title: "Code Storm 24h",
    date: "Apr 05",
    time: "10:00 AM",
    venue: "Lab Complex",
    seats: 500
  }
];

export const stats = [
  { icon: "🎉", value: "25+", label: "Total Events" },
  { icon: "👥", value: "12K+", label: "Footfall" },
  { icon: "🏛️", value: "15+", label: "Colleges" },
  { icon: "💰", value: "5L+", label: "Prize Pool" }
];

export const artists = [
  {
    id: 1,
    name: "Amaal Malik",
    type: "Playback Singer",
    performing: "Ignus Main Night",
    highlight: true,
    image: "src/assets/amaal.jpeg",
    bio: "The queen of Bollywood stage performances is coming to set the stage on fire."
  },
  {
    id: 2,
    name: "Ashish Chanchlani ",
    type: "Electronic Producer",
    performing: "EDM Night",
    highlight: true,
    image: "src/assets/ashish.jpeg",
    bio: "India's bass king will be dropping the heaviest beats of the year."
  },
  {
    id: 3,
    name: "Ashish Solanki",
    type: "Standup Comic",
    performing: "Comedy Show",
    highlight: false,
    image: "src/assets/solanki.jpeg"
  },
  {
    id: 4,
    name: "Amanraj Gill",
    type: "Indie Rock Band",
    performing: "Spandan Headline",
    highlight: false,
    image: "src/assets/amanraj.jpeg"
  }
];

export const galleryPhotos = [
  { id: 1, src: "src/assets/amaal2.jpeg", caption: "Crowd at Ignus '24", fest: "IGNUS" },
  { id: 2, src: "src/assets/ashish.jpeg", caption: "Main Stage Setup", fest: "VORTEX" },
  { id: 3, src: " src/assets/amanraj.jpeg", caption: "Night Concert", fest: "IGNUS" },
  { id: 4, src: "src/assets/band2.jpeg", caption: "Dance Performance", fest: "SPANDAN" },
  { id: 5, src: "src/assets/band3.jpeg", caption: "Tech Expo", fest: "VORTEX" },
  { id: 6, src: "src/assets/solanki.jpeg", caption: "Football Finals", fest: "IGNUS" }
];

export const leaderboard = [
  { rank: 1, name: "Rahul Sharma", dept: "CSE", points: 2450, events: 12, badge: "👑" },
  { rank: 2, name: "Ananya Iyer", dept: "ECE", points: 2100, events: 9, badge: "🥈" },
  { rank: 3, name: "Vikram Malhotra", dept: "ME", points: 1850, events: 7, badge: "🥉" },
  { rank: 4, name: "Sneha Kapur", dept: "BT", points: 1500, events: 6, badge: "⚡" },
  { rank: 5, name: "Arjun Reddy", dept: "EE", points: 1200, events: 5, badge: "🔥" }
];

export const deptLeaderboard = [
  { rank: 1, dept: "CSE", members: 450, points: 15400 },
  { rank: 2, dept: "ECE", members: 380, points: 12800 },
  { rank: 3, dept: "ME", members: 410, points: 11200 },
  { rank: 4, dept: "EE", members: 320, points: 9500 }
];
