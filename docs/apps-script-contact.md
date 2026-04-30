# Contact form → Google Sheet (Apps Script webhook)

The contact form posts each submission to two destinations: an email to Serge (via Resend) and an Apps Script webhook that appends a row to a Google Sheet in the shared agency workspace. This doc covers the Apps Script side.

## One-time setup

1. In the shared agency workspace, create a Google Sheet titled `SP Automotive — Leads`.
2. In row 1, add headers (one per cell, A → H):

   `timestamp · name · phone · email · vehicle · description · photoUrls`

3. From the sheet, open **Extensions → Apps Script**. Paste the script from below.
4. Click **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Copy the resulting Web app URL. Paste it into Vercel env as `SHEET_WEBHOOK_URL` for both Production and Preview.

## Apps Script

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.vehicle || "",
    data.description || "",
    data.photoUrls || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Re-deploying after a change

Edit the script, then **Deploy → Manage deployments → ✏ → New version → Deploy**. The URL stays the same.

## Verification

After deploy, run from a terminal:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"timestamp":"2026-01-01T00:00:00Z","name":"Test","phone":"941","email":"t@t","vehicle":"Test","description":"Test","photoUrls":""}' \
  "$SHEET_WEBHOOK_URL"
```

Expected: a new row in the sheet and `{"ok":true}` returned.
