import type { Trainer } from "@/types";

export const trainers: Trainer[] = [
  {
    id: "marcus",
    slug: "marcus-cole",
    name: "Marcus Cole",
    role: "Head Strength Coach",
    initials: "MC",
    image: "https://i.pravatar.cc/300?img=11",
    yearsExperience: 12,
    specialties: ["Powerlifting", "Olympic Lifting", "Hypertrophy"],
    certifications: ["NSCA-CSCS", "USAW Level 2"],
    bio: "Marcus built Iron & Oak's barbell program from the platform up. He coaches with patience and precision - turning nervous first-timers into confident lifters, and seasoned athletes into competitors.",
    availability: [
      { day: "Mon", slots: ["06:00", "07:00", "16:00", "17:00"] },
      { day: "Wed", slots: ["06:00", "07:00", "16:00"] },
      { day: "Fri", slots: ["06:00", "07:00", "08:00"] },
    ],
  },
  {
    id: "nadia",
    slug: "nadia-rey",
    name: "Nadia Rey",
    role: "Conditioning Coach",
    initials: "NR",
    image: "https://i.pravatar.cc/300?img=47",
    yearsExperience: 9,
    specialties: ["HIIT", "Metcon", "Endurance"],
    certifications: ["NASM-CPT", "TRX Certified"],
    bio: "A former 800m runner, Nadia brings track-level intensity to every session. Her conditioning classes are the ones members brag about surviving.",
    availability: [
      { day: "Tue", slots: ["09:00", "10:00", "18:00"] },
      { day: "Thu", slots: ["09:00", "10:00", "18:00", "19:00"] },
      { day: "Sat", slots: ["08:00", "09:00"] },
    ],
  },
  {
    id: "theo",
    slug: "theo-laurent",
    name: "Théo Laurent",
    role: "Mobility & Recovery",
    initials: "TL",
    image: "https://i.pravatar.cc/300?img=33",
    yearsExperience: 8,
    specialties: ["Mobility", "Yoga", "Rehab"],
    certifications: ["FRC Mobility Specialist", "RYT-500"],
    bio: "Théo keeps the gym moving well. Part coach, part physio, he designs the recovery work that lets members train hard without breaking down.",
    availability: [
      { day: "Mon", slots: ["11:00", "12:00", "19:00"] },
      { day: "Wed", slots: ["11:00", "12:00", "19:00", "20:00"] },
      { day: "Sun", slots: ["09:00", "10:00", "11:00"] },
    ],
  },
  {
    id: "saanvi",
    slug: "saanvi-rao",
    name: "Saanvi Rao",
    role: "Personal Trainer",
    initials: "SR",
    image: "https://i.pravatar.cc/300?img=56",
    yearsExperience: 7,
    specialties: ["Fat Loss", "Functional", "Kettlebell"],
    certifications: ["ACE-CPT", "StrongFirst SFG"],
    bio: "Saanvi specialises in sustainable transformation. No fads, no burnout - just smart programming and relentless encouragement.",
    availability: [
      { day: "Tue", slots: ["06:00", "07:00", "12:00", "17:00"] },
      { day: "Thu", slots: ["06:00", "07:00", "12:00"] },
      { day: "Sat", slots: ["10:00", "11:00", "12:00"] },
    ],
  },
  {
    id: "darius",
    slug: "darius-king",
    name: "Darius King",
    role: "Strength & Performance",
    initials: "DK",
    image: "https://i.pravatar.cc/300?img=15",
    yearsExperience: 10,
    specialties: ["Athletic Performance", "Sprint Mechanics", "Strongman"],
    certifications: ["NSCA-CSCS", "EXOS Performance"],
    bio: "Darius trains athletes who need to move fast and hit hard. Explosive, technical, and demanding - his sessions build power that transfers to the field.",
    availability: [
      { day: "Mon", slots: ["08:00", "09:00", "18:00"] },
      { day: "Wed", slots: ["08:00", "09:00", "18:00"] },
      { day: "Fri", slots: ["16:00", "17:00", "18:00"] },
    ],
  },
];

export function getTrainer(id: string): Trainer | undefined {
  return trainers.find((t) => t.id === id);
}

export function getTrainerBySlug(slug: string): Trainer | undefined {
  return trainers.find((t) => t.slug === slug);
}
