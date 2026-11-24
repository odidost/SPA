# Chyweb and Nera Spa in Antigravity

Build the spa first. A spa owner should be able to open the finished design on their phone, pick a treatment and experience a sample booking. Then build the Chyweb page around that experience.

| Workspace | Proposed address | Whose decision the page serves |
| --- | --- | --- |
| New standalone project `nera-spa` | `nera.<your-agency-domain>` | A spa guest chooses a treatment and asks reception for a time. |
| Existing Chyweb project | `/spa-bookings` on the agency domain | A spa owner views the work and requests a free Google Maps audit from Chyweb. |

## 1. Build the standalone spa

Create a folder called `nera-spa`. Copy the entire `nera-brief` folder into it, then open `nera-spa` as an Antigravity project. Paste this instruction.

> Read nera-brief/BUILD.md and nera-brief/MENU.md. Build the complete Nera Spa website in this workspace using the supplied photos and wordmark. Run it, test the mobile booking journey, and show me the homepage and one treatment page at phone and desktop sizes.

After review, deploy the standalone site to its own hosting project. Point the chosen spa subdomain to that project. Set its Chyweb return link to the planned agency offer URL. Capture the finished website at mobile and desktop sizes. Copy the two preview images into `chyweb-brief/assets/` as `nera-mobile.webp` and `nera-desktop.webp`. The files should show the actual built site.

## 2. Build the Chyweb offer page

Copy the entire `chyweb-brief` folder into your existing agency repository. Open that repository in Antigravity. Paste this instruction, replacing the bracketed URL.

> Read chyweb-brief/BUILD.md and chyweb-brief/OFFER.md. Build /spa-bookings in this existing Chyweb project using its current stack and branding. Use [PUBLIC NERA URL] for the demo and the agency’s verified sales WhatsApp contact for audits. Run the build, check both buttons on mobile, and show me the finished page.

## 3. Test it as a prospect

1. Open the Chyweb offer in a signed-out mobile browser. Check that the setup price, payment split and audit button are easy to find.
2. Tap **Explore the spa website**. The public Nera site should open directly. Pick a Botanical Facial. The sample enquiry should already say “Botanical Facial”. Try the couples massage and confirm the price is ₦60,000 for both guests.
3. Complete one simulated booking. Tap **I want this for my spa**. It should return to the Chyweb audit section.
4. Tap **Get my free Google Maps audit**. Check the recipient is Chyweb’s sales number and the draft asks for the spa name and neighbourhood. Check the mobile layout with and without WhatsApp installed where possible.
5. Point agency outreach and ads aimed at spa owners to the Chyweb page. Use the Nera link when the owner wants to try the design directly.

The private Nera prototype from the previous campaign is a reference. The link used in outreach should work for prospects while signed out.

Two videos are ready in `chyweb-brief/assets/`. The 30-second `chyweb-guest-journey.mp4` illustrates the path from a Google search to an enquiry and a visit. The 15-second `step-inside-nera.mp4` is a sample guest-facing Nera ad. Use the actual new Nera website for the clickable portfolio preview.
