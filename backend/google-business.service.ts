import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';

const accountId = process.env.GOOGLE_ACCOUNT_ID;
const locationId = process.env.GOOGLE_LOCATION_ID;

// Scope requis pour l'API Google My Business
const SCOPE = 'https://www.googleapis.com/auth/business.manage';
// Fonction pour obtenir un token d'accès OAuth2 avec le compte de service
export async function getAccessToken(): Promise<string> {
	const auth = new GoogleAuth({
		scopes: [SCOPE],
		keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
	});
	const client = await auth.getClient();
	const { token } = await client.getAccessToken();
	if (!token) throw new Error('Impossible de récupérer le token d’accès Google');
	return token;
}

// Fonction pour récupérer les avis Google My Business
export async function getGoogleReviews(): Promise<any> {
	const token = await getAccessToken();

	// Récupérer tous les établissements du compte
	const locationsUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations`;
	const locationsRes = await axios.get(locationsUrl, {
		headers: { Authorization: `Bearer ${token}` }
	});
	const locations = locationsRes.data.locations || [];

	// Si un locationId est défini, on ne prend que celui-ci
	const locationsToFetch = locationId
		? locations.filter((loc: any) => loc.name.endsWith(locationId))
		: locations;

	// Récupérer les avis pour chaque établissement
	const reviews = [];
	for (const loc of locationsToFetch) {
		const locId = loc.name.split('/').pop();
		const reviewsUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locId}/reviews`;
		const res = await axios.get(reviewsUrl, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (res.data.reviews) {
			reviews.push(...res.data.reviews);
		}
	}
	return reviews;
}
