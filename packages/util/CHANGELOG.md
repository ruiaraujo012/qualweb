# Changelog

## 0.6.4

### Patch Changes

- 411d717: Update util dependency

## 0.6.3

### Patch Changes

- edf0c1c: Build(deps): Bump franc-min from 5.0.0 to 6.2.1

## 0.6.2

### Patch Changes

- 40efb72: Updated repository, bugs, and homepage fields for all package.json files

## 0.6.1

### Patch Changes

- 38078bb: Util package should not depend on core
- 38078bb: Update build scripts

  Removed the cleanup step of all build scripts and added a "clean" script for
  them all instead. This change means that the build scripts will no longer create
  a clean output folder. Since the output folders aren't under version control,
  this won't mess with history, and CI/CD pipelines should build from a clean
  checkout so this shouldn't cause pollution in final releases, either.

## 0.6.0

### Minor Changes

- f7c46a2: # Major refactor and code cleanup

  This update makes significant changes to the overall structure of QualWeb's
  code and the API. Most users should be able to be able to migrate with only a
  few changes.

  There's a new convention for running evaluations. See the next section for a
  brief migration guide.

  Additionally, several packages are no longer in use. If you are using any of
  the following packages in your project, remove them when you update to the new
  version of `@qualweb/core` to avoid any issues:

  - `@qualweb/types`
  - `@qualweb/dom`
  - `@qualweb/evaluation`

  ## New convention for calling QualWeb

  Previous versions of QualWeb expects an options object containing detailed
  configurations for each supported module. While this reduced bootstrapping a bit
  (users only needed to install `@qualweb/core` to get started), it was a bit
  rigid and bothersome to maintain/extend.

  Now, individual evaluation modules must be instantiated and configured by the
  user and passed to QualWeb.

  For most users, updating your code should be quite simple. Here's an example.

  Currently, you might have an evaluation run like this:

  ```typescript
  import { Qualweb } from '@qualweb/core';

  const qw = new QualWeb();
  await qw.start();

  const result = await qw.evaluate({
    url: 'https://example.com',
    execute: {
      act: true
    },
    'act-rules': {
      levels: ['A', 'AA']
    }
  });
  ```

  To update to work with the new API, do the following:

  First, install the modules you use as additional dependencies in your project.
  For this example, adding `@qualweb/act-rules` next to `@qualweb/core` in your
  package.json file. The other modules you might be using are:

  - `@qualweb/wcag-techniques`
  - `@qualweb/counter`
  - `@qualweb/best-practices`

  Then, for each module you are using, import that package and create an instance
  of that module for use in QualWeb. Pass that instance to the evaluate function
  instead. Updated, the previous example would now look like this:

  ```typescript
  import { Qualweb } from '@qualweb/core';
  // Import the evaluation module.
  import { ACTRules } from '@qualweb/act-rules';

  const qw = new Qualweb();
  await qw.start();

  // Instantiate an evaluation module and configure it before
  // passing it to QualWeb.
  const actRulesModule = new ACTRules({
    levels: ['A']
  });

  const result = await qw.evaluate({
    url: 'https://example.com',
    // Add the module to be run here.
    modules: [actRulesModule]
  });
  ```

  The approach is similar to how middleware/plugins works in express-style
  frameworks.

  ## Removal of @qualweb/types

  The typings package `@qualweb/types` has been removed. Historically, it contained
  the TypeScript types applicable to all other packages. Now, those types are
  exported from the source packages instead. For example, where you would
  previously install both `@qualweb/core` and `@qualweb/types` to have proper
  typing for the `Qualweb` object, it is now sufficient just to install
  `@qualweb/core`.

  Make sure to remove @qualweb/types from your project if you were using it, to
  avoid any issues with conflicting types.

  ## Removal of @qualweb/evaluation and @qualweb/dom

  These packages have been rolled into either core or util. For anyone using
  QualWeb solely through the `@qualweb/core` package, this should not cause any
  issues.

  ## Anything missing?

  This is a fairly set of changes, and we may have missed something moving things
  around. While QualWeb _should_ run without any notable changes, please do add
  an issue if you have any problems.

