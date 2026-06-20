import type { Member } from "@/types";

/** The demo member used to render the (simulated) account portal. */
export const demoMember: Member = {
  name: "Alex Mercer",
  email: "alex.mercer@example.com",
  initials: "AM",
  memberSince: "March 2025",
  planId: "unlimited",
  packBalance: 6,
  bookings: [
    {
      id: "b1",
      type: "class",
      title: "Forge",
      trainer: "Marcus Cole",
      date: "Mon 22 Jun",
      time: "17:00",
      status: "confirmed",
    },
    {
      id: "b2",
      type: "appointment",
      title: "1-on-1 Strength",
      trainer: "Marcus Cole",
      date: "Wed 24 Jun",
      time: "07:00",
      status: "confirmed",
    },
    {
      id: "b3",
      type: "class",
      title: "Ember HIIT",
      trainer: "Nadia Rey",
      date: "Thu 25 Jun",
      time: "18:00",
      status: "waitlist",
    },
    {
      id: "b4",
      type: "class",
      title: "Oak Flow",
      trainer: "Théo Laurent",
      date: "Sat 27 Jun",
      time: "10:00",
      status: "confirmed",
    },
  ],
  payments: [
    { id: "p1", date: "01 Jun 2026", description: "Unlimited membership", amount: 129, status: "paid" },
    { id: "p2", date: "12 May 2026", description: "10-Class Pack", amount: 170, status: "paid" },
    { id: "p3", date: "01 May 2026", description: "Unlimited membership", amount: 129, status: "paid" },
    { id: "p4", date: "01 Jul 2026", description: "Unlimited membership", amount: 129, status: "upcoming" },
  ],
};
