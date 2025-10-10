// src/phaser/logic/TrashManager.js

export const trashItems = [
  // ♻️ Recyclables → blue bin
  { name: "clean plastic bottle", key: "bottle_trash", path: "/assets/trash/blue/bottle.jpg" },
  { name: "clean aluminium can", key: "can_trash", path: "/assets/trash/blue/can.jpg" },
  { name: "magazine", key: "magazine_trash", path: "/assets/trash/blue/magazine.jpg" },
  { name: "clean glass bottle", key: "glass_trash", path: "/assets/trash/blue/glass.jpg" },
  { name: "newspaper", key: "newspaper_trash", path: "/assets/trash/blue/newspaper.jpg" },

  // 👕 Donations → yellow bin
  { name: "shirt", key: "shirt_trash", path: "/assets/trash/yellow/shirt.jpg" },
  { name: "pants", key: "pants_trash", path: "/assets/trash/yellow/pants.jpg" },
  { name: "stuffed toy", key: "toy_trash", path: "/assets/trash/yellow/toy.jpg" },

  // 🗑️ General waste → green bin
  { name: "food waste", key: "food_trash", path: "/assets/trash/green/food.jpg" },
  { name: "plastic fork", key: "fork_trash", path: "/assets/trash/green/fork.jpg" },
  { name: "tissue", key: "tissue_trash", path: "/assets/trash/green/tissue.jpg" },
  { name: "dirty paper plate", key: "plate_trash", path: "/assets/trash/green/plate.jpg" },
  { name: "dirty aluminium can", key: "dirty_can_trash", path: "/assets/trash/green/dirty_can.jpg" }
];

export function classifyTrash(trashItem) {
  const recyclable = ["clean plastic bottle", "clean aluminium can", "magazine", "clean glass bottle", "newspaper"];
  const donation = ["shirt", "pants", "stuffed toy"];
  const generalWaste = ["food waste", "plastic fork", "tissue", "dirty paper plate", "dirty aluminium can"];

  if (recyclable.includes(trashItem)) return "recyclable";
  if (donation.includes(trashItem)) return "donation";
  return "generalWaste";
}