## 0.5.41

### Patch Changes

- 18577530: Fix checking aria-disabled

## 0.5.40

### Patch Changes

- 636b402e: Fix infinite loop in accessible name computation
- eb596a97: Fix reference getter when javascript is used inside href

## 0.5.39

### Patch Changes

- ef4a24db: Fix aname computation for input

## 0.5.38

### Patch Changes

- 7801f294: Misc test stuff

## 0.5.37

### Patch Changes

- 10942e33: Fix accessible name computation for noscript element

## 0.5.36

### Patch Changes

- 002774a2: Fix R15

## 0.5.35

### Patch Changes

- ab2c347: Fix getImplicitRole

## 0.5.34

### Patch Changes

- 5366561: Fix bug in R67

## 0.5.33

### Patch Changes

- c697d5c: Fix list values comparison in R34

## 0.5.32

### Patch Changes

- f4675a6: Fix role of area element
- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)
- ebe8ac4: Fix visibility detection bug

## 0.5.31

### Patch Changes

- d512050: Improve shadow dom support

## 0.5.30

### Patch Changes

- ac62911: When parent has opacity zero consider element not visible

## 0.5.28

### Patch Changes

- 550429b: Monorepo release test

## 0.5.27

### Patch Changes

- 315d70c: Changed prettier command argument

## [0.5.26] - 19/10/2023

### Fixed

- roles JSON

## [0.5.25] - 19/10/2023

### Fixed

- roles JSON

## [0.5.24] - 27/09/2023

### Fixed

- inplicit value roles

## [0.5.23] - 04/09/2023

### Fixed

- added 'paragraph' to acessible name

## [0.5.22] - 18/07/2023

### Fixed

- fixed role list

## [0.5.21] - 07/06/2023

### Fixed

- fixed AName

## [0.5.20] - 30/05/2023

### Fixed

- added aria-expanded to menu-item's supported aria

## [0.5.19] - 01/02/2023

### Fixed

- added svg implicit role and fixed aria global

## [0.5.17] - 21/12/2022

### Fixed

- changed required owned role

## [0.5.16] - 29/06/2022

### Fixed

- fixed getRole

## [0.5.15] - 28/06/2022

### Fixed

- fixed AName control inside widget

## [0.5.14] - 21/03/2022

### Added

- landmarkIsTopLevel

## [0.5.13] - 20/10/2021

### Fixed

- accessible name for SVG with attribute `aria-labeledby`

## [0.5.12] - 25/05/2021

### Added

- AccessibilityUtils.getElementValidExplicitRole function

### Updated

- dependencies

## [0.5.11] - 12/05/2021

### Fixed

- getElementreferenceByHREF bug

## [0.5.10] - 11/05/2021

### Updated

- dependencies

## [0.5.9] - 27/04/2021

### Fixed

- DomUtils.isElementADescendantOfExplicitRole and isElementADescendantOf bugs

## [0.5.8] - 27/04/2021

### Fixed

- DomUtils.isHumanLanguage to detect the language with a minimum of 2 characters

### Updated

- dependencies

## [0.5.7] - 23/04/2021

### Fixed

- isElementReferencedByHREF bug

### Updated

- dependencies

## [0.5.6] - 15/04/2021

### Changes

- Associated DomUtils and AccessibilityUtils to the Window interface
- performance improvements

### Updated

- dependencies

## [0.5.5] - 14/04/2021

### Fixed

- issues related to cache
- speed issues with some functions

### Updated

- dependencies

## [0.5.4] - 30/03/2021

### Updated

- dependencies

### Fixed

- an issue with the AccessibilityUtils.getAccessibleName function

## [0.5.3] - 29/03/2021

### Updated

- type definitions
- refactored code to use global qualweb page (qw-page) created on the window object

## [0.5.2] - 27/03/2021

### Updated

- dependencies

## [0.5.1] - 27/03/2021

### Fixed

- issue with webpack config

## [0.5.0] - 27/03/2021

