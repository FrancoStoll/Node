import { heroes } from "../data/heroes";


export function findHeroById(id: number) {
    return heroes.find((hero) => hero.id === id);
  }