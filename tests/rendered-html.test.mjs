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
  assert.match(html, /~1000 uczniów\. Wiele zawodów\. Własna droga\./);
  assert.match(html, /~1000 students\. Many professions\. Personal paths\./);
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

test("renders the professions word field without abbreviations or recruitment metadata", async () => {
  const html = await readPage();
  const professionDataBlocks = [...html.matchAll(/professions:\s*\[[\s\S]*?\n\s*\],\n\s*projectsKicker/g)];

  assert.equal(professionDataBlocks.length, 2);
  assert.match(html, /profession-cloud/);
  assert.match(html, /data-profession-word/);
  assert.match(html, /Array\.from\(\{ length: 204 \}/);
  assert.match(html, /pulseProfessionWords/);
  assert.doesNotMatch(html, /profession-orbit|profession-map|data-profession-card|profession-mark|professions-count/);
  assert.doesNotMatch(html, /\["(?:FR|CU|KU|SP|BL|LA|KE|ST|PI|EL|MB|FO|KR|MT|TA|TF|TH|HD|CO|CK|SA|AS|AP|WA|CA|BA|CF|PH|BP|UP|HT|TR)",/);
  for (const block of professionDataBlocks) {
    assert.doesNotMatch(block[0], /miejsc|places|Technikum nr|Technical School No/);
  }
});