### Changes

- module is now optimized using webpack
- should be injected and initialized before any evaluation module

## [0.4.0] - 25/03/2021

# Removed

- unnecessary dependencies
- source html manipulation functions

### Updated

- dependencies

## [0.3.66] - 10/03/2021

### Updated

- some code typings

### Fixed

- general bugs

## [0.3.65] - 02/03/2021

### Fixed

- elementHasValidRole to support role attribute with multiples values

## [0.3.64] - 04/02/2021

### Fixed

- cleaned svg code

## [0.3.63] - 28/01/2021

### Fixed

-fixe AName

## [0.3.62] - 28/01/2021

### Fixed

-bug fix

## [0.3.61] - 06/01/2021

### Fixed

-bug fix

## [0.3.60] - 13/12/2020

### Fixed

-new function getOwnedElements

## [0.3.59] - 10/12/2020

### Added

-new function getOwnedElements

## [0.3.58] - 10/12/2020

### Added

- bug fixes

## [0.3.57] - 05/12/2020

### Added

- fixed condition

## [0.3.56] - 05/12/2020

### Added

- bug fix

## [0.3.55] - 12/11/2020

### Added

- objectElementisNonText

## [0.3.54] - 05/11/2020

### Added

- bug fixes

## [0.3.53] - 05/11/2020

### Added

- bug fixes

## [0.3.52] - 05/11/2020

### Added

- bug fixes

## [0.3.51] - 03/11/2020

### Added

- bug fixes

## [0.3.50] - 29/10/2020

### Added

- bug fixes

## [0.3.49] - 27/10/2020

### Added

- bug fixes

## [0.3.48] - 21/10/2020

### Added

- fix isElementHddenCSS

## [0.3.47] - 03/10/2020

### Added

- bug fixes

## [0.3.46] - 30/09/2020

### Added

- bug fixes

## [0.3.45] - 30/09/2020

### Added

- changed function class

## [0.3.44] - 24/09/2020

### Added

- changed function class

## [0.3.43] - 22/09/2020

### Added

- fixed aria-owner

## [0.3.42] - 22/09/2020

### Added

- testing new cache

## [0.3.41] - 22/09/2020

### Added

- testing new cache

## [0.3.40] - 22/09/2020

### Added

- testing new cache

## [0.3.39] - 22/09/2020

### Added

- testing new cache

## [0.3.38] - 22/09/2020

### Added

- testing new cache

## [0.3.37] - 21/09/2020

### Added

- testing new cache

## [0.3.36] - 21/09/2020

### Added

- testing new cache

## [0.3.35] - 17/09/2020

### Added

- fixed getOwnerElement

## [0.3.34] - 17/09/2020

### Added

- added getOwnerElement

## [0.3.33] - 08/09/2020

### Added

- bug fixes

## [0.3.32] - 29/08/2020

### Added

- bug fixes

## [0.3.31] - 29/08/2020

### Added

- bug fixes

## [0.3.30] - 26/08/2020

### Added

- fixed isElementInAT

## [0.3.29] - 26/08/2020

### Added

- fixed isElementInAT

## [0.3.28] - 10/08/2020

### Added

- fixed shadowDom support

## [0.3.27] - 31/07/2020

### Added

- new elementHasContent implementation

## [0.3.26] - 27/07/2020

### Updated

- dependencies

## [0.3.25] - 27/07/2020

### Updated

- dependencies

## [0.3.24] - 27/07/2020

### Fixed

- isElementPresentation cache bug

## [0.3.23] - 16/07/2020

### Fixed

- image with empty alt

## [0.3.22] - 16/07/2020

### Fixed

- image with empty alt

## [0.3.21] - 08/07/2020

### Fixed

- added even more cache

## [0.3.20] - 06/07/2020

### Fixed

- added more cache

## [0.3.19] - 06/07/2020

### Fixed

- cacheTest

## [0.3.18] - 22/06/2020

### Fixed

- isVisible for shadowDom

## [0.3.17] - 22/06/2020

### Fixed

- isVisible for shadowDom

