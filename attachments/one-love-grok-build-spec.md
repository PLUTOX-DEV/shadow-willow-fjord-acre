# ONE LOVE --- Full Web3 Website Build Specification

## Purpose

Build a production-quality Web3 website for **\$ONELOVE (One Love
Sailing Coin)**, a Solana-based community/meme token connected to the
One Love Sailing brand.

The website should combine:

-   Live \$ONELOVE market chart
-   Solana wallet connection
-   \$ONELOVE staking with APY
-   A separate token-based game area
-   Leaderboard
-   Live market/activity feed
-   One Love Sailing real-world brand story
-   Captain Robbie profile
-   Token transparency information

The design must feel like **premium Caribbean sailing + Solana/Web3**,
not like a generic casino, generic DeFi dashboard, or generic meme-coin
template.

------------------------------------------------------------------------

# 1. Brand Direction

## Brand

**ONE LOVE**

Core themes:

-   Community
-   Freedom
-   Adventure
-   Sailing
-   Ocean
-   Bahamas / Exumas
-   Transparency
-   Real-world identity
-   Solana

Use the supplied One Love reference images as the visual source of
truth.

### Reference assets

The supplied images include:

1.  One Love sailing banner / yacht imagery
2.  One Love skull-and-crossbones logo
3.  Captain Robbie portrait

Also use the generated UI concept image supplied with this specification
as the layout/style reference.

Do not replace the brand identity with a generic crypto aesthetic.

------------------------------------------------------------------------

# 2. Visual Design

## Overall Style

Create a dark premium Web3 interface with:

-   Deep navy / ocean-blue backgrounds
-   Electric blue accents
-   White typography
-   Subtle cyan highlights
-   Glassmorphism cards
-   Thin glowing borders
-   Ocean photography
-   Yacht imagery
-   Clean data visualization
-   Rounded cards
-   High contrast
-   Modern responsive layout

The visual feeling should be:

**Caribbean sailing × premium Web3 × Solana**

Avoid:

-   Excessive neon
-   Generic gambling UI
-   Cheap casino styling
-   Overly complicated gradients
-   Meme-coin cliché graphics
-   Cluttered dashboards

------------------------------------------------------------------------

# 3. Recommended Technology Stack

## Frontend

Use:

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui where useful
-   Lucide icons

## Solana

Use:

-   Solana Web3 tooling
-   Wallet Adapter
-   Support Phantom and other major Solana wallets
-   SPL Token support

The wallet flow must be real and transaction-based.

Do not create fake wallet balances or fake transaction confirmations in
production code.

## Backend

Use:

-   Supabase
-   PostgreSQL
-   Supabase Realtime where useful

Use the backend for:

-   User/session metadata
-   Game statistics
-   Leaderboards
-   Activity feed
-   Non-critical analytics
-   Cached market information

Blockchain state must remain the source of truth for token balances,
staking, claims, and on-chain transactions.

------------------------------------------------------------------------

# 4. Navigation

Desktop navigation:

``` text
ONE LOVE

Overview
Chart
Staking
Game
Sailing
Community

                         Connect Wallet
```

Mobile:

-   Logo
-   Connect Wallet
-   Hamburger menu

Navigation should remain sticky at the top.

------------------------------------------------------------------------

# 5. Hero Section

Hero should use the One Love sailing imagery.

Large headline:

# ONE LOVE

Subheadline:

**COMMUNITY • FREEDOM • ADVENTURE**

Supporting copy:

> A Solana community built around One Love, sailing, adventure and a
> different kind of coin.

Primary buttons:

**STAKE ONELOVE**

**PLAY GAME**

Secondary action:

**VIEW CHART**

Display:

-   One Love logo
-   Yacht
-   Ocean
-   Captain Robbie imagery where appropriate

Do not make the hero look like a financial investment advertisement.

------------------------------------------------------------------------

# 6. Live \$ONELOVE Market Section

This is one of the main sections of the site.

Title:

## \$ONELOVE LIVE

Show:

