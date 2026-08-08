# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: categories.spec.ts >> Categories Switching >> Verify category switching
- Location: tests/categories.spec.ts:4:9

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('Hand Tools', { exact: true }) resolved to 2 elements:
    1) <a class="dropdown-item" data-test="nav-hand-tools" href="/category/hand-tools" _ngcontent-ng-c2913155081="" routerlink="/category/hand-tools">Hand Tools</a> aka getByTestId('nav-hand-tools')
    2) <label _ngcontent-ng-c670033506="">…</label> aka locator('#filters').getByText('Hand Tools')

Call log:
  - waiting for getByText('Hand Tools', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - text: View the
    - link "Documentation" [ref=e4] [cursor=pointer]:
      - /url: https://testsmith-io.github.io/practice-software-testing/#/
    - text: for this application.
  - generic [ref=e5]:
    - generic [ref=e7]:
      - generic [ref=e8]: Practice Black Box Testing & Bug Hunting
      - button "Testing Guide" [ref=e9] [cursor=pointer]
      - button "🐛 Bug Hunting" [ref=e10] [cursor=pointer]
    - navigation [ref=e11]:
      - generic [ref=e12]:
        - link "Practice Software Testing - Toolshop" [ref=e13] [cursor=pointer]:
          - /url: /
          - img [ref=e14]
        - generic [ref=e32]:
          - menubar "Main menu" [ref=e33]:
            - menuitem "Home" [ref=e34]:
              - link "Home" [ref=e35] [cursor=pointer]:
                - /url: /
            - menuitem "Categories nav-categories" [ref=e36]:
              - button "Categories" [expanded] [active] [ref=e37] [cursor=pointer]
              - list "nav-categories" [ref=e38]:
                - listitem [ref=e39]:
                  - link "Hand Tools" [ref=e40] [cursor=pointer]:
                    - /url: /category/hand-tools
                - listitem [ref=e41]:
                  - link "Power Tools" [ref=e42] [cursor=pointer]:
                    - /url: /category/power-tools
                - listitem [ref=e43]:
                  - link "Other" [ref=e44] [cursor=pointer]:
                    - /url: /category/other
                - listitem [ref=e45]:
                  - link "Special Tools" [ref=e46] [cursor=pointer]:
                    - /url: /category/special-tools
                - listitem [ref=e47]:
                  - separator [ref=e48]
                - listitem [ref=e49]:
                  - link "Rentals" [ref=e50] [cursor=pointer]:
                    - /url: /rentals
            - menuitem "Contact" [ref=e51]:
              - link "Contact" [ref=e52] [cursor=pointer]:
                - /url: /contact
            - menuitem "Jane Doe" [ref=e53]:
              - button "Jane Doe" [ref=e54] [cursor=pointer]
          - button "Select language" [ref=e56] [cursor=pointer]:
            - img [ref=e58]
            - text: EN
  - generic [ref=e61]:
    - generic [ref=e62]:
      - paragraph [ref=e63]:
        - img "Banner" [ref=e64]
      - separator [ref=e65]
    - generic [ref=e66]:
      - generic [ref=e67]:
        - heading "Sort" [level=4] [ref=e68]:
          - img [ref=e70]
          - text: Sort
        - separator [ref=e72]
        - combobox "sort" [ref=e75]:
          - option [selected]
          - option "Name (A - Z)"
          - option "Name (Z - A)"
          - option "Price (High - Low)"
          - option "Price (Low - High)"
          - option "CO₂ Rating (A - E)"
          - option "CO₂ Rating (E - A)"
        - heading "Price Range" [level=4] [ref=e76]:
          - img [ref=e78]
          - text: Price Range
        - separator [ref=e80]
        - generic "ngx-slider" [ref=e82]:
          - slider "ngx-slider" [ref=e87] [cursor=pointer]
          - slider "ngx-slider-max" [ref=e88] [cursor=pointer]
          - generic [ref=e89]: "0"
          - generic [ref=e90]: "200"
          - generic [ref=e91]: "1"
          - generic [ref=e92]: "100"
        - heading "Search" [level=4] [ref=e94]:
          - img [ref=e96]
          - text: Search
        - separator [ref=e98]
        - generic [ref=e100]:
          - generic [ref=e101]: Search
          - textbox "Search" [ref=e102]
          - button "X" [ref=e103] [cursor=pointer]
          - button "Search" [ref=e104] [cursor=pointer]
        - heading "Filters" [level=4] [ref=e105]:
          - img [ref=e107]
          - text: Filters
        - separator [ref=e109]
        - heading "By category:" [level=4] [ref=e110]
        - group "Categories" [ref=e111]:
          - generic [ref=e112]: Categories
          - generic [ref=e113]:
            - generic [ref=e114]:
              - checkbox "Hand Tools" [ref=e115]
              - text: Hand Tools
            - list [ref=e116]:
              - group "Categories" [ref=e117]:
                - generic [ref=e118]: Categories
                - generic [ref=e120]:
                  - checkbox "Hammer" [ref=e121]
                  - text: Hammer
                - generic [ref=e123]:
                  - checkbox "Hand Saw" [ref=e124]
                  - text: Hand Saw
                - generic [ref=e126]:
                  - checkbox "Wrench" [ref=e127]
                  - text: Wrench
                - generic [ref=e129]:
                  - checkbox "Screwdriver" [ref=e130]
                  - text: Screwdriver
                - generic [ref=e132]:
                  - checkbox "Pliers" [ref=e133]
                  - text: Pliers
                - generic [ref=e135]:
                  - checkbox "Chisels" [ref=e136]
                  - text: Chisels
                - generic [ref=e138]:
                  - checkbox "Measures" [ref=e139]
                  - text: Measures
          - generic [ref=e140]:
            - generic [ref=e141]:
              - checkbox "Power Tools" [ref=e142]
              - text: Power Tools
            - list [ref=e143]:
              - group "Categories" [ref=e144]:
                - generic [ref=e145]: Categories
                - generic [ref=e147]:
                  - checkbox "Grinder" [ref=e148]
                  - text: Grinder
                - generic [ref=e150]:
                  - checkbox "Sander" [ref=e151]
                  - text: Sander
                - generic [ref=e153]:
                  - checkbox "Saw" [ref=e154]
                  - text: Saw
                - generic [ref=e156]:
                  - checkbox "Drill" [ref=e157]
                  - text: Drill
          - generic [ref=e158]:
            - generic [ref=e159]:
              - checkbox "Other" [ref=e160]
              - text: Other
            - list [ref=e161]:
              - group "Categories" [ref=e162]:
                - generic [ref=e163]: Categories
                - generic [ref=e165]:
                  - checkbox "Tool Belts" [ref=e166]
                  - text: Tool Belts
                - generic [ref=e168]:
                  - checkbox "Storage Solutions" [ref=e169]
                  - text: Storage Solutions
                - generic [ref=e171]:
                  - checkbox "Workbench" [ref=e172]
                  - text: Workbench
                - generic [ref=e174]:
                  - checkbox "Safety Gear" [ref=e175]
                  - text: Safety Gear
                - generic [ref=e177]:
                  - checkbox "Fasteners" [ref=e178]
                  - text: Fasteners
        - heading "By brand:" [level=4] [ref=e180]
        - group "Brands" [ref=e181]:
          - generic [ref=e182]: Brands
          - generic [ref=e184]:
            - checkbox "ForgeFlex Tools" [ref=e185]
            - text: ForgeFlex Tools
          - generic [ref=e187]:
            - checkbox "MightyCraft Hardware" [ref=e188]
            - text: MightyCraft Hardware
        - heading "Sustainability:" [level=4] [ref=e190]
        - group "Eco-Friendly Products" [ref=e191]:
          - generic [ref=e192]: Eco-Friendly Products
          - generic [ref=e194]:
            - checkbox "Show only eco-friendly products" [ref=e195]
            - text: Show only eco-friendly products
      - generic [ref=e196]:
        - generic [ref=e197]:
          - 'link "Combination Pliers Compare Combination Pliers CO₂: A B C D E Out of stock $14.15" [ref=e198] [cursor=pointer]':
            - /url: /product/01KZFZAKJDCMJW0YXS3XT32Q9J
            - generic [ref=e199]:
              - img "Combination Pliers" [ref=e200]
              - button "Compare" [ref=e201]:
                - img [ref=e203]
            - generic [ref=e205]:
              - heading "Combination Pliers" [level=5] [ref=e206]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e207]:
                - text: "CO₂:"
                - generic [ref=e208]: A
                - generic [ref=e209]: B
                - generic [ref=e210]: C
                - generic [ref=e211]: D
                - generic [ref=e212]: E
            - generic [ref=e213]:
              - generic [ref=e214]: Out of stock
              - generic [ref=e215]: $14.15
          - 'link "Pliers Compare Pliers CO₂: A B C D E $12.01" [ref=e216] [cursor=pointer]':
            - /url: /product/01KZFZAKK92M4JQE3MWS6D4E0C
            - generic [ref=e217]:
              - img "Pliers" [ref=e218]
              - button "Compare" [ref=e219]:
                - img [ref=e221]
            - generic [ref=e223]:
              - heading "Pliers" [level=5] [ref=e224]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e225]:
                - text: "CO₂:"
                - generic [ref=e226]: A
                - generic [ref=e227]: B
                - generic [ref=e228]: C
                - generic [ref=e229]: D
                - generic [ref=e230]: E
            - generic [ref=e232]: $12.01
          - 'link "Bolt Cutters Compare Bolt Cutters CO₂: A B C D E $48.41" [ref=e233] [cursor=pointer]':
            - /url: /product/01KZFZAKKCQ0D6T3HC71WZG4MA
            - generic [ref=e234]:
              - img "Bolt Cutters" [ref=e235]
              - button "Compare" [ref=e236]:
                - img [ref=e238]
            - generic [ref=e240]:
              - heading "Bolt Cutters" [level=5] [ref=e241]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e242]:
                - text: "CO₂:"
                - generic [ref=e243]: A
                - generic [ref=e244]: B
                - generic [ref=e245]: C
                - generic [ref=e246]: D
                - generic [ref=e247]: E
            - generic [ref=e249]: $48.41
          - 'link "Long Nose Pliers Compare Long Nose Pliers CO₂: A B C D E Out of stock $14.24" [ref=e250] [cursor=pointer]':
            - /url: /product/01KZFZAKKF6SXYZEAJBZEHM364
            - generic [ref=e251]:
              - img "Long Nose Pliers" [ref=e252]
              - button "Compare" [ref=e253]:
                - img [ref=e255]
            - generic [ref=e257]:
              - heading "Long Nose Pliers" [level=5] [ref=e258]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e259]:
                - text: "CO₂:"
                - generic [ref=e260]: A
                - generic [ref=e261]: B
                - generic [ref=e262]: C
                - generic [ref=e263]: D
                - generic [ref=e264]: E
            - generic [ref=e265]:
              - generic [ref=e266]: Out of stock
              - generic [ref=e267]: $14.24
          - 'link "Slip Joint Pliers Compare Slip Joint Pliers CO₂: A B C D E $9.17" [ref=e268] [cursor=pointer]':
            - /url: /product/01KZFZAKKN4VH3TMXPN67P2TS6
            - generic [ref=e269]:
              - img "Slip Joint Pliers" [ref=e270]
              - button "Compare" [ref=e271]:
                - img [ref=e273]
            - generic [ref=e275]:
              - heading "Slip Joint Pliers" [level=5] [ref=e276]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e277]:
                - text: "CO₂:"
                - generic [ref=e278]: A
                - generic [ref=e279]: B
                - generic [ref=e280]: C
                - generic [ref=e281]: D
                - generic [ref=e282]: E
            - generic [ref=e284]: $9.17
          - 'link "Claw Hammer with Shock Reduction Grip Compare Claw Hammer with Shock Reduction Grip CO₂: A B C D E $13.41" [ref=e285] [cursor=pointer]':
            - /url: /product/01KZFZAKKSR0FG93VNW59YJ4WN
            - generic [ref=e286]:
              - img "Claw Hammer with Shock Reduction Grip" [ref=e287]
              - button "Compare" [ref=e288]:
                - img [ref=e290]
            - generic [ref=e292]:
              - heading "Claw Hammer with Shock Reduction Grip" [level=5] [ref=e293]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e294]:
                - text: "CO₂:"
                - generic [ref=e295]: A
                - generic [ref=e296]: B
                - generic [ref=e297]: C
                - generic [ref=e298]: D
                - generic [ref=e299]: E
            - generic [ref=e301]: $13.41
          - 'link "Hammer Compare Hammer CO₂: A B C D E $12.58" [ref=e302] [cursor=pointer]':
            - /url: /product/01KZFZAKKY25R63DR3P0JRVH3E
            - generic [ref=e303]:
              - img "Hammer" [ref=e304]
              - button "Compare" [ref=e305]:
                - img [ref=e307]
            - generic [ref=e309]:
              - heading "Hammer" [level=5] [ref=e310]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e311]:
                - text: "CO₂:"
                - generic [ref=e312]: A
                - generic [ref=e313]: B
                - generic [ref=e314]: C
                - generic [ref=e315]: D
                - generic [ref=e316]: E
            - generic [ref=e318]: $12.58
          - 'link "Claw Hammer Compare Claw Hammer CO₂: A B C D E $11.48" [ref=e319] [cursor=pointer]':
            - /url: /product/01KZFZAKM24Q619HVEP1AQRCVW
            - generic [ref=e320]:
              - img "Claw Hammer" [ref=e321]
              - button "Compare" [ref=e322]:
                - img [ref=e324]
            - generic [ref=e326]:
              - heading "Claw Hammer" [level=5] [ref=e327]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e328]:
                - text: "CO₂:"
                - generic [ref=e329]: A
                - generic [ref=e330]: B
                - generic [ref=e331]: C
                - generic [ref=e332]: D
                - generic [ref=e333]: E
            - generic [ref=e335]: $11.48
          - 'link "Thor Hammer Compare Thor Hammer CO₂: A B C D E $11.14" [ref=e336] [cursor=pointer]':
            - /url: /product/01KZFZAKM5Z083S8BVEYCC2DMF
            - generic [ref=e337]:
              - img "Thor Hammer" [ref=e338]
              - button "Compare" [ref=e339]:
                - img [ref=e341]
            - generic [ref=e343]:
              - heading "Thor Hammer" [level=5] [ref=e344]
              - generic "A = most environmentally friendly, E = higher environmental impact" [ref=e345]:
                - text: "CO₂:"
                - generic [ref=e346]: A
                - generic [ref=e347]: B
                - generic [ref=e348]: C
                - generic [ref=e349]: D
                - generic [ref=e350]: E
            - generic [ref=e352]: $11.14
        - navigation [ref=e355]:
          - list [ref=e356]:
            - listitem [ref=e357]:
              - button "Previous": «
            - listitem [ref=e358]:
              - button "Page-1" [ref=e359] [cursor=pointer]: "1"
            - listitem [ref=e360]:
              - button "Page-2" [ref=e361] [cursor=pointer]: "2"
            - listitem [ref=e362]:
              - button "Page-3" [ref=e363] [cursor=pointer]: "3"
            - listitem [ref=e364]:
              - button "Page-4" [ref=e365] [cursor=pointer]: "4"
            - listitem [ref=e366]:
              - button "Page-5" [ref=e367] [cursor=pointer]: "5"
            - listitem [ref=e368]:
              - button "Next" [ref=e369] [cursor=pointer]: »
  - contentinfo [ref=e371]:
    - generic [ref=e372]:
      - text: This is a DEMO application (
      - link "GitHub repo" [ref=e373] [cursor=pointer]:
        - /url: https://github.com/testsmith-io/practice-software-testing
      - text: ), used for software testing training purpose. |
      - link "Privacy Policy" [ref=e374] [cursor=pointer]:
        - /url: /privacy
      - text: "| Banner photo by"
      - link "Barn Images" [ref=e375] [cursor=pointer]:
        - /url: https://unsplash.com/@barnimages
      - text: "on"
      - link "Unsplash" [ref=e376] [cursor=pointer]:
        - /url: https://unsplash.com/photos/t5YUoHW6zRo
      - text: .
    - generic [ref=e377]: v2.3 | Built 2026-08-07 | Angular 20.0.5
  - button "Open chat" [ref=e379] [cursor=pointer]:
    - img [ref=e380]
