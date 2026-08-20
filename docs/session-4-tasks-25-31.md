# Portfolio V2 Implementation - Session 4: AI Chat Feature

## Context

I'm building a new portfolio website (complete rewrite) using Next.js 15 + React 19 + TypeScript. This is **Session 4** of the implementation.

**Project Location:** `/Users/ciciwoolf/Dev/portfolio-v2`

**Implementation Plan:** `/Users/ciciwoolf/Dev/3d-portfolio/docs/changes/portfolio-rewrite/plans/2026-08-16-portfolio-v2-plan.md`

## What's Already Done

**Session 1 (Tasks 1-5):** Foundation setup complete
**Session 2 (Tasks 6-20):** Core layout, UI components, and content sections complete
**Session 3 (Tasks 21-24):** 3D scene with placeholder cube complete

**Current State:**
- Complete portfolio with Navigation, Footer, Hero (with 3D scene), Projects, Skills, Resume sections
- Three.js scene rendering with rotating cube placeholder
- All UI components and content sections working
- Ready for AI chat integration

## Tasks for This Session (Tasks 25-31)

### Task 25: Migrate background data

**Files:** `content/background.json`

**Migrate from old portfolio:**
- Source: `/Users/ciciwoolf/Dev/3d-portfolio/src/data/background.json`
- Copy experience, education, certifications arrays
- Review and update dates/descriptions as needed

**Verify:** JSON file is valid and readable

**Commit:** `feat(content): migrate background data for AI context`

### Task 26: Create AI utility with OpenAI integration and tests

**Files:** `lib/ai.ts`, `lib/ai.test.ts`

**Create AI utility:**
- Import OpenAI SDK
- Create `getAIResponse()` function:
  - Takes: `messages: ChatMessage[]`
  - Returns: `Promise<string>`
  - Uses GPT-4 model
  - System prompt: Professional developer assistant with background context
  - Loads background.json for context
  - Error handling with user-friendly messages
- Export type `ChatMessage` from OpenAI types

**Create test:**
- Mock OpenAI SDK
- Test successful response
- Test error handling
- Use @testing-library/react

**Environment variable:**
- Requires `OPENAI_API_KEY` in `.env.local`
- Already set up in Task 4

**Verify:** `npm test -- --run` passes

**Commit:** `feat(ai): create OpenAI integration utility with tests`

### Task 27: Create chat API route

**Files:** `app/api/chat/route.ts`

**Create POST endpoint:**
- Import `getAIResponse` from lib/ai
- Accept POST with body: `{ messages: ChatMessage[] }`
- Validate request body
- Call `getAIResponse(messages)`
- Return streaming response using OpenAI streaming
- Error handling: Return 400/500 with proper error messages
- Use Next.js 15 route handler syntax

**Security:**
- Server-side only (no client API key exposure)
- Rate limiting considerations (for future enhancement)

**Verify:** Test with curl or Postman:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

**Commit:** `feat(api): create chat API route with streaming support`

### Task 28: Create ChatMessage component

**Files:** `components/chat/ChatMessage.tsx`

**Create message bubble:**
- Props: `role: 'user' | 'assistant'`, `content: string`
- Different styling for user vs assistant
- User: Right-aligned, primary color background
- Assistant: Left-aligned, secondary color background
- Markdown rendering for assistant messages (use `react-markdown`)
- Add `react-markdown` dependency if not installed

**Styling:**
- Rounded corners
- Padding and margin for readability
- Responsive text sizing

**Verify:** Component renders in Storybook or test page

**Commit:** `feat(chat): create ChatMessage component with markdown support`

### Task 29: Create ChatInput component

**Files:** `components/chat/ChatInput.tsx`

**Create input field:**
- Props: `onSend: (message: string) => void`, `disabled: boolean`
- Controlled textarea component
- Send button (or Enter key to send, Shift+Enter for newline)
- Auto-resize textarea based on content
- Disable input while message is sending
- Clear input after sending

**Accessibility:**
- Proper ARIA labels
- Focus management
- Keyboard navigation

**Verify:** Input works in isolation

**Commit:** `feat(chat): create ChatInput component with auto-resize`

### Task 30: Create ChatWindow component with tests

**Files:** `components/chat/ChatWindow.tsx`, `components/chat/ChatWindow.test.tsx`

