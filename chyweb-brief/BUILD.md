# Build Chyweb’s spa offer page

Act as a conversion copywriter, designer and frontend engineer working inside the existing Chyweb agency repository. Create one evergreen landing page for owners and managers of Nigerian spas and wellness centres at `/spa-bookings`. The primary action is a genuine WhatsApp request for a free Google Maps audit. The secondary action lets owners experience the standalone Nera Spa website.

## Fit the existing agency project

Inspect the current routes, design tokens, typography, buttons, contact links, metadata and analytics before editing. Follow the project’s framework and reuse its Chyweb branding. Keep the campaign header focused, with the Chyweb mark and one audit action. Scope bespoke styles to this page. Use OFFER.md for the commercial terms and core copy.

The first screen must answer three questions. Who is this for? What will Chyweb set up? How can the owner see it working? An owner arriving from a Chyweb ad should be able to request the audit immediately or explore Nera and return.

## Section order and copy direction

| Section | What to build |
| --- | --- |
| Hero | Use the eyebrow “For spa and wellness centre owners”. Headline “Help nearby clients find your spa and book on WhatsApp.” Use a short supporting sentence from OFFER.md. Show **Get my free Google Maps audit** as the primary button and **Explore the spa website** as the secondary action. Add a visible line reading “₦350,000 one-time setup · ₦200,000 to start.” |
| Working example | Headline “Try the website your guests could book from.” Show the finished Nera homepage on desktop and mobile. Use actual captures supplied after its build. Label it “Nera Spa · fictional concept by Chyweb”. Ask the owner to choose a treatment, see the total and try the WhatsApp enquiry. The CTA opens the standalone Nera homepage in a new tab and keeps this page available. Use a real preview link for staging until the public URL is configured. |
| Booking journey | Use the captioned 30-second Chyweb clip in `assets/chyweb-guest-journey.mp4` with its matching poster and tap-to-play controls. Label it “From a Google search to a spa visit · illustrated example”. A short example chat from OFFER.md shows how reception can confirm an enquiry. Use the separate 15-second “Step inside Nera” video as a sample guest-facing ad under the campaign deliverables if it fits the layout. |
| What Chyweb sets up | Group the five deliverables into a readable list. Explain the role each plays in a booking. The website, Google profile/local treatment pages and review link help guests find the spa. The two videos and local Meta campaign introduce the offer. The WhatsApp replies and tracker help reception handle enquiries through attendance. |
| Price and handover | Show ₦350,000 total, ₦200,000 to start, ₦150,000 after the agreed checks pass. Explain the phone test and Chyweb’s commitment to fix failed setup checks. Make separate Meta spend and itemised domain/hosting costs visible. Keep the guarantee specific to the working setup. |
| Free audit, id `audit` | Request just the spa name and neighbourhood in the first WhatsApp message. Tell the owner they receive a screenshot and the first improvement Chyweb would make. Repeat the same primary CTA. Keep optional service questions in the copy below it. |

## Links and measurement

Use the agency’s existing verified sales WhatsApp destination if it is suitable for spa-owner enquiries. Prefill “Hi Chyweb, I’d like the free Google Maps audit. My spa name is __ and my neighbourhood is __.” Reuse the website’s existing link helper where appropriate. In a preview without configured sales contact, anchor to a clearly labelled contact setup note or the agency’s working contact page. Identify the missing sales number explicitly before real outreach. Keep the sample spa’s reception and the agency’s sales contact separate.

Use the supplied public Nera URL in one config setting. Host Nera separately. On the Chyweb page, use real website captures linked to the full experience. If the captures are pending, use the supplied video poster as a labelled temporary creative preview and list the two missing screenshots for handover.

Where an analytics integration already exists, add `spa_demo_open` to taps into Nera and `spa_audit_whatsapp_click` to actual outbound taps to Chyweb’s audit chat. Record received audit enquiries separately in the agency inbox or lead tracker. Demo bookings are sample interactions. Preserve existing tracking conventions and exclude names, phone numbers and message contents from analytics events.

## Finish and verify

Run the existing checks and production build. Confirm that the new route opens directly and that the rest of the existing site still navigates normally. On desktop and a 390 px phone view, check the pricing, the preview images and both CTAs. Check the owner can explore the public Nera demo without sign-in, return to `/spa-bookings#audit` and open the correct agency chat. Provide the preview and name any real URL or sales contact still requiring configuration. Keep the page evergreen and present Nera as a portfolio demonstration.