-   Current price
-   24h percentage change
-   Market cap
-   24h volume
-   Liquidity
-   Holder count where reliable data is available

Chart controls:

``` text
1H
4H
1D
1W
1M
ALL
```

Use a professional interactive line/candlestick chart depending on the
available market-data provider.

The chart must be connected to a real market-data source in production.

Do not hardcode fake prices.

Include:

-   Loading state
-   Error state
-   Empty state
-   Last updated timestamp
-   Responsive chart
-   Tooltips

Buttons:

**BUY ONELOVE**

**VIEW MARKET**

------------------------------------------------------------------------

# 7. Wallet Connection

The primary CTA should be:

**CONNECT WALLET**

Use Solana wallet adapter.

After connection, show:

``` text
Wallet
7x...9Ab

ONELOVE Balance
125,000

SOL Balance
1.42 SOL
```

Never expose private keys or seed phrases.

The user must approve blockchain transactions in their wallet.

------------------------------------------------------------------------

# 8. Staking

Create a dedicated `/staking` page.

Header:

# ONE LOVE STAKING

Subtitle:

> Stake \$ONELOVE and earn rewards over time.

Dashboard card:

``` text
Your ONELOVE
125,000

Currently Staked
75,000

Earned Rewards
2,450

Current APY
XX%
```

Actions:

``` text
STAKE
UNSTAKE
CLAIM
```

## Staking flow

### Stake

1.  Connect wallet
2.  Enter amount
3.  Validate token balance
4.  Show transaction preview
5.  User approves transaction
6.  Submit transaction
7.  Wait for confirmation
8.  Update UI
9.  Show transaction link

### Unstake

1.  Select amount
2.  Show any lock-period restrictions
3.  Confirm
4.  Wallet approval
5.  Transaction confirmation
6.  Update dashboard

### Claim

1.  Show claimable amount
2.  User clicks CLAIM
3.  Wallet approval
4.  Confirm transaction
5.  Update rewards

------------------------------------------------------------------------

# 9. Staking Contract Architecture

Keep staking completely separate from the game.

Conceptually:

``` text
$ONELOVE
   |
   +------ STAKING POOL
   |          |
   |          +--- User deposits
   |          +--- Reward accounting
   |          +--- Claims
   |          +--- Unstaking
   |
   +------ GAME POOL
              |
              +--- Game entries
              +--- Game settlement
              +--- Game rewards
```

Do not allow game activity to directly compromise the normal staking
pool.

The actual APY must be configurable by the deployed staking program and
must never be hardcoded as a guaranteed return in marketing copy.

------------------------------------------------------------------------

# 10. Game

Create a dedicated `/game` page.

Important:

The game is separate from ordinary staking.

Concept:

``` text
ONE LOVE GAME

STAKE TO PLAY

Lock ONELOVE
Enter the game
Play
Game settles
Eligible payout becomes claimable
```

The exact game mechanics should be implemented only after the game rules
are finalized.

Do not invent a gambling mechanic.

Design the interface so that a future game can plug into it.

Example UI:

``` text
ONE LOVE GAME

Your Game Balance
25,000 ONELOVE

Entry
1,000 ONELOVE

[ PLAY NOW ]

Current Players
128

Prize / Reward Pool
XXXX ONELOVE
```

Before a user commits tokens, clearly display:

-   Entry amount
-   Possible outcomes
-   Rules
-   Fees
-   Settlement method
-   Whether tokens can be lost
-   Claim conditions

The user must explicitly confirm before signing the transaction.

Because token wagering can trigger gambling, gaming,
consumer-protection, and financial regulations depending on
jurisdiction, include an appropriate legal/compliance review before
public launch.

------------------------------------------------------------------------

# 11. Game Architecture

Game funds must be isolated from staking funds.

Conceptual architecture:

``` text
GAME PROGRAM

Player
   |
   +--> Entry transaction
   |
   +--> Game/session account
   |
   +--> Outcome
   |
   +--> Settlement
   |
   +--> Claimable reward
```

Use secure on-chain settlement wherever possible.

