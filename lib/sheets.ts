import type { ContactLead } from "./email";

// POSTs lead JSON to a Google Apps Script webhook deployed in the shared
// agency workspace. The Apps Script appends a row to a spreadsheet. See
// docs/apps-script-contact.md for the deployment script and setup steps.
//
// Failure is non-fatal — a sheet append failing should not block the email
// to Serge. Logged for later replay if needed.

const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL;

export async function appendLeadToSheet(
  lead: ContactLead,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!SHEET_WEBHOOK_URL) return { ok: false, error: "SHEET_WEBHOOK_URL missing" };

  try {
    const res = await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...lead,
        photoUrls: lead.photoUrls.join(", "),
      }),
    });
    if (!res.ok) {
      return { ok: false, error: `sheet webhook ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
