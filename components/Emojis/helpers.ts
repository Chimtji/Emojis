import * as joypixels from "emoji-toolkit";
import { TEmoji, TEmojiCategory, TEmojis, TTone } from "./types";
import { levenshteinDistance } from "../../utilities";
import { distance } from "fastest-levenshtein";

export const resolveTone = (toned: string[], names: string[]): TTone => {
  const string = names.join("");

  if (toned.includes(names[0].replaceAll(":", ""))) {
    return "yellow";
  } else if (string.includes("tone1")) {
    return "lightest";
  } else if (string.includes("tone2")) {
    return "lighter";
  } else if (string.includes("tone3")) {
    return "medium";
  } else if (string.includes("tone4")) {
    return "darker";
  } else if (string.includes("tone5")) {
    return "darkest";
  } else {
    return "none";
  }
};

export const getTonedEmojis = () => {
  const tonedEmojis: string[] = Object.keys(joypixels.emojiList)
    .map((name: string) => {
      const index = name.indexOf("_tone");
      if (index !== -1) {
        return name.substring(0, index).replace(":", "");
      }
      return "";
    })
    .filter((x) => x);

  const result: string[] = [];

  tonedEmojis.forEach((emoji) => {
    if (!result.includes(emoji)) {
      result.push(emoji);
    }
  });

  return result;
};

export const getAllEmojis = (): TEmojis => {
  const tonedEmojis = getTonedEmojis();

  const result = Object.keys(joypixels.emojiList)
    .map((name: string) => ({
      ...joypixels.emojiList[name],
      name: [name, ...joypixels.emojiList[name].shortnames],
      emoji: joypixels.convert(joypixels.emojiList[name].uc_full),
      unicode: joypixels.emojiList[name].uc_full,
      category: joypixels.emojiList[name].category,
      tone: resolveTone(tonedEmojis, [
        name,
        ...joypixels.emojiList[name].shortnames,
      ]),
    }))
    .filter(
      (emoji) => emoji.category !== "regional" && emoji.category !== "modifier"
    );

  return categorize(result);
};

export const categorize = (items: TEmoji[]) => {
  let result: TEmojis = {
    people: [],
    activity: [],
    nature: [],
    food: [],
    travel: [],
    objects: [],
    symbols: [],
    flags: [],
  };

  items.forEach((item) => {
    const category = item.category as TEmojiCategory;

    if (!result[category]) {
      result[category] = [];
    }

    if (!result[category].includes(item)) {
      result[category].push(item);
    }
  });

  return {
    people: sortBySimilarity(result.people),
    activity: result.activity,
    nature: result.nature,
    food: result.food,
    travel: result.travel,
    objects: result.objects,
    symbols: result.symbols,
    flags: result.flags,
  };
};

