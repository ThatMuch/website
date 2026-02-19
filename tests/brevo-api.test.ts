import { test, describe } from 'node:test';
import assert from 'node:assert';
import { sendContactToBrevo, ContactData } from '../src/utils/brevo-api';

describe('sendContactToBrevo', () => {
    const contactData: ContactData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        scores: {
            scoresByCategory: {
                design: 10,
                marketing: 10,
                ux: 10,
                seo: 10,
                performance: 10,
                technique: 10,
                legal: 10
            },
            globalScore: 70
        }
    };
    const listIds = [1, 2, 3];
    const apiKey = 'test-api-key';

    test('should send contact successfully', async (t) => {
        const mockFetch = t.mock.method(global, 'fetch', async (url, options) => {
            assert.strictEqual(url, 'https://api.brevo.com/v3/contacts');
            // @ts-ignore
            assert.strictEqual(options.method, 'POST');

            // Verify body
            // @ts-ignore
            const body = JSON.parse(options.body as string);
            assert.strictEqual(body.email, contactData.email);
            assert.strictEqual(body.attributes.PRENOM, contactData.firstName);
            assert.strictEqual(body.listIds[0], listIds[0]);

            return new Response(JSON.stringify({ id: 123 }), { status: 200, statusText: 'OK' });
        });

        const result = await sendContactToBrevo(contactData, listIds, apiKey);

        assert.deepStrictEqual(result, { id: 123 });
        assert.strictEqual(mockFetch.mock.calls.length, 1);
    });

    test('should throw error on API failure', async (t) => {
        const mockFetch = t.mock.method(global, 'fetch', async () => {
             return new Response(JSON.stringify({ message: 'Error' }), { status: 400, statusText: 'Bad Request' });
        });

        await assert.rejects(
            async () => await sendContactToBrevo(contactData, listIds, apiKey),
            { message: 'Failed to send contact' }
        );

        assert.strictEqual(mockFetch.mock.calls.length, 1);
    });
});
