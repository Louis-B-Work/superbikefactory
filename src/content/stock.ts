/**
 * Bike stock. [PLACEHOLDER] Illustrative listings only: replace with real stock
 * (or a feed) before launch. Photos are reused site imagery, not the actual bikes.
 */

export type BikeCategory = "Sport" | "Naked" | "Adventure" | "Cruiser" | "Touring" | "Commuter";

export interface Bike {
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  /** Registration plate letters, e.g. "21". */
  plate: string;
  mileage: number;
  engineCc: number;
  category: BikeCategory;
  colour: string;
  price: number;
  /** Cash sale only: not offered on finance. */
  cashOnly?: boolean;
  badge?: string;
  /** Marks recent arrivals for the homepage and "Just arrived" sort. */
  arrivedDaysAgo: number;
  image: string;
  description: string;
  features: string[];
}

const base = {
  mountain: "/images/mountain-ride.jpg",
  city: "/images/city-ride.jpg",
  road: "/images/road.jpg",
  cta: "/images/cta-ride.jpg",
  cruiser: "/images/hero-about-cruiser.jpg",
  about: "/images/hero-about.jpg",
  finance: "/images/hero-finance.jpg",
} as const;

export const bikes: Bike[] = [
  {
    slug: "yamaha-mt-07-2021",
    make: "Yamaha", model: "MT-07", variant: "689cc", year: 2021, plate: "21", mileage: 6400,
    engineCc: 689, category: "Naked", colour: "Icon Blue", price: 6495, badge: "Just arrived", arrivedDaysAgo: 3,
    image: base.city,
    description: "The class-leading middleweight naked: punchy twin, light handling and easy to live with every day.",
    features: ["ABS", "LED lighting", "Full service history", "One owner"],
  },
  {
    slug: "honda-cb125r-2022",
    make: "Honda", model: "CB125R", variant: "125cc", year: 2022, plate: "22", mileage: 2100,
    engineCc: 125, category: "Commuter", colour: "Matt Black", price: 3695, arrivedDaysAgo: 9,
    image: base.city,
    description: "A premium learner-legal 125 with sharp styling and a fuss-free engine. Ideal first bike.",
    features: ["ABS", "LED lighting", "Learner legal", "Two keys"],
  },
  {
    slug: "kawasaki-z650-2020",
    make: "Kawasaki", model: "Z650", variant: "649cc", year: 2020, plate: "70", mileage: 9800,
    engineCc: 649, category: "Naked", colour: "Pearl Flat Stardust White", price: 5295, arrivedDaysAgo: 21,
    image: base.road,
    description: "Friendly A2-compatible naked with a smooth parallel twin and a comfortable riding position.",
    features: ["ABS", "A2 compatible", "Fresh MOT", "Tail tidy fitted"],
  },
  {
    slug: "triumph-street-triple-r-2019",
    make: "Triumph", model: "Street Triple R", variant: "765cc", year: 2019, plate: "19", mileage: 11200,
    engineCc: 765, category: "Naked", colour: "Silver Ice", price: 7995, badge: "Low mileage", arrivedDaysAgo: 14,
    image: base.road,
    description: "Triple-cylinder character and superb handling. A rider's favourite in great condition.",
    features: ["Ride modes", "Quickshifter", "ABS and traction control", "Full Triumph history"],
  },
  {
    slug: "bmw-r1250gs-2020",
    make: "BMW", model: "R 1250 GS", variant: "1254cc", year: 2020, plate: "20", mileage: 14500,
    engineCc: 1254, category: "Adventure", colour: "Triple Black", price: 14995, arrivedDaysAgo: 6,
    image: base.mountain,
    description: "The benchmark adventure bike, fitted with panniers and comfort seat, ready for the long haul.",
    features: ["Panniers", "Heated grips", "Cruise control", "Full BMW history"],
  },
  {
    slug: "honda-africa-twin-2019",
    make: "Honda", model: "Africa Twin", variant: "1084cc", year: 2019, plate: "69", mileage: 17800,
    engineCc: 1084, category: "Adventure", colour: "Tricolour", price: 8995, arrivedDaysAgo: 30,
    image: base.mountain,
    description: "Go-anywhere adventure bike with a charismatic parallel twin and superb long-distance comfort.",
    features: ["Crash bars", "Luggage rack", "Traction control", "Fresh service"],
  },
  {
    slug: "ducati-monster-2021",
    make: "Ducati", model: "Monster", variant: "937cc", year: 2021, plate: "21", mileage: 4800,
    engineCc: 937, category: "Naked", colour: "Ducati Red", price: 9495, badge: "Low mileage", arrivedDaysAgo: 11,
    image: base.finance,
    description: "Lighter, sharper and better than ever. The Monster's V-twin character with modern electronics.",
    features: ["Riding modes", "Cornering ABS", "Quickshifter", "Ducati service history"],
  },
  {
    slug: "yamaha-r7-2022",
    make: "Yamaha", model: "YZF-R7", variant: "689cc", year: 2022, plate: "72", mileage: 3300,
    engineCc: 689, category: "Sport", colour: "Team Yamaha Blue", price: 7495, badge: "Just arrived", arrivedDaysAgo: 2,
    image: base.cta,
    description: "Track-ready looks with road-friendly manners. A sporty twin without the sting of a litre bike.",
    features: ["ABS", "Slip and assist clutch", "LED lighting", "One owner"],
  },
  {
    slug: "suzuki-gsx-r750-2018",
    make: "Suzuki", model: "GSX-R750", variant: "750cc", year: 2018, plate: "68", mileage: 15200,
    engineCc: 750, category: "Sport", colour: "Metallic Triton Blue", price: 7295, arrivedDaysAgo: 40,
    image: base.cta,
    description: "The in-between supersport: more midrange than a 600, friendlier than a litre bike.",
    features: ["Traction control", "Akrapovic exhaust", "New tyres", "Fresh MOT"],
  },
  {
    slug: "harley-davidson-iron-883-2017",
    make: "Harley-Davidson", model: "Iron 883", variant: "883cc", year: 2017, plate: "17", mileage: 12600,
    engineCc: 883, category: "Cruiser", colour: "Black Denim", price: 5995, arrivedDaysAgo: 25,
    image: base.cruiser,
    description: "Stripped-back Sportster style with that unmistakable V-twin rumble.",
    features: ["Screamin' Eagle air filter", "Custom bars", "Full service", "Two keys"],
  },
  {
    slug: "royal-enfield-interceptor-650-2022",
    make: "Royal Enfield", model: "Interceptor 650", variant: "648cc", year: 2022, plate: "22", mileage: 3900,
    engineCc: 648, category: "Cruiser", colour: "Orange Crush", price: 4995, arrivedDaysAgo: 17,
    image: base.about,
    description: "Classic parallel-twin roadster that's easy to ride, easy to maintain and a joy to own.",
    features: ["ABS", "Chrome finish", "Warranty remaining", "One owner"],
  },
  {
    slug: "kawasaki-versys-650-2019",
    make: "Kawasaki", model: "Versys 650", variant: "649cc", year: 2019, plate: "19", mileage: 19400,
    engineCc: 649, category: "Touring", colour: "Metallic Spark Black", price: 5495, arrivedDaysAgo: 35,
    image: base.mountain,
    description: "Sport-tourer that does it all: commuting, touring and weekend blasts with equal ease.",
    features: ["Panniers", "Adjustable screen", "ABS", "Fresh service"],
  },
  {
    slug: "honda-forza-300-2021",
    make: "Honda", model: "Forza 300", variant: "279cc", year: 2021, plate: "21", mileage: 5200,
    engineCc: 279, category: "Commuter", colour: "Pearl White", price: 3995, cashOnly: true, arrivedDaysAgo: 19,
    image: base.city,
    description: "Practical, comfortable maxi-scooter with underseat storage and plenty of weather protection.",
    features: ["Smart key", "Heated grips", "Top box", "Cash sale"],
  },
  {
    slug: "triumph-tiger-900-2020",
    make: "Triumph", model: "Tiger 900", variant: "888cc", year: 2020, plate: "70", mileage: 10100,
    engineCc: 888, category: "Adventure", colour: "Sapphire Black", price: 9295, arrivedDaysAgo: 8,
    image: base.mountain,
    description: "Triple power with proper off-road ability, tuned for serious adventure.",
    features: ["Cruise control", "Ride modes", "Heated seat", "Triumph history"],
  },
  {
    slug: "ktm-390-duke-2021",
    make: "KTM", model: "390 Duke", variant: "373cc", year: 2021, plate: "21", mileage: 7300,
    engineCc: 373, category: "Naked", colour: "Orange", price: 3495, cashOnly: true, arrivedDaysAgo: 28,
    image: base.road,
    description: "Lightweight, quick and fun. A great A2 naked with attitude.",
    features: ["A2 compatible", "ABS", "TFT dash", "Cash sale"],
  },
];

export function bikeTitle(b: Pick<Bike, "make" | "model">): string {
  return `${b.make} ${b.model}`;
}

export function bikeSubtitle(b: Bike): string {
  return `${b.year} (${b.plate}) ${b.variant} ${b.category}`;
}

export function getBike(slug: string): Bike | undefined {
  return bikes.find((b) => b.slug === slug);
}
