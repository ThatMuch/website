import express, { Request, Response } from 'express';

import cors from 'cors';
import { getGoogleReviews } from './google-business.service';
import { scrapeCodeurProfile } from './codeur-scraper';

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const CODEUR_PROFILE_URL = process.env.CODEUR_PROFILE_URL || 'https://www.codeur.com/-thatmuch/recommendations';

app.get('/api/reviews', async (req: Request, res: Response) => {
	try {
		const [codeur] = await Promise.all([
			scrapeCodeurProfile(CODEUR_PROFILE_URL),
			//getGoogleReviews()
		]);
		console.log('Codeur reviews:', codeur);
		//console.log('Google reviews:', google);
		res.json({ codeur });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erreur de récupération' });
	}
});

app.listen(PORT, () => {
	console.log(`API running on port ${PORT}`);
});