**Create chat window:**
- State management: `messages` array, `isLoading` boolean
- Display messages using ChatMessage component
- ChatInput at bottom
- Handle message sending:
  - Add user message to state
  - Set `isLoading = true`
  - POST to `/api/chat`
  - Stream response and update assistant message
  - Set `isLoading = false`
- Auto-scroll to bottom on new messages
- Error handling with user-friendly toast/message

**Styling:**
- Fixed height with scrollable messages area
- Messages list and input clearly separated
- Loading indicator while waiting for response

**Create test:**
- Test message sending flow
- Test error handling
- Mock fetch API

**Verify:** `npm test -- --run` passes

**Commit:** `feat(chat): create ChatWindow component with streaming support`

### Task 31: Create ChatWidget component and integrate into layout

**Files:** `components/chat/ChatWidget.tsx`, `app/layout.tsx` (update)

**Create floating widget:**
- Toggle button: Fixed position bottom-right
- Icon: Chat bubble or message icon (use emoji or SVG)
- Click to open/close chat window
- State: `isOpen` boolean
- Animated open/close transition (Framer Motion)
- Z-index high enough to float above content

**Chat window when open:**
- Render ChatWindow component
- Positioned bottom-right, above toggle button
- Width: 400px (desktop), 100vw (mobile)
- Height: 600px (desktop), 100vh (mobile)
- Shadow and border for depth

**Mobile behavior:**
- Full-screen modal on mobile
- Close button visible
- Proper scroll behavior

**Update layout:**
- Import ChatWidget
- Add to root layout after children
- Client component, so use dynamic import with `ssr: false`

**Verify:**
- Widget appears bottom-right
- Clicking toggles chat window
- Can send messages and receive responses
- Works on desktop and mobile viewports

**Commit:** `feat(chat): create ChatWidget and integrate into layout`

## Important: OpenAI API Key

⚠️ **You must add your OpenAI API key to `.env.local`:**

```bash
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

Without this, the chat feature will fail with authentication errors.

**To get an API key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy and paste into `.env.local`
4. Restart dev server

## Dependencies

Task 28 requires `react-markdown`:

```bash
npm install react-markdown
```

## Success Criteria

By the end of this session:
- ✅ Background data migrated for AI context
- ✅ AI utility with OpenAI integration tested
- ✅ Chat API route working with streaming
- ✅ Chat UI components complete (Message, Input, Window)
- ✅ Floating chat widget integrated in layout
- ✅ Can have full conversation with AI assistant
- ✅ Assistant knows about your background/experience
- ✅ Responsive on desktop and mobile
- ✅ All tests passing: `npm test -- --run`
- ✅ No console errors
- ✅ Build succeeds: `npm run build`

## How to Execute

1. **Start:** `cd /Users/ciciwoolf/Dev/portfolio-v2`
2. **Read Tasks 25-31** in the implementation plan
3. **Follow exact code** from plan for each task
4. **Install dependencies:** `npm install react-markdown`
5. **Set up API key:** Add `OPENAI_API_KEY` to `.env.local`
6. **Commit after each task** with exact commit messages
7. **Test continuously:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Click chat widget in bottom-right
   # Test conversation flow
   npm test -- --run
   ```

## Troubleshooting

**If chat widget doesn't appear:**
- Check browser console for errors
- Verify ChatWidget is dynamically imported with `ssr: false` in layout.tsx
- Check z-index is high enough (e.g., 1000)

**If API returns 401 Unauthorized:**
- Verify `OPENAI_API_KEY` is set in `.env.local`
- Restart dev server after adding env variable
- Check API key is valid at https://platform.openai.com/api-keys

**If responses are slow:**
- This is expected - OpenAI API can take 2-5 seconds
- Streaming should show incremental updates
- Consider adding loading indicator

**If responses are generic:**
- Verify background.json is being loaded correctly
- Check system prompt includes background context
- Review AI utility implementation

## Reference: Old Portfolio AI Implementation

For inspiration (but don't copy - we're building fresh with server-side API):
- Old chat component: `/Users/ciciwoolf/Dev/3d-portfolio/src/components/ChatWidget.tsx`
- Old background data: `/Users/ciciwoolf/Dev/3d-portfolio/src/data/background.json`

**Key difference:** New implementation uses server-side API route (more secure), old implementation exposed API key client-side.

## Next Session

**Session 5 (Tasks 32-39):** Blog scaffold with MDX, E2E tests, documentation, deployment

---

**Let's add the AI chat feature!**
