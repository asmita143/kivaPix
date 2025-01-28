interface Event {
  id: number;
  name: string;
  location: string;
  imageSrc: string;
  date: string;
  description: string;
  organizer: string;
  contact: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "Football Competition",
    location: "Leppavaara Football Ground",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
    date: "11.02.2024",
    description: "A thrilling football competition between local teams.",
    organizer: "Sports Club X",
    contact: "sportsclubx@example.com",
  },
  {
    id: 2,
    name: "Wedding of X and Y",
    location: "Huopalahti Hall",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    date: "12.05.2024",
    description: "A beautiful wedding celebration for X and Y.",
    organizer: "X & Y's Wedding",
    contact: "weddingxy@example.com",
  },
  {
    id: 3,
    name: "Birthday of a Kid",
    location: "Kilonkallio 10 E 39, Espoo",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
    date: "20.10.2025",
    description: "Join us for a fun-filled birthday party for a special kid.",
    organizer: "Birthday Organizers",
    contact: "birthdayorganizers@example.com",
  },
  {
    id: 4,
    name: "Naming Ceremony",
    location: "Kilonkuja 10 E 20, Espoo",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
    date: "10.11.2025",
    description: "A traditional naming ceremony for a newborn.",
    organizer: "Family & Friends",
    contact: "familyfriends@example.com",
  },
  {
    id: 5,
    name: "Earthen Bottle Exhibition",
    location: "#",
    imageSrc: "https://picsum.photos/200/300",
    date: "2025-06-18",
    description: "An exhibition showcasing handcrafted earthen bottles.",
    organizer: "Clay Art Gallery",
    contact: "clayart@example.com",
  },
  {
    id: 6,
    name: "Art and Culture Festival",
    location: "City Center, Downtown",
    imageSrc: "https://picsum.photos/200/300",
    date: "2025-07-10",
    description:
      "A festival celebrating art and culture with performances, installations, and workshops.",
    organizer: "Art Collective",
    contact: "artcollective@example.com",
  },
  {
    id: 7,
    name: "Science Fair 2025",
    location: "National Science Museum",
    imageSrc: "https://picsum.photos/200/300",
    date: "2025-08-22",
    description:
      "Explore the latest innovations and experiments at the Science Fair.",
    organizer: "Science Association",
    contact: "sciencefair2025@example.com",
  },
  {
    id: 8,
    name: "Food Festival",
    location: "City Park, Near the Lake",
    imageSrc: "https://picsum.photos/200/300",
    date: "2025-09-14",
    description:
      "Enjoy a wide variety of food from all over the world at the Food Festival.",
    organizer: "Gourmet Events",
    contact: "foodfest@example.com",
  },
  {
    id: 9,
    name: "Music Concert by The Waves",
    location: "Open-Air Arena",
    imageSrc: "https://picsum.photos/200/300",
    date: "2025-12-01",
    description:
      "A live music performance by The Waves, an upcoming rock band.",
    organizer: "Live Music Inc.",
    contact: "livemusic@example.com",
  },
];
export default events;