## [0.3.16] - 18/06/2020

### Fixed

- added protection for invalid selectors

## [0.3.15] - 18/06/2020

### Fixed

- fixed getElementReferencedByHREF

## [0.3.14] - 18/06/2020

### Fixed

- fixed getElementReferencedByHREF

### Fixed

- deleted "\*" in selector (isElementReferencedByAriaLabel)

## [0.3.12] - 15/06/2020

### Fixed

- isElementFocusable

## [0.3.11] - 15/06/2020

### Fixed

- isElementFocusable

## [0.3.10] - 06/06/2020

### Fixed

- isElementVisible

## [0.3.9] - 02/06/2020

### Fixed

- getAname for object element

## [0.3.8] - 02/06/2020

### Fixed

- getImplicitRole and getLinkContext

## [0.3.7] - 01/06/2020

### Fixed

- getLinkContext

## [0.3.6] - 01/06/2020

### Added

- getLinkContext

getLinkContext

## [0.3.5] - 28/05/2020

### Fixed

- ufixed presentational conflicts

## [0.3.4] - 28/05/2020

### Fixed

- fixed getRole bug

## [0.3.3] - 19/05/2020

### Fixed

- fixed aria-labelledby bug

## [0.3.2] - 19/05/2020

### Fixed

- fixed aria-labelledby bug

## [0.3.1] - 15/05/2020

### Fixed

- fixed role presentation conflict

## [0.2.58] - 23/03/2020

### Fixed

- deleted prints

## [0.2.57] - 23/03/2020

### Fixed

- isElementPresentation now available

## [0.2.56] - 23/03/2020

### Fixed

- isElementFocusable bug

## [0.2.55] - 18/03/2020

### Fixed

- getAccessibleName bug

## [0.2.54] - 18/03/2020

### Fixed

- getSourceElementHtmlCode bug

## [0.2.53] - 18/03/2020

### Fixed

- getSourceElementHtmlCode bug

## [0.2.52] - 18/03/2020

### Updated

- dependencies

## [0.2.51] - 20/02/2020

### Fixed

- getAccessibleName

## [0.2.50] - 12/02/2020

### Fixed

- isElementFocusable

## [0.2.49] - 12/02/2020

### Fixed

- implicitroles.json and getImplicitRole

## [0.2.48] - 12/02/2020

### Fixed

- implicitroles.json

## [0.2.47] - 12/02/2020

### Fixed

- getAccessibleName function

## [0.2.46] - 06/02/2020

### Added

- AccessibilityUtils.isElementReferencedByAriaLabel function

## [0.2.45] - 06/02/2020

### Added

- DomUtils.getVideoMetadata function

## [0.2.44] - 06/02/2020

### Fixed

- some bugs

## [0.2.43] - 06/02/2020

### Updated

- dependencies
- DomUtils.getSourceElementAttribute function
- DomUtils.getSourceElementHtmlCode function
- DomUtils.getSourceElementSelector function

## [0.2.42] - 29/01/2020

### Updated

- updated functions

## [0.2.41] - 29/01/2020

### Updated

- updated functions

## [0.2.40] - 29/01/2020

### Updated

- updated functions

## [0.2.39] - 29/01/2020

### Updated

- updated functions

## [0.2.39] - 29/01/2020

### Testing

- exporting DomUtils

## [0.2.38] - 29/01/2020

### Testing

- export DomUtils as default

## [0.2.37] - 29/01/2020

### Updated

- types

## [0.2.36] - 29/01/2020

### Updated

- enum Optimization

## [0.2.35] - 29/01/2020

### Updated

- enum Optimization

## [0.2.34] - 28/01/2020

### Added

- fixed is elementHidden

## [0.2.33] - 28/01/2020

### Added

- DomUtils.getSourceElementSelector
- DomUtils.getSourceElementHtmlCode

### Changed

- getElementAttribute2 to getSourceElementAttribute

## [0.2.32] - 23/01/2020

### Fixed

