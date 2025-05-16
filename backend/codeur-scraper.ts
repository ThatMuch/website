import * as cheerio from 'cheerio';

import axios from 'axios';
import puppeteer from 'puppeteer';

export interface CodeurRecommendation {
	author: string;
	content: string;
	date: string;
	rating: number;
}

// export const scrapeCodeurProfile = async (profileUrl: string): Promise<CodeurRecommendation[]> => {
// 	const { data } = await axios.get(profileUrl);
// 	const $ = cheerio.load(data);

// 	return $('.user_recommendation').map((index, el) => ({
// 		author: $(el).find('.author-name').text().trim(),
// 		content: $(el).find('.subcard-content p').text().trim(),
// 		date: $(el).find('.recommendation-date').text().trim(),
// 		rating: $(el).find('.subcard-subtitle .inline-flex').first().children('.relative').children('.item-center').hasClass('opacity-20') ?
// 			$(el).find('.subcard-subtitle .inline-flex').first().children('.relative').length - 1 : $(el).find('.subcard-subtitle .inline-flex').first().children('.relative').length

// 	})).get();
// };


export const scrapeCodeurProfile = async (profileUrl: string) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(profileUrl, { waitUntil: 'networkidle0' });
	await autoScroll(page);

	const reviews = await page.$$eval('.user_recommendation', (elements) =>
		elements.map(el => ({
			author: el.querySelector('.author-name')?.textContent?.trim() || '',
			content: el.querySelector('.subcard-content p')?.textContent?.trim() || '',
			date: el.querySelector('.recommendation-date')?.textContent?.trim() || '',
			rating: el.querySelectorAll('.subcard-subtitle .relative:not(.opacity-20)').length
		}))
	);

	await browser.close();
	return reviews;
};



// Fonction pour simuler le défilement
async function autoScroll(page: any) {
	await page.evaluate(async () => {
		await new Promise<void>((resolve) => {
			let totalHeight = 0;
			const distance = 100;
			const timer = setInterval(() => {
				const scrollHeight = document.documentElement.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}
