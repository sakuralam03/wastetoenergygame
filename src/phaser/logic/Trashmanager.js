// src/phaser/logic/TrashManager.js
export const trashItems = [
  //  Recyclables → blue bin
  { name: "clean plastic bottle", key: "bottle_trash", path: "/assets/trash/blue/bottle.png", scale: 0.1 },
  { name: "clean aluminium can", key: "can_trash", path: "/assets/trash/blue/can.jpeg", scale: 0.3 },
  { name: "magazine", key: "magazine_trash", path: "/assets/trash/blue/magazine.jpg", scale: 0.1 },
  { name: "clean glass bottle", key: "glass_trash", path: "/assets/trash/blue/glass.jpg", scale: 0.1 },
  { name: "newspaper", key: "newspaper_trash", path: "/assets/trash/blue/newspaper.jpeg", scale: 0.2 },

  //  Donations → yellow bin
  { name: "shirt", key: "shirt_trash", path: "/assets/trash/yellow/shirt.jpg", scale: 0.13 },
  { name: "pants", key: "pants_trash", path: "/assets/trash/yellow/pants.jpeg", scale: 0.2 },
  { name: "stuffed toy", key: "toy_trash", path: "/assets/trash/yellow/toy.jpeg", scale: 0.2 },
  { name: "blankets", key: "blankets_trash", path: "/assets/trash/yellow/blankets.jpg", scale: 0.02 },
  { name: "cushions", key: "cushions_trash", path: "/assets/trash/yellow/cushions.jpg", scale: 0.1 },

  //  General waste → green bin
  { name: "food waste", key: "food_trash", path: "/assets/trash/green/food.jpeg", scale: 0.01 },
  { name: "sweet wrapper", key: "sweet_wrapper_trash", path: "/assets/trash/green/wrapper.jpeg", scale: 0.3 },
  { name: "tissue", key: "tissue_trash", path: "/assets/trash/green/tissue.jpg", scale: 0.09 },
  { name: "dirty paper plate", key: "plate_trash", path: "/assets/trash/green/plate.jpg", scale: 0.11 },
  { name: "used mask", key: "used_mask_trash", path: "/assets/trash/green/mask.jpg", scale: 0.08 }
];

export function classifyTrash(trashItem) {
  const recyclable = ["clean plastic bottle", "clean aluminium can", "magazine", "clean glass bottle", "newspaper"];
  const donation = ["shirt", "pants", "stuffed toy" , "blankets" , "cushions"];
  const generalWaste = ["food waste", "sweet wrapper", "tissue", "dirty paper plate", "used mask"];

  if (recyclable.includes(trashItem)) return "recyclable";
  if (donation.includes(trashItem)) return "donation";
  return "generalWaste";
}