- typo getElemenVisible
- typo elementHasGlobalARIAProportieOrAttribute
- AccessibilityTreeUtils to AccessibilityTreeUtils
- removed getElementName
- changed getElementName to getElementTagName

## [0.2.31] - 23/01/2020

### Fixed

- a bug in getAccessibleNameSVG function

## [0.2.30] - 22/01/2020

### Added

- isMathDocument function
- getPageRootElement function
- enum Optimization

## [0.2.29] - 22/01/2020

### Added

- shadow dom functions

## [0.2.28] - 22/01/2020

### Updated

- bug fix

## [0.2.27] - 21/01/2020

### Updated

- some functions

## [0.2.26] - 20/01/2020

### Updated

- some functions

## [0.2.25] - 15/01/2020

### Fixed

- several functions bugs

## [0.2.24] - 15/01/2020

### Fixed

- several functions bugs

## [0.2.23] - 13/01/2020

### Fixed

- a bug in the getDefaultName function

## [0.2.22] - 13/01/2020

### Fixed

- a bug in the isElementWidget function

## [0.2.21] - 13/01/2020

### Fixed

- a bug in the isElementWidget function

## [0.2.19] - 12/01/2020

### Fixed

- fixed heading bug

## [0.2.19] - 12/01/2020

### Fixed

- small bug fix

## [0.2.18] - 12/01/2020

### Fixed

- small bug fix

## [0.2.17] - 12/01/2020

### Fixed

- small bug fix

## [0.2.16] - 12/01/2020

### Fixed

- small bug fix

## [0.2.15] - 12/01/2020

### Fixed

- added new AT functions

## [0.2.14] - 08/01/2020

### Fixed

- video bug fix

## [0.2.13] - 07/01/2020

### Fixed

- bug fix

## [0.2.12] - 07/01/2020

### Fixed

- added Video Metadata

## [0.2.11] - 06/01/2020

### Fixed

- Multiple minor bugs

## [0.2.10] - 12/12/2019

### Fixed

- getElementChildTextContent function

## [0.2.9] - 11/12/2019

### Removed

- getLabel.ts

## [0.2.8] - 11/12/2019

### Added

- CssUtils

## [0.2.7] - 06/12/2019

### Added

- isVisible working

## [0.2.6] - 06/12/2019

### Added

- isVisible working

## [0.2.5] - 05/12/2019

### Added

- bug fix

## [0.2.4] - 05/12/2019

### Added

- isVisible and isOffScreen

## [0.2.3] - 04/12/2019

### Added

- getElementAttributes function to DomUtils namespace

## [0.2.2] - 03/12/2019

### Changed

- fixed empy before and after

## [0.2.1] - 03/12/2019

### Changed

- multiple bug fixes

## [0.2.0] - 02/12/2019

### Changed

- all features to work with the new core architecture

## [0.1.10] - 05/11/2019

### Updated

- Accessible Name calculation fix for input elements

## [0.1.9] - 31/10/2019

### Updated

- Data Table Verification

## [0.1.8] - 29/10/2019

### Updated

- Added Accessible Name Calculation for SVG elements

## [0.1.7] - 29/10/2019

### Updated

- Accessibility tree utility functions

## [0.1.6] - 26/10/2019

### Updated

- Accessibility tree utility functions

## [0.1.5] - 22/10/2019

### Updated

- Accessibility tree utility functions

## [0.1.4] - 22/10/2019

### Updated

- Accessibility tree utility functions

## [0.1.3] - 17/10/2019

### Updated

- Accessibility tree utility functions

## [0.1.2] - 16/10/2019

### Updated

- Accessibility tree utility functions

## [0.1.1] - 11/10/2019

### Updated

- Accessibility tree utility functions

## [0.1.0] - 11/10/2019

### Added

- Accessibility tree utility functions

## [0.0.4] - 10/10/2019

### Fixed

- bugs and optimized code

## [0.0.3] - 10/10/2019

### Added

- more dom utilities functions

## [0.0.2] - 09/10/2019

### Added

- more dom utilities functions

## [0.0.1] - 07/10/2019

### Added

- dom utilities functions
