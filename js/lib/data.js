/* Loads site content from the per-section JSON files in data/. */

const SECTIONS = ["timeline", "projects", "publications", "skills", "beyond"];

const fetchJson = async (name) => {
  const res = await fetch(`data/${name}.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error(`${name}.json — HTTP ${res.status}`);
  return res.json();
};

/**
 * Fetch all content files in parallel and merge into one data object:
 * { profile, timeline, projects, publications, skills, beyond }
 * (profile.json wraps its content in { profile } — spread as-is; the
 * others are keyed by file name, so order can never silently mismatch.)
 */
export async function loadData() {
  const [profileData, entries] = await Promise.all([
    fetchJson("profile"),
    Promise.all(SECTIONS.map(async (name) => [name, await fetchJson(name)])),
  ]);
  return { ...profileData, ...Object.fromEntries(entries) };
}
