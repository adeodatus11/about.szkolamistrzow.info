import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const htmlUrl = new URL("../index.html", import.meta.url);

async function readPage() {
  return readFile(htmlUrl, "utf8");
}

test("contains the published ZSZ5 presentation page", async () => {
  const html = await readPage();

  assert.match(html, /<html lang="pl">/);
  assert.match(html, /<title>ZSZ nr 5 we Wrocławiu \| Szkoła Mistrzów<\/title>/);
  assert.match(html, /about\.szkolamistrzow\.info/);
  assert.match(html, /data-lang="pl"/);
  assert.match(html, /data-lang="en"/);
  assert.match(html, /id="professions"/);
  assert.match(html, /professionsTitle: "Od nożyczek po kielnię\."/);
  assert.match(html, /professionsTitle: "From scissors to trowel\."/);
  assert.doesNotMatch(html, /Wiele zawodów\. Własna droga|Many professions\. Personal paths/);
  assert.match(html, /heroTitle:\s*"Vocational School Complex no\.5 Wrocław"/);
  assert.match(html, /heroTitleAbbr:\s*"\(VSCW5\)"/);
  assert.match(html, /finaleTitle:\s*"Chcesz wiedzieć więcej\?"/);
  assert.match(html, /finaleTitle:\s*"Want to know more\?"/);
  assert.match(html, /https:\/\/www\.facebook\.com\/zsz5wro/);
  assert.match(html, /<section id="start" class="slide hero">[\s\S]*?class="hero-lockup"[\s\S]*?class="qr-card reveal"/);
  assert.match(html, /<img class="hero-bg" src="public\/photos\/hero-mural\.webp"/);
  assert.match(html, /<div class="final-brand reveal">[\s\S]*?src="public\/photos\/szkola-mistrzow-lockup\.png"/);
  assert.doesNotMatch(html, /heroTitle:\s*"VSCW5 \(Vocational School Complex no\.5 Wrocław\)"/);
  assert.doesNotMatch(html, /<div class="final-brand reveal">[\s\S]*?src="public\/photos\/orzel-zsz5\.png"/);
  assert.doesNotMatch(html, /Want to see more\?|Admissions/);
  assert.doesNotMatch(html, /adeodatus11\.github\.io/);
});

