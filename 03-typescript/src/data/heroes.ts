

interface Hero {
    id: number;
    name: string;
    owner: string;
}

export const heroes: Hero[] = [
    {
        id: 1,
        name: "IronMan",
        owner: "Marvel",
    },
    {
        id: 2,
        name: "SpiderMan",
        owner: "Marvel",
    },
    {
        id: 3,
        name: "Batman",
        owner: "DC",
    },
];