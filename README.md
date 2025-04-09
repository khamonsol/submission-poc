# @beyond/submission

A Single-SPA microfrontend module built with Rollup, designed to coexist with Webpack-based SystemJS modules.

## Development

This project supports two development modes:

### 1. MFE Development (Default)
```bash
npm run dev
```
Starts the Rollup-based development server for microfrontend integration at `http://localhost:3000`.

### 2. Component Development (Vite)
```bash
npm run dev:vite
```
Starts a Vite development server at `http://localhost:5173` for:
- Using shadcn/ui CLI
- Rapid component development
- UI testing

## Key Differences from Webpack MFEs

### 1. Build System: Rollup vs Webpack

This microfrontend uses Rollup instead of Webpack, offering several advantages:

- **Smaller Bundle Size**: Rollup's tree-shaking is more aggressive than Webpack's, resulting in smaller output files
- **Simpler Configuration**: Rollup configuration is more straightforward and focused on ES modules
- **Better Code Splitting**: More efficient handling of external dependencies through the SystemJS format

### 2. Module Format

While Webpack MFEs typically use UMD format, this module:
- Uses the SystemJS format explicitly (`format: 'system'` in Rollup config)
- Properly declares external dependencies that are loaded via SystemJS
- Maintains compatibility with existing Webpack modules through careful dependency management

### 3. External Dependencies Handling

Key differences in how dependencies are managed:

```javascript
// Rollup config externals
external: [
  'react',
  'react-dom',
  'single-spa-react',
  '@radix-ui/react-icons',
  '@radix-ui/react-slot',
  /^@radix-ui\/.*/,
  'date-fns',
  'papaparse',
  '@tanstack/react-table'
]
```

- All shared dependencies are marked as external
- Dependencies are loaded through SystemJS import maps
- No bundling of common libraries, reducing duplicate code

### 4. SystemJS Integration

The module integrates with SystemJS through:

1. Proper SystemJS format output
2. Explicit globals mapping:
```javascript
globals: {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'single-spa-react': 'singleSpaReact',
  '@radix-ui/react-icons': 'RadixUIReactIcons',
  '@radix-ui/react-slot': 'RadixUIReactSlot'
}
```

### 5. Development Server

Uses a custom Express server that:
- Serves the static files
- Watches for changes using Rollup in watch mode
- Implements proper CORS and CSP headers for microfrontend compatibility

## Technical Implementation Details

### SystemJS Compatibility Layer

To ensure compatibility with Webpack-based modules:

1. All dependencies are loaded through SystemJS import maps
2. The module is built as a SystemJS module
3. External dependencies are properly declared and mapped

### Import Map Configuration

Required import map configuration in the root application:

```json
{
  "imports": {
    "@beyond/submission": "http://localhost:3000/beyond-submission.js",
    "react": "https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js",
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.5/lib/system/single-spa.min.js",
    "single-spa-react": "https://cdn.jsdelivr.net/npm/single-spa-react@5.1.4/lib/system/single-spa-react.min.js"
  }
}
```

### Integration

Register the application in your Single-SPA root config:

```javascript
registerApplication({
  name: "@beyond/submission",
  app: () => System.import("@beyond/submission"),
  activeWhen: ["/submission"]
});
```

## Key Technical Decisions

1. **Dual Development Environment**
   - Rollup for MFE production builds
   - Vite for rapid component development
   - shadcn/ui CLI support through Vite

2. **Development Servers**
   - Express server (port 3000) for MFE development
   - Vite server (port 5173) for component development

3. **Dependencies**
   - All Radix UI components are loaded externally in MFE mode
   - React and ReactDOM are shared through SystemJS in MFE mode
   - Full bundling in Vite mode for component development

## Benefits of This Approach

1. **Flexible Development**: Choose between MFE and component development modes
2. **Reduced Bundle Size**: Only application code is bundled in MFE mode
3. **Better Caching**: Shared dependencies are cached across MFEs
4. **Consistent Dependencies**: No version conflicts with other MFEs
5. **Modern Development**: Full TypeScript and modern tooling support

## Limitations and Considerations

1. All external dependencies must be available in SystemJS format for MFE mode
2. Careful version management of shared dependencies is required
3. Development server needs proper CORS and CSP configuration
4. Different behavior between development modes (bundled vs. external dependencies)