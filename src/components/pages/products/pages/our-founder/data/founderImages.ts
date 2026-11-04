import game from "../../../../../../assets/founder/game2.jpeg";
import khukuri from "../../../../../../assets/founder/khukuri.png";
import katana from "../../../../../../assets/founder/katana.png";
import boy from "../../../../../../assets/founder/boy.png";
import queenWitch from "../../../../../../assets/founder/boksi.jpeg";


export interface FounderImage {
  /** Image source. Replace with a local import or your own hosted URL. */
  src: string;
  /** Accessible description. Update this alongside the real asset. */
  alt: string;
}

export const founderHeroImage: FounderImage = {
  src: game,
  alt: "Cinematic backdrop for the Founder hero — replace with the game's key art",
};

export const kukriImage: FounderImage = {
  src: khukuri,
  alt: "The khukuri, the Founder's signature curved blade",
};

export const katanaImage: FounderImage = {
  src: katana,
  alt: "The katana, the Founder's secondary blade",
};

export const companionImage: FounderImage = {
  src: boy,
  alt: "The object the Founder's companion carries throughout the journey",
};

export const queenWitchesImage: FounderImage = {
  src: queenWitch,
  alt: "The Queen Boksi, the story's central antagonist",
};