export const alphabetize = (data: TEmojis): TEmojis => {
  for (const category in data) {
    data[category as TEmojiCategory].sort((a, b) => {
      const nameA = a.name[0].toLowerCase(); // Assuming name is an array
      const nameB = b.name[0].toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  return data;
};

// Function to sort array of objects by similarity of the "name" property
export const sortBySimilarity = (data: TEmoji[]): TEmoji[] => {
  data.sort((a, b) => {
    const keywordsOrder = [
      { include: "face", exclude: ["man", "person", "men"] },
      { include: "blush", exclude: [] },
      { include: "anguish", exclude: [] },
      { include: "astonish", exclude: [] },
      { include: "confound", exclude: [] },
      { include: "sweat", exclude: [] },
      { include: "laugh", exclude: [] },
      { include: "joy", exclude: ["cat"] },
      { include: "innocent", exclude: [] },
      { include: "expression", exclude: [] },
      { include: "exploding", exclude: [] },
      { include: "grimac", exclude: [] },
      { include: "frown", exclude: ["man", "person"] },
      { include: "grin", exclude: ["cat"] },
      {
        include: "kiss",
        exclude: ["cat", "man", "men", "people", "person", "couple", "mark"],
      },
      { include: "mask", exclude: [] },
      { include: "mouth", exclude: ["lips"] },
      { include: "persevere", exclude: [] },
      { include: "scream", exclude: ["cat"] },
      { include: "sob", exclude: [] },
      { include: "smile", exclude: ["cat"] },
      { include: "star", exclude: [] },
      { include: "stuck_out_tongue", exclude: [] },
      { include: "yum", exclude: [] },
      { include: "sunglasses", exclude: ["dark"] },
      { include: "triumph", exclude: [] },
      { include: "disappointed", exclude: [] },
      { include: "heart_eyes", exclude: [] },
      { include: "cat", exclude: [] },
      { include: "imp", exclude: [] },
      { include: "alien", exclude: [] },
      { include: "skull", exclude: [] },
      { include: "ghost", exclude: [] },
      { include: "poop", exclude: [] },
      { include: "ogre", exclude: [] },
      { include: "goblin", exclude: [] },
      { include: "man_bald", exclude: [] },
      { include: "person_bald", exclude: [] },
      { include: "man_curl", exclude: [] },
      { include: "person_curl", exclude: [] },
      { include: "man_red_hair", exclude: [] },
      { include: "person_red_hair", exclude: [] },
      { include: "man_white_hair", exclude: [] },
      { include: "haired_man", exclude: [] },
      { include: "haired_woman", exclude: [] },
      { include: "haired_person", exclude: [] },
      { include: "bearded_person", exclude: [] },
      { include: "bearded_man", exclude: [] },
      { include: "adult", exclude: [] },
      { include: "child", exclude: [] },
      { include: "man_beard", exclude: [] },
      { include: "person_white_hair", exclude: [] },
      { include: "baby", exclude: ["feeding"] },
      { include: "boy", exclude: ["family"] },
      { include: "girl", exclude: ["family"] },
      { include: "older", exclude: [] },
      { include: "turban", exclude: [] },
      { include: "claus", exclude: [] },
      { include: "with_crown", exclude: [] },
      { include: "man", exclude: ["family", "couple", "_", "mer", "guard"] },
      { include: "family", exclude: [] },
      { include: "couple", exclude: [] },
      { include: "kiss_woman", exclude: [] },
      { include: "hand", exclude: ["man", "person", "people", "bag", "men"] },
      { include: "palm", exclude: ["face"] },
      { include: "metal", exclude: [] },
      { include: "gesture", exclude: [] },
      { include: "finger", exclude: [] },
      { include: "clap", exclude: [] },
      { include: "point", exclude: [] },
      { include: "thumb", exclude: [] },
      { include: "fist", exclude: [] },
      { include: "bicep", exclude: [] },
      { include: "arm", exclude: ["farmer"] },
      { include: "selfie", exclude: [] },
      { include: "ear", exclude: ["couple", "man", "men", "person", "people"] },
      { include: "nose", exclude: [] },
      { include: "leg", exclude: [] },
      { include: "foot", exclude: [] },
      { include: "eye", exclude: ["glass"] },
      { include: "tongue", exclude: [] },
      { include: "lip", exclude: ["stick"] },
      { include: "kiss", exclude: [] },
      { include: "lung", exclude: [] },
      { include: "brain", exclude: [] },
      { include: "nail", exclude: [] },
      { include: "tooth", exclude: [] },
      { include: "man", exclude: ["cloth", "shoe", "sandal", "boot"] },
      { include: "person", exclude: ["cloth"] },
      { include: "two", exclude: [] },
      { include: "men", exclude: [] },
      { include: "people", exclude: [] },
      { include: "mage", exclude: [] },
      { include: "prince", exclude: [] },
      { include: "detective", exclude: [] },
      { include: "police", exclude: [] },
      { include: "hero", exclude: [] },
      { include: "villain", exclude: [] },
      { include: "elf", exclude: [] },
      { include: "worker", exclude: [] },
      { include: "ninja", exclude: [] },
      { include: "vampire", exclude: [] },
      { include: "troll", exclude: [] },
      { include: "zombie", exclude: [] },
      { include: "feeding", exclude: [] },
      { include: "genie", exclude: [] },
      { include: "fairy", exclude: [] },
    ];

    const getIndex = (name: string) => {
      for (let i = 0; i < keywordsOrder.length; i++) {
        keywordsOrder[i].include;
        if (name.includes(keywordsOrder[i].include)) {
          let match = true;
          keywordsOrder[i].exclude.forEach((exclude) => {
            if (name.includes(exclude)) {
              match = false;
            }
          });

          if (match) {
            return i;
          }
        }
      }
      return keywordsOrder.length;
    };

    const indexA = getIndex(a.name.join("").replaceAll(":", "").toLowerCase());
    const indexB = getIndex(b.name.join("").replaceAll(":", "").toLowerCase());

    return indexA - indexB;
  });

  return data;
};
