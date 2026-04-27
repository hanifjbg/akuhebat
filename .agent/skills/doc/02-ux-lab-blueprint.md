# UX-Lab Blueprint: AKU HEBAT PWA

## 1. Core Principles
- **No Direct Deploy**: All components MUST be built and tested in `/ux-lab` before integration into `/pages/main` or `/pages/admin`.
- **CVA & State Matrix**: Every component must use `class-variance-authority` and support:
  - States: idle, hover, active, focus, disabled, loading, error, empty.
  - Sizes: sm, md, lg (where applicable).
- **Animations**: Driven by `framer-motion` (springs).

## 2. Component Inventory
- **Atoms**: Button, Input, Label, Icon, Badge, Avatar, Spinner, Skeleton, Divider, ProgressBar, Checkbox, Radio, Switch, Slider, Tooltip.
- **Molecules**: SearchBar, FormField, CardHeader, NavItem, QuizOption, Toast, AlertDialog, DropdownMenu, Select, Tabs, Sheet, AvatarGroup, Timer, WordCard, StarRating.
- **Organisms**: TopBar, BottomBar, LevelMap, QuizCard, QuizReport, ProfileCard, FriendCard, LeaderboardTable, MemoryBoard, BalloonField, WordBuilder, ColoringCanvas, PuzzleBoard, VersusPanel, TracingCanvas, StoryBook, KaraokeScreen, DanceScreen.

## 3. Page Inventory (~40 Pages)
### Auth & Kids Management
- Parental Gate, Login, Select Child, Add Child, Profile.
### Learning & Games
- Level Map, Quiz Screen, Quiz Result, Level Up Reward, Badges, Dailies.
- Word Builder, Memory Match, Balloon Pop, Letter Tracing, Sound Quiz, Coloring, Puzzle.
- Story Time, Karaoke, Dance & Learn.
### Match & Social
- Friend List, Friend Profile, Challenge Invite/Accept, Match Lobby, Versus Arena, Leaderboard.
### Admin & System
- Admin Login, Admin Dashboard, Word Bank Manager, Add Word, Child Report.
- 404, Under Construction, Error Boundary.

## 4. Dev Navigation Tool
- Floating tool strictly for `NODE_ENV === 'development'`.
- Toggles global UI states (Loading, Error, Empty).
- Quick links to all UX-Lab pages.
