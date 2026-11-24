# Build Nera Spa

Act as a senior hospitality designer and frontend engineer. Deliver a standalone, mobile-first spa website for a fictional boutique day spa in Rayfield, Jos. The person using the main navigation is a spa guest. A spa owner looking at the portfolio should be able to try everything that guest sees.

## Project

Build in the current project root. For a fresh project use Next.js App Router, TypeScript and Tailwind CSS. Use an existing compatible setup when present. Keep the original brief files as reference and move only used display assets into the application’s asset folder. Configure spa identity, hours, treatment descriptions and prices in one editable place. Use one reusable treatment page layout.

## Art direction

Use the supplied wordmark and four original photos. Make the first screen feel like opening a boutique hotel brochure. Pair a large, legible editorial serif such as Instrument Serif with DM Sans for navigation, prices and body text. Use forest green #203F35, ivory #F7F5EC and a restrained brass #A77740. Include generous spacing and strong contrast. Brass is an accent colour for rules and details. Photography should command more attention than decoration.

On wide screens, set a quiet ivory text column beside a broad photograph of the couple sharing tea. On mobile, preserve the guests’ faces when cropping and place a clear price and booking action near the top. Build a simple navigation with Treatments, The Space, Visit and Ask for a time. A sticky mobile booking action is useful if it leaves the content and dialog controls visible. Use short, natural language. Avoid background video in the hero, treatment carousels that hide prices, hover-only controls and decorative counters.

## Pages

| Page | Required experience |
| --- | --- |
| Home | Lead with “Room for two.” Add “An hour side by side. Two therapists, two beds and a quiet room of your own.” Show **60 minutes · ₦60,000 total for two** beside **Ask for a time**. Offer a secondary **Explore treatments** link. Continue with the three treatments, a look inside the suite, visit details and a booking action. |
| Treatments | Present all three treatments with name, duration, price, guest count and one image each. Each service opens its own deep-linkable detail page. |
| Individual treatments | Show who the treatment suits, what is included, the length, guest count, total and the relevant photo. The booking action must preserve the selected treatment. |
| The Space | Use photos of the lounge and suite. Show how the two beds are arranged. Let visual details carry the page. Link directly to the couples treatment. |
| Visit | Show Rayfield, the example address and hours in Jos. Use the fictional identity in MENU.md. A clearly labelled illustrative location is sufficient. Keep real navigation services and unrelated real businesses out of the fictional visit flow. |

A useful route structure is `/`, `/treatments`, `/treatments/couples-massage`, `/treatments/signature-massage`, `/treatments/botanical-facial`, `/the-space` and `/visit`.

## Booking journey

In portfolio mode, **Ask for a time** opens an accessible WhatsApp-style booking preview. Show the selected treatment and its total in a prefilled sample message. Reception offers two illustrative available slots within the stated opening hours. Let the visitor choose a time and see a confirmation marked “Demo booking”. The demonstration needs no personal information or real outbound message. Keep any demo state in the browser.

After the sample confirmation, show one secondary link, **I want this for my spa**, which leads to the Chyweb offer’s `#audit` section. Provide the same option unobtrusively in the footer next to “A fictional spa website by Chyweb”. Use one configurable agency return URL. Keep Chyweb packages, ad settings and the reception reporting log outside the guest navigation.

For adaptation to a paying spa, document where the operator can put its actual WhatsApp number, call number and address. A live treatment link should prefill the selected service, then let reception confirm real availability. In portfolio mode, expose only the simulation. Public portfolio access should work without sign-in. Apply `noindex` to the fictional site and avoid fabricated reviews or ratings.

## Finish and verify

Run the project’s build and available checks. Test all treatment links and the full enquiry flow. Test navigation, dialog focus, mobile scroll, image cropping and the return link on a phone-sized viewport and desktop. Check text at 390, 768 and 1440 px widths. Respect reduced motion and keyboard interaction. Optimise the supplied photos and reserve image dimensions so the booking button stays in place as content loads.

Once the site is ready for review, provide the running preview and capture one full-width desktop homepage view and a mobile view of the actual website. Export them as `nera-desktop.webp` and `nera-mobile.webp` for the Chyweb landing page. Summarise what was built, how to run it and which contact/domain settings are needed at launch.