If randomness is required, use a verifiable/randomness mechanism
appropriate for Solana rather than client-side `Math.random()`.

Never allow the frontend to decide the winner.

------------------------------------------------------------------------

# 12. Leaderboard

Create `/leaderboard`.

Tabs:

``` text
DAILY
WEEKLY
ALL TIME
```

Columns:

``` text
Rank
Player
Score
Games
Rewards
```

Example:

``` text
1   CaptainVibes     98,200
2   SandbarKing      82,400
3   OneLoveCrew      71,300
```

Do not fabricate real user data.

Show skeleton/loading states until real data is available.

Wallet addresses should be shortened:

``` text
7xA...9Qm
```

Allow users to optionally choose a display name if the product supports
profiles.

------------------------------------------------------------------------

# 13. Live Activity Feed

This is a LIVE ACTIVITY feed, not a chat.

Title:

## LIVE ACTIVITY

Example events:

``` text
Wallet connected
2m ago

ONELOVE staked
5m ago

Rewards claimed
8m ago

Game joined
12m ago

Game settled
16m ago
```

Use realtime updates where practical.

Clearly distinguish:

-   On-chain events
-   Backend events
-   Market data

Do not imply an event is on-chain unless it actually is.

------------------------------------------------------------------------

# 14. Sailing Section

Create `/sailing`.

Hero:

# ONE LOVE SAILING

Subtitle:

**Real Adventures. Real People. Real Utility.**

Use the yacht imagery.

Show:

-   One Love Sailing
-   S/Y One Love²
-   Bahamas
-   Exumas
-   Sailing
-   Diving
-   Snorkeling
-   Island adventures
-   Charter experience

CTA:

**EXPLORE THE SAILING EXPERIENCE**

This section should explain the connection between the real-world
sailing brand and the One Love token/community without making
unsupported financial claims.

------------------------------------------------------------------------

# 15. Captain Robbie Section

Create a dedicated profile card/page.

Use the supplied Captain Robbie image.

Title:

# CAPTAIN ROBBIE

Display verified/provided credentials and project information as
appropriate.

Possible layout:

``` text
[ Captain Robbie Image ]

Captain Robbie
Founder — One Love

Master Mariner
US Sailing Instructor
PADI Divemaster

A lifetime on the water, a passion for adventure,
and a belief in building something real.

[ MEET CAPTAIN ROBBIE ]
```

Add social links where official URLs are provided.

Do not invent credentials, links, partnerships, or certifications.

------------------------------------------------------------------------

# 16. Token Transparency

Create `/token`.

Display:

``` text
ONE LOVE TOKEN

Network
Solana

Contract Address
F1r5AqRj8bJyzM4nUZpVBH1JQT8ToR4Rvjj2YwxHmoon

Token
$ONELOVE
```

Include buttons:

-   Copy contract
-   View on Solana explorer
-   View market
-   View liquidity

Also show verifiable information such as:

-   Supply
-   Burned tokens
-   Locked tokens
-   Liquidity
-   Holder count

Only display values obtained from reliable sources.

Do not fabricate verification badges or locked/burned amounts.

------------------------------------------------------------------------

# 17. Dashboard Layout

The main dashboard should resemble the supplied UI concept.

Desktop layout:

``` text
------------------------------------------------------------
| ONE LOVE | Overview | Chart | Staking | Game | Sailing |
|                                               Connect    |
------------------------------------------------------------

|                     HERO / SAILING                       |
|                    ONE LOVE                              |
|          COMMUNITY • FREEDOM • ADVENTURE                 |
|                 [ STAKE ] [ PLAY ]                       |
------------------------------------------------------------

| LIVE CHART              | STAKING                        |
|                         |                                |
| price                   | Staked balance                 |
| market cap              | Rewards                        |
| volume                  | APY                            |
| liquidity               | [STAKE] [UNSTAKE] [CLAIM]     |
|                         |                                |
------------------------------------------------------------

| GAME                    | LIVE ACTIVITY | LEADERBOARD   |
|                         |               |               |
| STAKE TO PLAY           | events        | daily         |
| [PLAY NOW]              |               | weekly        |
------------------------------------------------------------

|                 ONE LOVE SAILING                         |
------------------------------------------------------------

| CAPTAIN ROBBIE | REAL-WORLD PROJECT | SOCIALS           |
------------------------------------------------------------
```