```

# Test source

```ts
  1  | import { Locator, Page, expect } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * Page Object representing the Main Page of the e-commerce application.
  5  |  */
  6  | export class MainPage {
  7  |     readonly page: Page;
  8  |     readonly searchInput: Locator;
  9  |     readonly searchCountResult: Locator;
  10 |     readonly signInButton: Locator;
  11 |     readonly handToolHammer: Locator;
  12 |     readonly cardProductName: Locator;
  13 |     readonly cardProductInstock: Locator;
  14 |     readonly cartLink: Locator;
  15 |     readonly contactLink: Locator;
  16 |     readonly languageBtn: Locator;
  17 |     readonly categoriesBtn: Locator;
  18 |     readonly pageTitle: Locator;
  19 | 
  20 |     constructor(page: Page) {
  21 |         this.page = page;
  22 |         this.pageTitle = page.getByTestId('page-title');
  23 |         this.searchInput = page.getByTestId('search-query');
  24 |         this.searchCountResult = page.getByTestId('search-result-count');
  25 |         this.signInButton = page.getByRole('link', { name: 'Sign in' });
  26 |         this.handToolHammer = page.getByRole('checkbox', { name: 'Hammer' });
  27 |         this.cardProductName = page.getByTestId('product-name');
  28 |         this.cardProductInstock = page.locator('.card');
  29 |         this.cartLink = page.getByTestId('nav-cart');
  30 |         this.contactLink = page.getByTestId('nav-contact');
  31 |         this.languageBtn = page.getByTestId('language-select');
  32 |         this.categoriesBtn = page.getByTestId('nav-categories');
  33 |     }
  34 | 
  35 |     /**
  36 |      * Searches for a product by its name using the top search bar.
  37 |      * @param {string} productName - The exact name of the product to search for.
  38 |      */
  39 |     async searchForProduct(productName: string) {
  40 |         await this.searchInput.fill(productName);
  41 |         await this.page.keyboard.press('Enter');
  42 |     }
  43 | 
  44 |     /**
  45 |      * Navigates directly to the main page of the application.
  46 |      */
  47 |     async open() {
  48 |         await this.page.goto('/');
  49 |     }
  50 | 
  51 |     /**
  52 |      * Waits for the product cards to be visible, filters out items that are
  53 |      * 'Out of stock', and clicks on the title of the first available product.
  54 |      */
  55 |     async choseInStock() {
  56 |         await this.cardProductInstock.first().waitFor({ state: 'visible' });
  57 |         const availableCard = this.cardProductInstock
  58 |             .filter({ hasNotText: 'Out of stock' })
  59 |             .first();
  60 |         await availableCard.getByTestId('product-name').click();
  61 |     }
  62 | 
  63 |     /**
  64 |      * Opens the language selection dropdown and selects the specified language option.
  65 |      * @param {string} langCode - Language option code/id (e.g. 'de', 'en', 'nl', 'fr').
  66 |      */
  67 |     async selectLanguage(langCode: string) {
  68 |         const code = langCode.toLowerCase();
  69 |         await this.languageBtn.click();
  70 |         await this.page.getByTestId(`lang-${code}`).click();
  71 |         await this.page.locator('.skeleton').first().waitFor({ state: 'detached' });
  72 |     }
  73 | 
  74 |     /**
  75 |      * Asserts that the expected language label is displayed on the language button.
  76 |      * @param {string} expectedLanguage - Language text to check (e.g., 'DE', 'EN').
  77 |      */
  78 |     async expectLanguageSelected(expectedLanguage: string) {
  79 |         await expect(this.languageBtn).toContainText(expectedLanguage);
  80 |     }
  81 | 
  82 |     /**
  83 |      * Opens the categories dropdown, selects a specific category by its exact name,
  84 |      * and waits for the page content to fully load (skeleton loader disappears).
  85 |      * @param {string} categoryName - The exact text of the category to select (e.g., 'Hand Tools', 'Power Tools').
  86 |      */
  87 |     async selectCategories(categoryName: string) {
  88 |         await this.categoriesBtn.click();
> 89 |         await this.page.getByText(categoryName, { exact: true }).click();
     |                                                                  ^ Error: locator.click: Error: strict mode violation: getByText('Hand Tools', { exact: true }) resolved to 2 elements:
  90 |         await this.page.locator('.skeleton').first().waitFor({ state: 'detached' });
  91 |     }
  92 | }
  93 | 
```