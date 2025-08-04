# SEO-Implementierung in Astro (MXL Legacy)

## 1. Globale Site-Metadaten

Lege in `src/data/site.ts` zentrale Metadaten an, die du in allen Seiten nutzt:

```ts
// src/data/site.ts
export const SITE = {
  title: "MXL Legacy – Geschichte der deutschen Sim-Racing-Liga",
  description:
    "Archiv und Tribute-Seite zur MXL Sim-Racing-Liga: Saisons, Highlights & Hall of Fame.",
  url: "https://mxl-legacy.de",
  defaultImage: "/assets/og-cover.jpg",
  language: "de-DE",
};
```

---

## 2. SEO-Component bauen

Erstelle eine wiederverwendbare Komponente, die in jedem Page-Layout genutzt wird:

```astro
---
// src/components/SEO.astro
import { SITE } from "../data/site.ts";

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  canonical?: string;
  author?: string;
  datePublished?: string;       // ISO 8601
  dateModified?: string;        // ISO 8601
  type?: "website" | "article";
}

const {
  title,
  description,
  url,
  image,
  canonical,
  author,
  datePublished,
  dateModified,
  type = "website",
} = Astro.props;
const pageTitle = title
  ? `${title} | ${SITE.title}`
  : SITE.title;
const pageDesc = description ?? SITE.description;
const pageUrl = canonical ?? new URL(Astro.url.pathname, SITE.url).toString();
const pageImage = image ?? SITE.defaultImage;
---

<head>
  <!-- Basic Meta -->
  <title>{pageTitle}</title>
  <meta name="description" content={pageDesc} />
  <meta http-equiv="Content-Language" content={SITE.language} />
  <link rel="canonical" href={pageUrl} />

  <!-- Open Graph -->
  <meta property="og:type" content={type} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDesc} />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:image" content={pageImage} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDesc} />
  <meta name="twitter:image" content={pageImage} />

  <!-- Structured Data: Organization -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.title,
      url: SITE.url,
      logo: new URL(SITE.defaultImage, SITE.url).toString(),
      sameAs: []
    })}
  </script>

  <!-- Article Structured Data (optional) -->
  {type === "article" && datePublished && (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        headline: pageTitle,
        image: [pageImage],
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: author
          ? { "@type": "Person", name: author }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: SITE.title,
          logo: {
            "@type": "ImageObject",
            url: new URL(SITE.defaultImage, SITE.url).toString(),
          },
        },
      })}
    </script>
  )}
</head>
```

---

## 3. Layout integrieren

Binde die `SEO`-Komponente in euer Haupt-Layout ein:

```astro
---
// src/layouts/BaseLayout.astro
import SEO from "../components/SEO.astro";
const { title, description, image, canonical, datePublished, dateModified, author, type } = Astro.props;
---

<html lang="de">
  <SEO
    title={title}
    description={description}
    image={image}
    canonical={canonical}
    datePublished={datePublished}
    dateModified={dateModified}
    author={author}
    type={type}
  />
  <body>
    <slot />
  </body>
</html>
```

**Verwendung in einer Seite**:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
const page = {
  title: "ProSeries Saison 1 – Highlights",
  description: "Rückblick auf die erste ProSeries – Teilnehmer, Siege, Zuschauerrekorde.",
  canonical: "https://mxl-legacy.de/saisons/proseries-1",
  image: "/assets/proseries1-hero.jpg",
  datePublished: "2018-02-15T10:00:00Z",
  dateModified: "2018-06-01T12:00:00Z",
  author: "edhor",
  type: "article",
};
---

<BaseLayout {...page}>
  <h1>{page.title}</h1>
  <!-- Inhalte… -->
</BaseLayout>
```

---

## 4. Sitemap & robots.txt generieren

Nutze das offizielle Astro-Integrationspaket:

```bash
bun add @astrojs/sitemap
```

Dann in `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/drafts/"),
      changefreq: "monthly",
      priority: 0.7,
    }),
  ],
  site: SITE.url,
});
```

Astro erstellt nun automatisch `/sitemap.xml` und `/robots.txt`.

---

## 5. Bild-Optimierung mit @astrojs/image

Für schnelle Ladezeiten und Alt-Texte:

```bash
bun add @astrojs/image
```

In `astro.config.mjs` ergänzen:

```js
import image from "@astrojs/image";

export default defineConfig({
  integrations: [ /* ... */, image() ],
});
```

In deinen Komponenten:

```astro
---
import { AstroImage } from "@astrojs/image/components";
---

<figure>
  <AstroImage
    src="/assets/podium-2010.jpg"
    alt="Siegerpodest MXL Saison 2010"
    widths={[320, 640, 1200]}
    formats={["webp", "jpeg"]}
    loading="lazy"
  />
  <figcaption>Siegerpodest MXL Saison 2010</figcaption>
