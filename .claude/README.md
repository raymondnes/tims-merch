# Claude Code Agents & Skills for tims-merch

This directory contains custom subagents and skills configured for the tims-merch Next.js e-commerce project.

## Directory Structure

```
.claude/
├── agents/              # Custom subagents
│   ├── component-builder.md
│   ├── api-builder.md
│   └── code-reviewer.md
├── skills/              # Autonomous skills
│   ├── test-generator/
│   │   └── SKILL.md
│   └── accessibility-checker/
│       └── SKILL.md
└── README.md           # This file
```

## Subagents

Subagents are specialized AI assistants you can explicitly invoke for specific tasks.

### 1. component-builder

**Purpose**: Creates React components following Next.js 14+ and Tailwind CSS best practices.

**Use when**:
- Building new UI components
- Creating pages or layouts
- Need to follow project patterns

**How to use**:
```
"Use the component-builder subagent to create a ProductCard component"
```

**Features**:
- Server/Client component patterns
- Tailwind CSS styling
- TypeScript type safety
- Responsive design
- Accessibility built-in

### 2. api-builder

**Purpose**: Creates Next.js API routes and server actions for backend functionality.

**Use when**:
- Building REST API endpoints
- Creating server actions
- Implementing data validation
- Setting up database operations

**How to use**:
```
"Use the api-builder subagent to create a /api/products endpoint"
```

**Features**:
- Input validation with Zod
- Proper error handling
- Security best practices
- Type-safe implementations
- E-commerce patterns (cart, checkout, orders)

### 3. code-reviewer

**Purpose**: Reviews code for quality, security, performance, and accessibility.

**Use when**:
- Before committing changes
- Creating pull requests
- Code audits
- Identifying issues

**How to use**:
```
"Use the code-reviewer subagent to review my recent changes"
```

**Features**:
- Security vulnerability detection
- Performance analysis
- Accessibility checks
- Best practices enforcement
- E-commerce specific checks

## Skills

Skills are autonomous capabilities that Claude activates automatically when your request matches their purpose.

### 1. test-generator

**Purpose**: Generates comprehensive tests using Jest and React Testing Library.

**Activates when**:
- You ask to "write tests"
- You mention "test coverage"
- You want to test specific functionality

**What it does**:
- Component tests (RTL)
- API route tests
- Server action tests
- Utility function tests
- E-commerce flow tests (cart, checkout)

**Example prompts**:
- "Write tests for the ProductCard component"
- "Add test coverage for the checkout flow"
- "Test the cart API endpoints"

### 2. accessibility-checker

**Purpose**: Reviews code for WCAG 2.1 AA accessibility compliance.

**Activates when**:
- You mention "accessibility" or "a11y"
- You ask about WCAG compliance
- You want to check keyboard navigation
- You mention screen readers

**What it does**:
- Semantic HTML review
- ARIA attribute validation
- Keyboard navigation testing
- Color contrast checking
- Screen reader compatibility
- E-commerce accessibility patterns

**Example prompts**:
- "Check accessibility of the checkout form"
- "Make this component more accessible"
- "Review for WCAG compliance"

## How to Use

### Invoking Subagents

You can explicitly request a subagent:
```
"Use the component-builder subagent to create a Header component"
"Ask the api-builder to create the cart API"
"Have the code-reviewer check my changes"
```

Or I'll automatically choose the right subagent based on your request.

### Using Skills

Skills activate automatically - just describe what you need:
```
"Write tests for ProductCard" → test-generator activates
"Check if this is accessible" → accessibility-checker activates
```

### Viewing Available Agents

Run this command in Claude Code:
```
/agents
```

## Project-Specific Context

All agents and skills are configured for:
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Project Type**: E-commerce merch store
- **Key Features**: Products, cart, checkout, orders

## Customizing Agents

To modify an agent:
1. Open the `.md` file in `.claude/agents/`
2. Edit the YAML frontmatter (name, description, tools, model)
3. Modify the instructions in the markdown content
4. Save and use

To create a new agent:
1. Run `/agents` in Claude Code
2. Select "Create New subagent"
3. Follow the prompts

## Best Practices

1. **Use the right tool**:
   - Building UI? → component-builder
   - Building API? → api-builder
   - Reviewing code? → code-reviewer
   - Need tests? → test-generator (auto-activates)
   - Checking a11y? → accessibility-checker (auto-activates)

2. **Be specific** in your requests:
   - ✅ "Create a ProductCard component with image, title, price, and add-to-cart button"
   - ❌ "Make a product thing"

3. **Combine agents** for complex tasks:
   ```
   1. Use component-builder to create component
   2. Use test-generator to write tests
   3. Use accessibility-checker to verify a11y
   4. Use code-reviewer to audit everything
   ```

4. **Iterate**: If the output isn't perfect, ask for refinements

## Tips

- Agents have access to your codebase, so they'll follow existing patterns
- They can read other files to maintain consistency
- Skills are context-aware and understand your project structure
- All agents follow TypeScript, Tailwind, and Next.js 14+ best practices

## Need Help?

Ask me:
- "How do I use the component-builder?"
- "What agents are available?"
- "Show me examples of using the test-generator"
- "Can you create a new agent for [specific task]?"

Or run `/agents` to see all available agents and create new ones.

---

**Note**: These agents and skills are stored in your project's `.claude/` directory. Commit them to git to share with your team!
