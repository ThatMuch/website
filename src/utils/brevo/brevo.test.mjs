import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { addContact } from './brevo.js';

describe('addContact', () => {
  let originalUrl, originalKey;

  beforeEach(() => {
    originalUrl = process.env.BREVO_URL;
    originalKey = process.env.BREVO_API_KEY;
    process.env.BREVO_URL = 'https://api.brevo.com/v3/contacts';
    process.env.BREVO_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    process.env.BREVO_URL = originalUrl;
    process.env.BREVO_API_KEY = originalKey;
    mock.restoreAll();
  });

  test('should call fetch with correct URL and headers', async (t) => {
    const mockFetch = t.mock.method(global, 'fetch', async () => {
      return new Response(JSON.stringify({ id: 1 }), { status: 201 });
    });

    const nom = 'Doe';
    const prenom = 'John';
    const email = 'john.doe@example.com';

    await addContact(nom, prenom, email);

    assert.equal(mockFetch.mock.calls.length, 1);
    const [url, options] = mockFetch.mock.calls[0].arguments;

    assert.equal(url, 'https://api.brevo.com/v3/contacts');
    assert.equal(options.method, 'POST');
    assert.deepEqual(options.headers, {
      'api-key': 'test-api-key',
      'Content-Type': 'application/json'
    });

    const body = JSON.parse(options.body);
    assert.equal(body.email, email);
    assert.equal(body.attributes.NOM, nom);
    assert.equal(body.attributes.PRENOM, prenom);
    assert.equal(body.attributes.DESIGN, 12);
    assert.equal(body.attributes.MARKETING, 7);
    assert.equal(body.attributes.UX, 13);
    assert.equal(body.attributes.SEO, 6);
    assert.equal(body.attributes.PERFORMANCE, 10);
    assert.equal(body.attributes.TECH, 9);
    assert.equal(body.attributes.LEGAL, 17);
    assert.equal(body.attributes.TOTAL, 50);
    assert.equal(body.listIds[0], 6);
    assert.equal(body.updateEnabled, true);
  });

  test('should handle API failure', async (t) => {
    const mockFetch = t.mock.method(global, 'fetch', async () => {
       return new Response(JSON.stringify({ error: 'Failed' }), { status: 400 });
    });

    const response = await addContact('Doe', 'John', 'fail@example.com');
    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.error, 'Failed');
  });
});
