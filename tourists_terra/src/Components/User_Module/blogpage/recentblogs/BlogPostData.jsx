const blogPosts = [
    {
      title: "Food Delights",
      description: "Indulge in a world of food delights and discover mouthwatering recipes and culinary adventures.",
      category: "food",
      timestamp: new Date("2023-01-15T10:30:00Z"),
    },
    {
      title: "Restaurant Reviews",
      description: "Explore the restaurant scene with in-depth reviews, dining experiences, and restaurant recommendations.",
      category: "restaurant",
      timestamp: new Date("2023-10-22T14:20:00Z"),
    },
    {
      title: "Hotel Getaways",
      description: "Plan your perfect getaway with hotel insights, accommodation tips, and hotel destination guides.",
      category: "hotel",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Attraction Exploration",
      description: "Explore attraction points and tourist destinations with travel guides and attraction insights.",
      category: "attraction points",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Self Blog Adventures",
      description: "Embark on a personal journey with self blog adventures, self-reflection, and personal growth stories.",
      category: "self blog",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Foodie Chronicles",
      description: "Delve into the world of food with foodie chronicles, culinary explorations, and epicurean adventures.",
      category: "food",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Fine Dining Experiences",
      description: "Savor fine dining experiences with elegant cuisine, gourmet reviews, and upscale dining recommendations.",
      category: "restaurant",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Luxury Hotel Escapes",
      description: "Experience luxury hotel escapes with opulent accommodations, lavish amenities, and upscale travel.",
      category: "hotel",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Adventure at Attractions",
      description: "Embark on adventures at attraction points, explore theme parks, and enjoy thrilling tourist spots.",
      category: "attraction points",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Personal Storytelling",
      description: "Engage in personal storytelling with self blog experiences, life anecdotes, and personal narratives.",
      category: "self blog",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Foodie Excursions",
      description: "Embark on foodie excursions with culinary tours, foodie adventures, and gastronomic explorations.",
      category: "food",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Hidden Gem Restaurants",
      description: "Discover hidden gem restaurants with unique dining experiences, local flavors, and offbeat eateries.",
      category: "restaurant",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Boutique Hotel Retreats",
      description: "Escape to boutique hotel retreats with charming accommodations, boutique travel, and intimate getaways.",
      category: "hotel",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Historical Attractions",
      description: "Explore historical attractions, heritage sites, and cultural landmarks with history-rich travel guides.",
      category: "attraction points",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Self Discovery Journey",
      description: "Embark on a self-discovery journey with self blog reflections, self-awareness, and personal growth insights.",
      category: "self blog",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Culinary Adventures",
      description: "Embark on culinary adventures, culinary explorations, and gourmet experiences around the world.",
      category: "food",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "International Cuisine",
      description: "Savor international cuisine with diverse flavors, world cuisines, and global culinary journeys.",
      category: "restaurant",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Resort Escapades",
      description: "Experience resort escapades with luxury resorts, tropical getaways, and dreamy vacation spots.",
      category: "hotel",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Natural Wonders",
      description: "Discover natural wonders, scenic beauty, and breathtaking landscapes at various attraction points.",
      category: "attraction points",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Personal Musings",
      description: "Reflect on personal musings with self blog entries, self-expression, and introspective reflections.",
      category: "self blog",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Epicurean Explorations",
      description: "Embark on epicurean explorations with gastronomic quests, foodie adventures, and culinary quests.",
      category: "food",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Local Eateries",
      description: "Explore local eateries, neighborhood gems, and community restaurants with local flavors.",
      category: "restaurant",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Boutique Hotel Charm",
      description: "Experience boutique hotel charm with intimate accommodations, cozy stays, and charming retreats.",
      category: "hotel",
      timestamp: new Date("2023-10-04T14:45:00Z"),
    },
    {
      title: "Natural Attractions",
      description: "Visit natural attractions, scenic wonders, and outdoor beauty at various attraction points.",
      category: "attraction points",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Personal Insights",
      description: "Share personal insights with self blog narratives, self-reflection, and life's observations.",
      category: "self blog",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Culinary Discoveries",
      description: "Discover culinary delights, food explorations, and delectable finds in the world of food.",
      category: "food",
      timestamp: new Date("2023-11-10T14:45:00Z"),
    },
    {
      title: "Culinary Adventures Abroad",
      description: "Embark on culinary adventures abroad, explore global cuisines, and savor international flavors.",
      category: "restaurant",
      timestamp: new Date("2023-02-20T14:45:00Z"),
    },
    {
      title: "Luxury Hotel Getaways",
      description: "Enjoy luxury hotel getaways, upscale travel, and grand accommodations in picturesque destinations.",
      category: "hotel",
      timestamp: new Date("2023-11-20T14:45:00Z"),
    },
    {
      title: "Natural Beauty Spots",
      description: "Visit natural beauty spots, picturesque landscapes, and serene destinations at attraction points.",
      category: "attraction points",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Self Reflections and Journeys",
      description: "Embark on self reflections and journeys with self blog experiences, life stories, and introspective musings.",
      category: "self blog",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Foodie Explorations",
      description: "Explore foodie explorations, culinary travels, and gastronomic adventures around the world.",
      category: "food",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Culinary Quests",
      description: "Embark on culinary quests, foodie escapades, and culinary explorations in search of flavors.",
      category: "restaurant",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Boutique Hotel Hideaways",
      description: "Escape to boutique hotel hideaways, charming accommodations, and cozy retreats in unique locations.",
      category: "hotel",
      timestamp: new Date("2023-04-20T14:45:00Z"),
    },
    {
      title: "Outdoor Adventure Spots",
      description: "Discover outdoor adventure spots, nature escapes, and thrilling activities at attraction points.",
      category: "attraction points",
      timestamp: new Date("2023-01-20T14:45:00Z"),

    },
    {
      title: "Personal Growth Chronicles",
      description: "Chronicle personal growth journeys with self blog insights, life transformations, and self-improvement tales.",
      category: "self blog",
      timestamp: new Date("2023-01-20T14:45:00Z"),

    },
    {
      title: "Culinary Delicacies",
      description: "Indulge in culinary delicacies, foodie experiences, and gourmet delights from various cuisines.",
      category: "food",
      timestamp: new Date("2023-01-20T14:45:00Z"),

    },
    {
      title: "Local Restaurant Gems",
      description: "Discover local restaurant gems, hidden culinary treasures, and local flavor experiences.",
      category: "restaurant",
      timestamp: new Date("2023-01-20T14:45:00Z"),
    },
    {
      title: "Charming Boutique Stays",
      description: "Experience charming boutique stays, cozy accommodations, and intimate escapes in picturesque settings.",
      category: "hotel",
      timestamp: new Date("2023-01-20T14:45:00Z"),

    },
    {
      title: "Adventure-Seeking Escapes",
      description: "Seek adventure with escapades to thrilling attraction points, nature adventures, and outdoor explorations.",
      category: "attraction points",
      timestamp: new Date("2023-04-10T14:45:00Z"),

    },
    {
      title: "Personal Reflections and Insights",
      description: "Reflect on personal journeys with self blog entries, self-discovery narratives, and introspective musings.",
      category: "self blog",
      timestamp: new Date("2023-05-10T14:45:00Z"),

    },
  ];
  
  
  
  export default blogPosts