------------------------------------------------------------------------

# 18. Responsive Design

Mobile is extremely important.

On mobile:

``` text
ONE LOVE
[Connect]

$ONELOVE LIVE

[Chart]

[Stake]
[Play]

Staking

Game

Live Activity

Leaderboard

One Love Sailing

Captain Robbie
```

Use bottom navigation if appropriate:

``` text
Home
Chart
Stake
Game
Wallet
```

Buttons should be large enough for mobile wallet interaction.

------------------------------------------------------------------------

# 19. UI Components

Build reusable components:

``` text
Navbar
WalletButton
WalletModal
Hero
MarketStats
PriceChart
TokenStats
StakingCard
StakeModal
UnstakeModal
ClaimModal
GameCard
GameEntryModal
Leaderboard
ActivityFeed
SailingSection
CaptainCard
TokenInfo
TransactionStatus
Toast
Footer
```

Use consistent spacing and typography.

------------------------------------------------------------------------

# 20. Transaction UX

Every blockchain action must provide clear feedback.

States:

``` text
Idle
↓
Preparing transaction
↓
Waiting for wallet approval
↓
Transaction submitted
↓
Confirming
↓
Confirmed
```

Success:

> Transaction confirmed.

Include:

**View transaction**

Error:

> Transaction failed. Please try again.

Never show a fake success state.

------------------------------------------------------------------------

# 21. Security

Follow these principles:

-   Never request private keys
-   Never request seed phrases
-   Never store private keys
-   Validate token mint addresses
-   Validate transaction accounts
-   Verify transaction signatures
-   Protect backend endpoints
-   Rate-limit leaderboard/activity endpoints
-   Validate all user input
-   Do not trust frontend game results
-   Do not use client-side randomness for financial outcomes
-   Separate staking and game funds
-   Use testnet/devnet extensively before mainnet
-   Get smart contracts/programs reviewed before handling meaningful
    user funds

------------------------------------------------------------------------

# 22. SEO / Metadata

Title:

**ONE LOVE --- Community • Freedom • Adventure**

Description:

> ONE LOVE is a Solana-based community connected to One Love Sailing,
> bringing together sailing, adventure, community and Web3.

Use Open Graph metadata.

Create:

-   favicon
-   OG image
-   Twitter/X card
-   sitemap
-   robots.txt

------------------------------------------------------------------------

# 23. Performance

Optimize:

-   Yacht images
-   Captain image
-   Logo
-   Chart rendering
-   Mobile loading
-   Wallet interactions

Use Next.js image optimization.

Lazy-load below-the-fold photography.

Do not allow huge background images to destroy mobile performance.

------------------------------------------------------------------------

# 24. Accessibility

Use:

-   Semantic HTML
-   Keyboard navigation
-   ARIA labels where needed
-   Accessible buttons
-   Visible focus states
-   Good contrast
-   Reduced-motion support

------------------------------------------------------------------------

# 25. Environment Variables

Use `.env.local`.

Never expose secrets in frontend code.

Example:

``` env
NEXT_PUBLIC_SOLANA_RPC_URL=
NEXT_PUBLIC_ONELOVE_MINT=
NEXT_PUBLIC_STAKING_PROGRAM_ID=
NEXT_PUBLIC_GAME_PROGRAM_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Any server-only secrets must use variables without `NEXT_PUBLIC_`.

------------------------------------------------------------------------

# 26. Suggested Project Structure

``` text
one-love/
├── app/
│   ├── page.tsx
│   ├── chart/
│   │   └── page.tsx
│   ├── staking/
│   │   └── page.tsx
│   ├── game/
│   │   └── page.tsx
│   ├── sailing/
│   │   └── page.tsx
│   ├── leaderboard/
│   │   └── page.tsx
│   ├── token/
│   │   └── page.tsx
│   └── api/
│
├── components/
│   ├── navbar/
│   ├── wallet/
│   ├── chart/
│   ├── staking/
│   ├── game/
│   ├── leaderboard/
│   ├── activity/
│   ├── sailing/
│   └── ui/
│
├── lib/
│   ├── solana/
│   ├── staking/
│   ├── game/
│   ├── market/
│   └── supabase/
│
├── public/
│   ├── images/
│   ├── logo/
│   └── fonts/
│
├── types/
├── hooks/
└── README.md
```

------------------------------------------------------------------------

# 27. Development Strategy

Build the project in this order:

## Phase 1 --- UI

First build the complete frontend using mock data.

Implement:

-   Navbar
-   Hero
-   Live chart placeholder
-   Staking UI
-   Game UI
-   Activity feed
-   Leaderboard
-   Sailing section
-   Captain section
-   Token page
-   Responsive mobile design

Do not connect fake blockchain transactions.

## Phase 2 --- Wallet

Add:

-   Solana wallet adapter
-   Phantom
-   Wallet balance
-   \$ONELOVE balance
-   Transaction status UI

## Phase 3 --- Market Data

Connect the live \$ONELOVE market-data source.

Remove all mock market numbers.

## Phase 4 --- Staking Program

Connect the real staking program.

Implement:

-   Stake
-   Unstake
-   Claim
-   Reward calculations
-   Transaction history

## Phase 5 --- Game Program

Only after the game rules are finalized:

-   Entry
-   Game/session creation
-   Outcome
-   Settlement
-   Claim
-   History

## Phase 6 --- Backend

Add:

-   Supabase
-   Leaderboards
-   Activity feed
-   Analytics
-   Realtime updates

## Phase 7 --- Security / Testing

Test:

-   Wallet connection
-   Failed transactions
-   Wrong network
-   Insufficient balance
-   Double submissions
-   Unstaking restrictions
-   Reward calculations
-   Game settlement
-   Mobile wallet flows

Then conduct appropriate smart-contract/security review before mainnet
use.

------------------------------------------------------------------------

# 28. Important Product Rules

Do NOT:

-   Fake market data
-   Fake wallet balances
-   Fake transaction confirmations
-   Fake APY
-   Fake game results
-   Fake user activity
-   Fake partnerships
-   Claim guaranteed profits
-   Make unsupported financial promises

The UI can use clearly labeled mock data during development, but
production must use real data.

------------------------------------------------------------------------

# 29. Final UX Goal

The finished website should feel like:

> **A real sailing community that has built a sophisticated Solana/Web3
> ecosystem around ONE LOVE.**

Not:

> "A casino website with a boat background."

The sailing identity should remain visible throughout the experience.

The user journey should be extremely simple:

``` text
DISCOVER ONE LOVE
        ↓
VIEW LIVE $ONELOVE CHART
        ↓
CONNECT WALLET
        ↓
STAKE ONELOVE
        ↓
EARN STAKING REWARDS
        ↓
OPTIONALLY ENTER GAME
        ↓
TRACK RESULTS
        ↓
CLAIM ELIGIBLE REWARDS
        ↓
EXPLORE ONE LOVE SAILING
```

------------------------------------------------------------------------

# 30. Build Instruction for Grok

Build this as a real Next.js + TypeScript application.

Start with the complete responsive UI and component architecture.

Use the supplied One Love images as the visual references.

Use mock data only where an external integration or blockchain program
is not yet available, and label development-only mock data clearly in
code.

Do not invent smart-contract addresses, market data, APY values, game
rules, or transaction results.

Keep the code modular so the actual Solana staking and game programs can
be connected later without rebuilding the UI.

The final result should be production-quality, responsive, polished,
fast, accessible, and visually faithful to the supplied One Love brand.

## Brand phrase

**ONE LOVE**

**COMMUNITY • FREEDOM • ADVENTURE**
