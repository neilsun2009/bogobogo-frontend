class Cat {
  primaryColor: string;
  secondaryColor: string;
  layerBg: string;
}

export class General {
  cats: {
    index: Cat,
    bio: Cat,
    design: Cat,
    coding: Cat,
    translation: Cat,
    bytes: Cat,
    words: Cat,
    blog: Cat,
    more: Cat,
  };
}
