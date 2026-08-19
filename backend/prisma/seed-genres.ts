import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const genres = [
  // gen (principais)
  "Ação",
  "Aventura",
  "Romance",
  "Comédia",
  "Terror",
  "Suspense",
  "Fantasia",
  "Ficção científica",
  "Drama",
  "Animação",
  // agp (agrupadores)
  "DC",
  "Marvel",
  "Super Herói",
  "Vilão",
  "História",
  "Guerra",
  "Slasher",
  "Crime",
  "Mistério",
  "Família",
  "Coreano",
  "Chinês",
  "Mangá",
  "Violento",
  "Música",
  "Nacional",
  "Espaço",
  "Psicopata",
  "Política",
  "Festa",
  "Besteirol",
  "Sobrenatural",
  "Assassinato",
  "Religioso",
  "Apocalipse",
  "Fantasmas",
  "Futurístico",
  "Tecnologia",
  "Romântico",
  "Mitologia",
  "Adrenalina",
  "Monstros",
  "Faroeste",
  "Infantil",
  "Investigação",
  "Detetive",
  "Espionagem",
  "Drama Adolescente",
  "Documentário",
  "Vampiros",
  "Roubo",
  "Perseguição",
  "Ninjas",
  // sptopc (temas especiais)
  "Halloween",
  "Natal",
  "Para rir alto",
  "Para maratonar",
  "Para chorar",
  "Para relaxar",
  "Baseado no livro",
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const name of genres) {
    const slug = slugify(name);
    try {
      await prisma.gen.create({ data: { name, slug } });
      created++;
    } catch (e: any) {
      if (e.code === "P2002") {
        skipped++;
      } else {
        console.error(`Erro ao inserir "${name}":`, e.message);
      }
    }
  }

  console.log(`Pronto: ${created} criados, ${skipped} já existentes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
