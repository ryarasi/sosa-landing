# API Setup Instructions for SOSA Platform

This guide will walk you through setting up the necessary API keys and configurations for the SOSA platform's form submission and email notification system.

## Prerequisites

- Airtable account
- Resend account
- Access to your Netlify deployment settings

## 1. Airtable API Setup

### Step 1: Create Your Airtable Base

1. Log in to [Airtable](https://airtable.com)
2. Click "Add a base" and select "Start from scratch"
3. Name your base "SOSA Waitlist"

### Step 2: Configure Your Table

Create a table called "Signups" with the following fields:

| Field Name | Field Type | Notes |
|------------|------------|-------|
| Name | Single line text | Required |
| Email | Email | Required, primary field |
| Country | Single select | Add country options |
| Reason | Long text | Min 50 characters |
| Status | Single select | Options: Pending, Verified, Invited |
| Submitted At | Created time | Automatic |
| Verified At | Date | When email verified |
| Invite Sent At | Date | When Discord invite sent |

### Step 3: Generate Personal Access Token

Based on your screenshot, you're already on the right page:

1. **Name your token**: Enter "Sosa.live" (as shown in your screenshot)
2. **Add a scope**: Click the "Add a scope" button
3. **Select scopes**: Choose:
   - `data.records:read` - To read existing records
   - `data.records:write` - To create new signups
   - `schema.bases:read` - To read base structure
4. **Add your base**: Click "Add a base" and select your "SOSA Waitlist" base
5. **Create token**: Click the blue "Create token" button
6. **Copy and save**: You'll see your token ONCE - copy it immediately!

### Step 4: Get Your Base ID

1. Go to [Airtable API docs](https://airtable.com/api)
2. Select your "SOSA Waitlist" base
3. Your base ID will be shown in the documentation (starts with "app")
4. It will look like: `appXXXXXXXXXXXXXX`

## 2. Resend API Setup

### Step 1: Create Resend Account

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Your Domain

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter "sosa.live"
4. Add the DNS records shown to your domain provider (Netlify DNS)
5. Wait for verification (usually 5-30 minutes)

### Step 3: Generate API Key

1. Go to "API Keys" in the Resend dashboard
2. Click "Create API Key"
3. Name it "SOSA Production"
4. Select permissions:
   - `sending.emails` - Required for sending emails
5. Copy the API key (starts with `re_`)

### Step 4: Create Email Template

In your Next.js project, you'll create email templates. For now, note these sender options:
- From: `hello@sosa.live` or `noreply@sosa.live`
- Reply-to: `support@sosa.live` (optional)

## 3. Environment Variables Configuration

### Local Development (.env.local)

Create a `.env.local` file in your Next.js project root:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Signups

# Resend Email Service  
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXX
RESEND_FROM_EMAIL=hello@sosa.live

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=SOSA
```

### Netlify Production

1. Go to your Netlify site dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add each variable:
   - Click "Add a variable"
   - Choose "Add a single variable"
   - Enter key and value
   - Keep "Same value for all deploy contexts" selected

Required variables:
```
AIRTABLE_API_KEY = [your personal access token]
AIRTABLE_BASE_ID = [your base ID]
AIRTABLE_TABLE_NAME = Signups
RESEND_API_KEY = [your Resend API key]
RESEND_FROM_EMAIL = hello@sosa.live
NEXT_PUBLIC_SITE_URL = https://sosa.live
NEXT_PUBLIC_SITE_NAME = SOSA
```

## 4. Testing Your Configuration

### Test Airtable Connection

```javascript
// Test script for Airtable
const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// Create test record
base('Signups').create({
  "Name": "Test User",
  "Email": "test@example.com",
  "Country": "US",
  "Reason": "Testing the API connection to ensure everything is working correctly",
  "Status": "Pending"
}, (err, record) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Created record:', record.getId());
});
```

### Test Resend Connection

```javascript
// Test script for Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: 'your-email@example.com',
    subject: 'SOSA Test Email',
    html: '<p>This is a test email from SOSA platform.</p>'
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log('Email sent:', data);
}

sendTestEmail();
```

## 5. Security Best Practices

### API Key Security

1. **Never commit API keys** to version control
2. Add `.env.local` to `.gitignore`
3. Use different API keys for development and production
4. Rotate keys periodically
5. Limit API key permissions to minimum required

### Rate Limiting

Implement rate limiting in your API routes:

```javascript
// Example rate limit configuration
const rateLimit = {
  uniqueTokenPerInterval: 500, // 500 unique users
  interval: 60 * 1000, // Per minute
};
```

### Data Validation

Always validate data before sending to APIs:

```javascript
// Example validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new Error('Invalid email format');
}
```

## 6. Troubleshooting

### Common Airtable Issues

- **401 Unauthorized**: Check your API key is correct
- **404 Not Found**: Verify base ID and table name
- **422 Invalid Request**: Check field names match exactly
- **429 Rate Limited**: Implement backoff strategy

### Common Resend Issues

- **Domain not verified**: Check DNS records are properly set
- **From address not allowed**: Ensure domain is verified
- **Rate limit exceeded**: Free tier has limits, implement queuing

### Debugging Tips

1. Use console.log to check environment variables are loaded
2. Test API connections separately before integrating
3. Check Netlify function logs for production errors
4. Use try-catch blocks for better error handling

## 7. Next Steps

Once your API keys are configured:

1. Create the Next.js API route for form submission
2. Implement Airtable integration
3. Set up email sending with Resend
4. Add error handling and logging
5. Test the complete flow locally
6. Deploy to Netlify and test production

## Need Help?

- Airtable API Docs: https://airtable.com/api
- Resend Docs: https://resend.com/docs
- Netlify Environment Variables: https://docs.netlify.com/environment-variables/

Remember to keep your API keys secure and never share them publicly!