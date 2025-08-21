# Technical Architecture

This document details the technical implementation for SOSA's email verification and Discord access system, combining Google Forms, Google Apps Script, and Make (Integromat) for a cost-effective, scalable solution.

## 🏗️ System Overview

The architecture implements a secure, automated workflow for member onboarding:

1. **User Registration** → Google Forms (embedded)
2. **Email Verification** → Google Apps Script
3. **Discord Invite Generation** → Make webhook + Discord API
4. **Access Delivery** → Automated email with single-use invite

## 📊 Architecture Diagram

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Landing   │────▶│ Google Forms │────▶│ Apps Script │────▶│    Make      │
│    Page     │     │  (Embedded)  │     │ (Processor) │     │ (Integromat) │
└─────────────┘     └──────────────┘     └─────────────┘     └──────┬───────┘
                                                                      │
                    ┌──────────────┐     ┌─────────────┐            │
                    │ Verification │◀────│    Gmail    │◀────────────┘
                    │    Email     │     │   (SMTP)    │
                    └──────┬───────┘     └─────────────┘
                           │
                    ┌──────▼───────┐     ┌─────────────┐     ┌──────────────┐
                    │ Verify Link  │────▶│ Apps Script │────▶│  Discord API │
                    │   Clicked    │     │  (Verify)   │     │   (Invite)   │
                    └──────────────┘     └─────────────┘     └──────────────┘
```

## 🔧 Component Details

### 1. Google Forms Integration

#### Form Configuration

```javascript
// Google Form Entry IDs (example)
const FORM_CONFIG = {
  formId: 'YOUR_GOOGLE_FORM_ID',
  entries: {
    name: 'entry.123456789',
    email: 'entry.987654321',
    country: 'entry.456789123',
    reason: 'entry.789123456'
  }
};
```

#### Embedded Form Styling

```html
<!-- Custom styled Google Form -->
<form class="waitlist-form" id="googleForm">
  <input type="hidden" name="formId" value="YOUR_FORM_ID">
  <!-- Custom inputs that map to Google Form entries -->
</form>

<script>
// Submit to Google Forms
async function submitToGoogleForm(data) {
  const formData = new FormData();
  Object.keys(FORM_CONFIG.entries).forEach(key => {
    formData.append(FORM_CONFIG.entries[key], data[key]);
  });
  
  const response = await fetch(
    `https://docs.google.com/forms/d/e/${FORM_CONFIG.formId}/formResponse`,
    {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }
  );
}
</script>
```

### 2. Google Apps Script Setup

#### Script Configuration

Create a new Google Apps Script project linked to your form:

```javascript
// Configuration
const CONFIG = {
  makeWebhookUrl: 'YOUR_MAKE_WEBHOOK_URL',
  verificationBaseUrl: 'https://sosa.live/verify',
  emailTemplate: {
    subject: 'Verify your SOSA membership',
    fromName: 'Society of Societal Architects'
  },
  tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
  rateLimit: {
    maxRequests: 5,
    windowMinutes: 60
  }
};

