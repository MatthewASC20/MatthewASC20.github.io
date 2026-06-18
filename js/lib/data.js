/* Loads site content from the per-section JSON files in data/. */

const SECTIONS = ["profile", "timeline", "projects", "publications", "skills", "beyond"];

const fetchJson = async (name) => {
  const res = await fetch(`data/${name}.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error(`${name}.json — HTTP ${res.status}`);
  return res.json();
};

/**
 * Fetch all content files in parallel and merge into one data object:
 * { profile, timeline, projects, publications, skills, beyond }
 */
export async function loadData() {
  const [profileData, timeline, projects, publications, skills, beyond] =
    await Promise.all(SECTIONS.map(fetchJson));
  return { ...profileData, timeline, projects, publications, skills, beyond };
}