</figure>
```

---

## 6. Sprach- und Canonical-Tags

Falls irgendwann mehrsprachig:

```astro
<link rel="alternate" hrefLang="de" href={pageUrl} />
<link rel="alternate" hrefLang="en" href={`https://mxl-legacy.de/en${Astro.url.pathname}`} />
<link rel="canonical" href={pageUrl} />
```

Ergänze diese in der `SEO.astro` nach Bedarf.

---

## 7. Interne Verlinkung & Navigation

Baue in eure Navigation und Sidebar **sprechende Links**:

```astro
<nav>
  <ul>
    <li><a href="/" aria-current={Astro.url.pathname === "/"}>Home</a></li>
    <li><a href="/hall-of-fame">Hall of Fame</a></li>
    <li><a href="/geschichte">Geschichte</a></li>
    <li><a href="/saisons">Saisons</a></li>
    <li><a href="/gallery">Galerie</a></li>
    <li><a href="/kontakt">Kontakt</a></li>
  </ul>
</nav>
```

Verwende **Breadcrumbs** ebenfalls als Liste mit schema.org-Markup:

```astro
<ol itemscope itemtype="https://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
    <meta itemprop="position" content="1" />
  </li>
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="/saisons"><span itemprop="name">Saisons</span></a>
    <meta itemprop="position" content="2" />
  </li>
  <!-- ... -->
</ol>
```

---

## 8. Lazy-Loading & Prefetching

Astro lädt standardmäßig keine unnötigen Ressourcen. Für Bilder nutzt du `loading="lazy"`.
Für kritische CSS/JS kannst du `<link rel="preload" as="style" href="/styles.css" />` in deinem Layout ergänzen.

---

## 9. Testing & Deployment

1. **Local Lighthouse Audit**:

   ```bash
   bun add astro preview
   # dann im Browser: Audits > Lighthouse
   ```
2. **Google Search Console**:
    – XML-Sitemap per GSC einreichen
    – Domain-Eigentum bestätigen
3. **Monitoring**:
    – Search Console-Performance
    – PageSpeed Insights (Core Web Vitals)

---

## 📋 Implementation Progress

### ✅ Completed
- [x] Sitemap integration (@astrojs/sitemap already installed)
- [x] Basic Astro configuration with sitemap
- [x] Create `src/data/site.ts` with site metadata
- [x] Create `src/components/SEO.astro` component
- [x] Update `src/layouts/BaseLayout.astro` to use SEO component
- [x] Update all pages to use proper SEO metadata
- [x] Create breadcrumb component with schema.org markup
- [x] Add breadcrumbs to about page as example
- [x] Fix structured data JSON formatting
- [x] Test build and verify sitemap generation
- [x] Add proper Open Graph and Twitter Card meta tags
- [x] Add structured data for Organization and Article types
- [x] Configure proper canonical URLs for all pages

### 🔄 In Progress
- [ ] Add @astrojs/image for image optimization (build issues encountered)
- [ ] Test with Lighthouse
- [ ] Add robots.txt customization if needed

### 📝 TODO
- [ ] Resolve image optimization build issues
- [ ] Update navigation components with proper SEO-friendly links
- [ ] Test with Lighthouse
- [ ] Add robots.txt customization if needed
- [ ] Add more breadcrumbs to other pages
- [ ] Create OG image assets
- [ ] Test social media sharing
- [ ] Add lazy loading for images
- [ ] Optimize Core Web Vitals

### 🐛 Issues Encountered
- Image optimization with @astrojs/image causing build timeouts
- May need to use alternative image optimization approach

---

## 📊 Implementation Summary

### ✅ Successfully Implemented

1. **Site Metadata**: Created `src/data/site.ts` with centralized site configuration
2. **SEO Component**: Built comprehensive `src/components/SEO.astro` with:
   - Basic meta tags (title, description, canonical)
   - Open Graph tags for social media sharing
   - Twitter Card meta tags
   - Structured data for Organization and Article types
   - Proper JSON-LD formatting

3. **Layout Integration**: Updated `src/layouts/BaseLayout.astro` to use the SEO component
4. **Page Updates**: All pages now use proper SEO metadata:
   - Home page: Website type with proper description
   - About page: Article type with publication dates and author
   - Drivers page: Website type with driver-focused description
   - Gallery page: Website type with gallery description
   - Contact page: Website type with contribution-focused description

5. **Sitemap & Robots**: 
   - Sitemap automatically generated with proper URLs
   - Robots.txt created with allow all directive
   - All pages included in sitemap with monthly changefreq

6. **Breadcrumbs**: Created `src/components/Breadcrumbs.astro` with schema.org markup
7. **Structured Data**: Proper JSON-LD implementation for both Organization and Article types

### 🎯 SEO Features Active

- ✅ Meta tags (title, description, canonical)
- ✅ Open Graph tags for social media
- ✅ Twitter Card support
- ✅ Structured data (Organization, Article)
- ✅ XML Sitemap generation
- ✅ Robots.txt
- ✅ Breadcrumb navigation with schema markup
- ✅ Proper language tags (de-DE)
- ✅ Lazy loading for images (already implemented in gallery)

### 📈 Next Steps

1. **Image Optimization**: Resolve build issues with @astrojs/image or use alternative
2. **Lighthouse Testing**: Run performance audits
3. **Social Media Testing**: Verify OG tags work correctly
4. **Search Console**: Submit sitemap to Google Search Console
5. **Core Web Vitals**: Monitor and optimize performance metrics