// Token storage using Script Properties
const tokenStore = PropertiesService.getScriptProperties();
```

#### Form Submission Handler

```javascript
function onFormSubmit(e) {
  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();
    
    // Extract form data
    const formData = {
      name: '',
      email: '',
      country: '',
      reason: '',
      timestamp: new Date().toISOString()
    };
    
    itemResponses.forEach(itemResponse => {
      const title = itemResponse.getItem().getTitle().toLowerCase();
      const answer = itemResponse.getResponse();
      
      if (title.includes('name')) formData.name = answer;
      else if (title.includes('email')) formData.email = answer;
      else if (title.includes('country')) formData.country = answer;
      else if (title.includes('reason')) formData.reason = answer;
    });
    
    // Rate limiting check
    if (!checkRateLimit(formData.email)) {
      console.log('Rate limit exceeded for:', formData.email);
      return;
    }
    
    // Generate verification token
    const token = generateVerificationToken();
    
    // Store token with user data
    tokenStore.setProperty(token, JSON.stringify({
      ...formData,
      expiresAt: Date.now() + CONFIG.tokenExpiry
    }));
    
    // Send verification email
    sendVerificationEmail(formData.email, formData.name, token);
    
  } catch (error) {
    console.error('Form submission error:', error);
  }
}
```

#### Verification Email Sender

```javascript
function sendVerificationEmail(email, name, token) {
  const verificationUrl = `${CONFIG.verificationBaseUrl}?token=${token}`;
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0A0A0A; color: white; padding: 30px; text-align: center; }
        .content { background: #f5f5f5; padding: 30px; }
        .button { 
          display: inline-block; 
          padding: 15px 30px; 
          background: #00D4FF; 
          color: #0A0A0A; 
          text-decoration: none; 
          border-radius: 8px;
          font-weight: 600;
        }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SOSA</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thank you for your interest in joining the Society of Societal Architects.</p>
          <p>Please verify your email address to complete your application:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>Society of Societal Architects<br>
          Building tomorrow through collective intelligence</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: CONFIG.emailTemplate.subject,
    htmlBody: htmlBody,
    name: CONFIG.emailTemplate.fromName
  });
}
```

#### Verification Handler

```javascript
function doGet(e) {
  const token = e.parameter.token;
  
  if (!token) {
    return HtmlService.createHtmlOutput('Invalid verification link');
  }
  
  const storedData = tokenStore.getProperty(token);
  if (!storedData) {
    return HtmlService.createHtmlOutput('Verification link expired or invalid');
  }
  
  const userData = JSON.parse(storedData);
  
  // Check expiry
  if (Date.now() > userData.expiresAt) {
    tokenStore.deleteProperty(token);
    return HtmlService.createHtmlOutput('Verification link expired');
  }
  
  // Call Make webhook to generate Discord invite
  const makeResponse = UrlFetchApp.fetch(CONFIG.makeWebhookUrl, {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify({
      email: userData.email,
      name: userData.name,
      country: userData.country,
      reason: userData.reason,
      verifiedAt: new Date().toISOString()
    })
  });
  
  // Clean up token
  tokenStore.deleteProperty(token);
  
  // Return success page
  return HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
          background: #0A0A0A;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
        }
        .success {
          text-align: center;
          padding: 40px;
        }
        h1 { color: #00FF88; }
        p { color: #B3B3B3; }
      </style>
    </head>
    <body>
      <div class="success">
        <h1>Email Verified!</h1>
        <p>Check your email for your Discord invite link.</p>
        <p>Welcome to SOSA!</p>
      </div>
    </body>
    </html>
  `);
}
```

### 3. Make (Integromat) Configuration

#### Webhook Setup

1. Create a new scenario in Make
2. Add a "Webhooks" module as the trigger
3. Copy the webhook URL to your Apps Script CONFIG

#### Workflow Modules

```json
{
  "modules": [
    {
      "name": "Webhook Trigger",
      "type": "webhook",
      "configuration": {
        "dataStructure": {
          "email": "string",
          "name": "string",
          "country": "string",
          "reason": "string",
          "verifiedAt": "string"
        }
      }
    },
    {
      "name": "Discord Create Invite",
      "type": "discord.createInvite",
      "configuration": {
        "connection": "YOUR_DISCORD_CONNECTION",
        "channelId": "YOUR_WELCOME_CHANNEL_ID",
        "maxAge": 259200, // 3 days
        "maxUses": 1,
        "unique": true,
        "temporary": false
      }
    },
    {
      "name": "Send Discord Invite Email",
      "type": "email",
      "configuration": {
        "to": "{{1.email}}",
        "subject": "Your SOSA Discord Invite",
        "content": "Hi {{1.name}},\n\nYour exclusive Discord invite: {{2.url}}\n\nThis is a single-use invite that expires in 3 days.\n\nSee you in the community!",
        "contentType": "text"
      }
    },
    {
      "name": "Log to Google Sheets",
      "type": "google-sheets.addRow",
      "configuration": {
        "spreadsheetId": "YOUR_MEMBERS_SHEET_ID",
        "sheetName": "Verified Members",
        "values": {
          "A": "{{1.email}}",
          "B": "{{1.name}}",
          "C": "{{1.country}}",
          "D": "{{1.reason}}",
          "E": "{{1.verifiedAt}}",
          "F": "{{2.url}}"
        }
      }
    }
  ]
}
```

### 4. Security Implementation

#### Rate Limiting

```javascript
function checkRateLimit(email) {
  const rateLimitKey = `rateLimit_${email}`;
  const attempts = JSON.parse(tokenStore.getProperty(rateLimitKey) || '[]');
  
  const now = Date.now();
  const windowStart = now - (CONFIG.rateLimit.windowMinutes * 60 * 1000);
  
  // Filter attempts within window
  const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);
  
  if (recentAttempts.length >= CONFIG.rateLimit.maxRequests) {
    return false;
  }
  
  // Add new attempt
  recentAttempts.push(now);
  tokenStore.setProperty(rateLimitKey, JSON.stringify(recentAttempts));
  
  return true;
}
```

#### Token Generation

```javascript
function generateVerificationToken() {
  const array = new Uint8Array(32);
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  return Utilities.base64EncodeWebSafe(array);
}
```

#### Input Validation

```javascript
function validateFormData(data) {
  const errors = [];
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push('Invalid email address');
  }
  
  // Name validation
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  // Reason validation
  if (!data.reason || data.reason.length < 50) {
    errors.push('Reason must be at least 50 characters');
  }
  
  return errors;
}
```

## 💰 Cost Analysis

### Free Tier Limits

1. **Google Apps Script**
   - 100 email sends/day (consumer)
   - 1,500 email sends/day (Workspace)
   - 20,000 URL fetches/day
   - 6 hours total runtime/day

2. **Make (Integromat)**
   - 1,000 operations/month (free)
   - 100MB data transfer
   - 15-minute execution time

3. **Discord API**
   - No hard limits on invite creation
   - Rate limits: 50 requests/second

### Paid Scaling

For higher volume:
- Google Workspace: $6/user/month
- Make Pro: $9/month (10,000 operations)
- Total: ~$15-20/month for moderate usage

## 🚀 Deployment Guide

### Step 1: Google Form Setup

1. Create a new Google Form
2. Add required fields (Name, Email, Country, Reason)
3. Note the form ID and entry IDs

### Step 2: Apps Script Deployment

1. Open Google Apps Script
2. Create new project
3. Copy the provided scripts
4. Update configuration values
5. Set up triggers:
   ```javascript
   // In Script Editor: Edit > Current project's triggers
   // Add trigger: onFormSubmit, From form, On form submit
   ```
6. Deploy as web app:
   - Execute as: Me
   - Who has access: Anyone

### Step 3: Make Scenario Setup

1. Create Make account
2. Create new scenario
3. Add webhook trigger
4. Connect Discord account
5. Configure email sender
6. Test the workflow

### Step 4: Landing Page Integration

1. Update form entry IDs in HTML
2. Add form submission handler
3. Test end-to-end flow

## 🔍 Monitoring & Analytics

### Tracking Metrics

```javascript
// Add to Apps Script
function logMetrics(event, data) {
  const sheet = SpreadsheetApp.openById('YOUR_METRICS_SHEET_ID');
  const metricsSheet = sheet.getSheetByName('Metrics');
  
  metricsSheet.appendRow([
    new Date(),
    event,
    data.email || '',
    data.country || '',
    data.success || false,
    data.error || ''
  ]);
}
```

### Key Metrics to Monitor

1. **Conversion Funnel**
   - Form views
   - Form submissions
   - Email verifications
   - Discord joins

2. **Performance Metrics**
   - Email delivery rate
   - Verification completion rate
   - Time to verify
   - Discord invite usage

3. **Error Tracking**
   - Failed submissions
   - Expired tokens
   - Rate limit hits
   - API errors

## 🛠️ Troubleshooting

### Common Issues

1. **Form submission not triggering**
   - Check trigger configuration
   - Verify form permissions
   - Review Apps Script logs

2. **Emails not sending**
   - Check daily quota
   - Verify email permissions
   - Test with MailApp directly

3. **Make webhook not firing**
   - Verify webhook URL
   - Check Make scenario status
   - Test with manual POST

4. **Discord invites failing**
   - Verify bot permissions
   - Check channel access
   - Review API rate limits

### Debug Mode

```javascript
const DEBUG = true; // Set to false in production

function debugLog(message, data) {
  if (DEBUG) {
    console.log(`[SOSA Debug] ${message}`, data);
    // Also log to sheet for remote debugging
    logDebug(message, data);
  }
}
```

## 📋 Maintenance Checklist

- [ ] Weekly: Check error logs
- [ ] Weekly: Review conversion metrics
- [ ] Monthly: Clean up expired tokens
- [ ] Monthly: Update rate limit rules
- [ ] Quarterly: Review and optimize workflow
- [ ] Quarterly: Update documentation