from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        print("Navigating to page...")
        page.goto("http://localhost:9000/analyse-refonte-site-web/refonte-form/")

        print("Waiting for contact form...")
        # Check for something unique in the form, e.g., "Analyse terminée !" or "Recevez votre résulat par mail"
        page.wait_for_selector(".ContactFormRefonte")

        print("Taking screenshot...")
        page.screenshot(path="verification_contact_form.png", full_page=True)
        print("Screenshot saved to verification_contact_form.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
