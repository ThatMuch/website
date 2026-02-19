const assert = require("assert");
const {
  formatBrevoContactData,
  sendBrevoContact,
} = require("../src/utils/brevo-api.js");

const runTests = async () => {
  // Mock Data
  const contactData = {
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
    scores: {
      scoresByCategory: {
        design: 10,
        marketing: 20,
        ux: 30,
        seo: 40,
        performance: 50,
        technique: 60,
        legal: 70,
      },
      globalScore: 100,
    },
  };
  const listIds = [1, 2, 3];
  const apikey = "test-api-key";

  // Test 1: formatBrevoContactData
  console.log("Running Test 1: formatBrevoContactData...");
  const formatted = formatBrevoContactData(contactData, listIds);

  assert.strictEqual(formatted.email, contactData.email);
  assert.strictEqual(formatted.attributes.PRENOM, contactData.firstName);
  assert.strictEqual(formatted.attributes.NOM, contactData.lastName);
  assert.strictEqual(formatted.attributes.DESIGN, 10);
  assert.strictEqual(formatted.attributes.MARKETING, 20);
  assert.strictEqual(formatted.attributes.UX, 30);
  assert.strictEqual(formatted.attributes.SEO, 40);
  assert.strictEqual(formatted.attributes.PERFORMANCE, 50);
  assert.strictEqual(formatted.attributes.TECH, 60);
  assert.strictEqual(formatted.attributes.LEGAL, 70);
  assert.strictEqual(formatted.attributes.TOTAL, 100);
  assert.deepStrictEqual(formatted.listIds, listIds);
  assert.strictEqual(formatted.updateEnabled, true);
  console.log("Test 1 Passed!");

  // Test 2: sendBrevoContact Success
  console.log("Running Test 2: sendBrevoContact Success...");
  let fetchCalled = false;
  global.fetch = async (url, options) => {
    fetchCalled = true;
    assert.strictEqual(url, "https://api.brevo.com/v3/contacts");
    assert.strictEqual(options.method, "POST");
    assert.strictEqual(options.headers["Content-Type"], "application/json");
    assert.strictEqual(options.headers["api-key"], apikey);

    const body = JSON.parse(options.body);
    assert.strictEqual(body.email, contactData.email);

    return {
      ok: true,
      json: async () => ({ id: 123 }),
    };
  };

  const response = await sendBrevoContact(apikey, formatted);
  assert.strictEqual(response.id, 123);
  assert.strictEqual(fetchCalled, true);
  console.log("Test 2 Passed!");

  // Test 3: sendBrevoContact Failure
  console.log("Running Test 3: sendBrevoContact Failure...");
  global.fetch = async () => {
    return {
      ok: false,
    };
  };

  try {
    await sendBrevoContact(apikey, formatted);
    assert.fail("Should have thrown an error");
  } catch (err) {
    assert.strictEqual(err.message, "Failed to send contact");
    console.log("Test 3 Passed!");
  }
};

runTests().catch((err) => {
  console.error("Test Failed:", err);
  process.exit(1);
});
