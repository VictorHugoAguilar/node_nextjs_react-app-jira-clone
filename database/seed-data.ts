
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    title: string;
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            title: 'React',
            description: 'A JavaScript library for building user interfaces.',
            status: 'pending',
            createdAt: Date.now() - 500,
        },
        {
            title: 'Angular',
            description: 'Learn A JavaScript library for building user interfaces.',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            title: 'Vue',
            description: 'Learn A JavaScript library for building user interfaces.',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        },
    ]
}
