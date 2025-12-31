import { languageTag } from '$lib/paraglide/runtime';
import projectsEn from './projects';
import projectsTr from './projects-tr';
import skillsEn from './skills';
import skillsTr from './skills-tr';

/**
 * Get projects based on current language
 */
export function getProjects(): Project[] {
	const lang = languageTag();

	if (lang === 'tr') {
		return projectsTr;
	}

	return projectsEn;
}

/**
 * Get skills based on current language
 */
export function getSkills(): Skill[] {
	const lang = languageTag();

	if (lang === 'tr') {
		return skillsTr;
	}

	return skillsEn;
}

// Re-export tools and socials for convenience
export { tools } from './projects';
export { socials } from './contact';
