export interface HallOfFameProfile {
  tagline: string;
  details: string[];
  timelineImpact: string;
}

export interface Person {
  nickname: string;
  link: string; // slug used in URLs
  role: string;
  bio: string;
  tag: string;
  img: string;
  hallOfFame?: HallOfFameProfile; // presence indicates HoF inductee
}

export const people: Person[] = [
  {
    nickname: "Matri_X_",
    link: "matri-x",
    role: 'Gründer & ursprünglicher "CEO"',
    bio: "Vom Streamer zum Liga-Owner, kam aus FM und startete das erste 10-Fahrer-Monza-Event, aus dem die MXL entstand.",
    tag: "Gründer",
    img: "/images/Matri_X_.png",
    hallOfFame: {
      tagline: "The Streamer Who Laid the First Lap",
      details: [
        "Streamer-turned-league-owner from FM community",
        "Launched the first 10-driver Monza event that became MXL",
        "Kept the servers running through early challenges",
        "Set the foundation for what would become a premier racing league",
      ],
      timelineImpact:
        "Matri_X_'s influence spans from the founding race in March 2017 through the early community building phase. His transition from active leadership to FM streaming in late 2018 marked a pivotal moment in MXL's evolution.",
    },
  },
  {
    nickname: "Bloodron83",
    link: "bloodron",
    role: "Architekt & Wolf's rechte Hand",
    bio: 'Erfand "MXL," baute die Rennregeln, wurde später zum Joint-Leader nach Wolf\'s Tod.',
    tag: "Architekt",
    img: "/images/Bloodron83.png",
    hallOfFame: {
      tagline: "The Glitch Slayer",
      details: [
        'Coined the name "MXL" for the league',
        "Built the race rules engine and technical infrastructure",
        "Served as Wolfson's right hand during the formative years",
        "Stepped up as joint-leader after Wolf's passing",
        "Known for meticulous attention to competitive fairness",
      ],
      timelineImpact:
        "Bloodron's technical foundation was crucial from the early days through the ProSeries era. His leadership during the post-Wolf transition period and eventual burnout in June 2019 marked another critical juncture in MXL's story.",
    },
  },
  {
    nickname: "Wolfson",
    link: "wolfson",
    role: '"Godfather" der MXL',
    bio: "Veteran der F1-Sim-Liga, führte die ersten Saisons an und setzte die kompetitive DNA der Liga in Bewegung.",
    tag: "Godfather",
    img: "/images/Wolfson.png",
    hallOfFame: {
      tagline: "The Competitive DNA Architect",
      details: [
        "Veteran of F1 simulation racing",
        "Professionalized the league rules and structure",
        "Set the competitive DNA that defined MXL",
        "Led the formative seasons that established MXL's reputation",
        "His legacy continues to echo through sim racing",
      ],
      timelineImpact:
        "Wolfson's era began in June 2017 and reached its peak with the ProSeries announcement in December 2017. His passing in August 2018 created a leadership vacuum that would ultimately shape MXL's future direction.",
    },
  },
  {
    nickname: "edhor",
    link: "edhor",
    role: "Webmaster & Power-User Leader",
    bio: "Als Fahrer gekommen, baute das Ergebnis-Portal, dann führte er die täglichen Operationen und neue Projekte.",
    tag: "Webmaster",
    img: "/images/Edhor1608.png",
    hallOfFame: {
      tagline: "The Digital Architect",
      details: [
        "Joined MXL as a driver in the early days",
        "Built the first MXL results website in July 2017",
        "Took over daily operations and technical infrastructure",
        "Became sole operational head after Bloodron's burnout",
        "Presented the final grand vision for MXL's future",
        "Stepped down in January 2020 as internal rifts grew",
      ],
      timelineImpact:
        "edhor's journey spans from the website launch in July 2017 through the final days. His leadership from July 2019 to January 2020 represented the last attempt to unify the fractured community before MXL's gradual dissolution.",
    },
  },
  {
    nickname: "McGill",
    link: "mcgill",
    role: "Sponsor & Silent Partner",
    bio: "Backed the ProSeries from day one, provided prize support and strategic guidance.",
    tag: "Sponsor",
    img: "/images/McGill.png",
    hallOfFame: {
      tagline: "The Strategic Backer",
      details: [
        "Supported the ProSeries from its inception",
        "Provided crucial prize support and funding",
        "Offered strategic guidance for league development",
        "Maintained a low-profile but essential role",
        "Helped transform MXL from community to professional league",
      ],
      timelineImpact:
        "McGill's support was instrumental in the ProSeries era, beginning with the December 2017 announcement and continuing through the league's professional transformation. His backing helped MXL achieve its peak of 100+ drivers and establish itself as D-A-CH's premier sim-racing league.",
    },
  },
  {
    nickname: "Sasuke4324",
    link: "sasuke4324",
    role: "F1 Deep Diver",
    bio: "F1-Enthusiast, der das Spiel studierte und sein Wissen als Fahrer, Ingenieur und in der Leitung eingebracht hat.",
    tag: "Enthusiast",
    img: "/images/Sasuke.png",
    // no hallOfFame profile → regular driver/member
  },
  {
    nickname: "Yelkajor",
    link: "yelkajor",
    role: "Allrounder",
    bio: "Hat sich überall eingebracht, war in der Leitung aktiv, hat später das Endurance Team geleitet, im Social Media Team gearbeitet und war auch selbst als Fahrer aktiv.",
    tag: "Allrounder",
    img: "/images/Yelkajor.webp",
    // no hallOfFame profile → regular driver/member
  },
  {
    nickname: "Thomahawk_85",
    link: "thomahawk85",
    role: "Ligaleiter",
    bio: "Ligaleiter für die One ins Team gekommen und dann unermüdlich durchgezogen und alle Widrigkeiten überstanden.",
    tag: "Ligaleiter One",
    img: "/images/Thomahawk_85.png",
    // no hallOfFame profile → regular driver/member
  },
];

export const hallOfFamePeople: Person[] = people.filter((p) => !!p.hallOfFame);

export function getPersonByLink(slug: string): Person | undefined {
  return people.find((p) => p.link === slug);
}