test("renders the profession explorer without abbreviations or recruitment metadata", async () => {
  const html = await readPage();
  const professionDataBlocks = [...html.matchAll(/professions:\s*\[[\s\S]*?\n\s*\],\n\s*projectsKicker/g)];

  assert.equal(professionDataBlocks.length, 2);
  assert.match(html, /<ol class="prof-explorer reveal" data-render="professions"/);
  assert.match(html, /data-prof-preview/);
  assert.match(html, /function setProfessionFilter\(filter\)/);
  assert.doesNotMatch(html, /profession-cloud|data-profession-word|pulseProfessionWords/);
  assert.doesNotMatch(html, /profession-orbit|profession-map|data-profession-card|profession-mark|professions-count/);
  const detailBlocks = [...html.matchAll(/professionDetails: \[([\s\S]*?)\n\s*\],/g)].map((match) => match[1]);
  assert.equal(detailBlocks.length, 2);
  for (const [index, block] of professionDataBlocks.entries()) {
    const names = [...block[0].matchAll(/\["[^"]+", "(?:craft|tech)"\]/g)].length;
    const details = [...detailBlocks[index].matchAll(/\n\s*\["(?:beauty|food|trade|build|auto|design)", "/g)].length;
    assert.equal(details, names, "every profession has a detail entry");
  }
  assert.doesNotMatch(html, /\["(?:FR|CU|KU|SP|BL|LA|KE|ST|PI|EL|MB|FO|KR|MT|TA|TF|TH|HD|CO|CK|SA|AS|AP|WA|CA|BA|CF|PH|BP|UP|HT|TR)",/);
  for (const block of professionDataBlocks) {
    assert.doesNotMatch(block[0], /miejsc|places|Technikum nr|Technical School No/);
  }
});

test("explains the Polish education system with PRK/EQF and ISCED levels in both languages", async () => {
  const html = await readPage();

  assert.match(html, /<section id="education" class="slide education-slide">/);
  assert.match(html, /<section id="story"[\s\S]*?<section id="education"[\s\S]*?<section id="paths"/);
  assert.match(html, /href="#education"/);
  assert.match(html, /const sectionIds = \["start", "story", "education", "paths"/);
  assert.match(html, /title: "Do 18\. roku życia uczy się każdy\. Drogi są różne\."/);
  assert.match(html, /title: "Everyone in Poland learns until 18\. The routes differ\."/);
  assert.match(html, /<div class="metro reveal" data-render="education"/);
  assert.match(html, /const metroLines = \{/);
  assert.equal([...html.matchAll(/\n\s*short: \{/g)].length, 2);
  assert.doesNotMatch(html, /edu-diagram|edu-card|edu-axis|axisHead/);
  assert.doesNotMatch(html, /"ISCED [0-9–]+ · (?:PRK|PQF) \d"|\((?:PRK|PQF) \d\)/);
  const cardBlocks = [...html.matchAll(/\n\s*cards: \{([\s\S]*?)\n\s*\},/g)].map((match) => match[1]);
  assert.equal(cardBlocks.length, 2);
  for (const key of ["preschool", "primary", "general", "technical", "sectoral1", "sectoral2", "matura", "bachelor", "master", "doctorate"]) {
    for (const block of cardBlocks) assert.match(block, new RegExp(`\\n\\s*${key}: \\["`), key);
  }
});

test("adds the career quiz, route highlighting and vendored GSAP motion", async () => {
  const html = await readPage();

  assert.match(html, /<section id="professions"[\s\S]*?<section id="quiz" class="slide quiz-slide">[\s\S]*?<section id="projects"/);
  assert.match(html, /href="#quiz"/);
  assert.match(html, /"professions", "quiz", "projects"/);
  assert.match(html, /title: "Jaki zawód do Ciebie pasuje\?"/);
  assert.match(html, /title: "Which profession suits you\?"/);
  assert.equal([...html.matchAll(/\n\s*families: \{/g)].length, 2);
  assert.match(html, /data-render="educationRoutes"/);
  assert.match(html, /data-routes="\$\{station\.routes\}"/);
  assert.match(html, /<script src="public\/vendor\/gsap\/gsap\.min\.js"><\/script>\s*<script src="public\/vendor\/gsap\/ScrollTrigger\.min\.js"><\/script>/);
  assert.match(html, /const motionEnabled = \(\) => Boolean\(window\.gsap && window\.ScrollTrigger && window\.ScrambleTextPlugin\) && !reducedMotion\.matches;/);

  for (const [file, name] of [["gsap.min.js", "GSAP"], ["ScrollTrigger.min.js", "ScrollTrigger"]]) {
    const vendor = await readFile(new URL(`../public/vendor/gsap/${file}`, import.meta.url), "utf8");
    assert.ok(vendor.startsWith(`/*!\n * ${name} 3.13.0\n`), file);
    assert.match(vendor.slice(0, 300), /gsap\.com\/standard-license/);
  }
});

test("hides the QR code on phones and adds the kinetic hero, marquee and motion libraries", async () => {
  const html = await readPage();

  assert.match(html, /@media \(max-width: 760px\) \{\s*\.hero \.qr-card,\s*\.scroll-cue \{\s*display: none;/);
  assert.match(html, /data-hero-rotator/);
  assert.match(html, /<a class="btn primary" href="#quiz" data-i18n="heroCtaQuiz">/);
  assert.equal([...html.matchAll(/\n\s*heroWords: \[/g)].length, 2);
  assert.equal([...html.matchAll(/\n\s*heroStats: \[/g)].length, 2);
  assert.match(html, /<\/section>\s*<div class="marquee-band" data-render="marquee" aria-hidden="true"><\/div>\s*<section id="story"/);
  assert.match(html, /<script src="public\/vendor\/gsap\/ScrambleTextPlugin\.min\.js"><\/script>\s*<script src="public\/vendor\/gsap\/Flip\.min\.js"><\/script>\s*<script src="public\/vendor\/lenis\/lenis\.min\.js"><\/script>/);
  assert.match(html, /motionMedia\.add\("\(min-width: 901px\)"/);
  assert.match(html, /function setupAurora\(\)/);

  const lenis = await readFile(new URL("../public/vendor/lenis/lenis.min.js", import.meta.url), "utf8");
  assert.match(lenis, /^var t="1\.3\.19"/);
  assert.match(lenis, /globalThis\.Lenis=Lenis/);
  assert.doesNotMatch(lenis, /sourceMappingURL/);
  const license = await readFile(new URL("../public/vendor/lenis/LICENSE", import.meta.url), "utf8");
  assert.match(license, /MIT License/);
});
