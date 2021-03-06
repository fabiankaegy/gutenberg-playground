# Gutenberg Playground

This is an Exploration to see how an interactive sandbox to explain Gutenberg concepts with live editor access could look. The hot module reloading currently works very well for changing something inside the JSX returned from the `edit.js` file. It is no where near perfect and the initial load of the editor is very slow but as a proof of concept this hopefully shows how this could work.

The editor itself is persistent through localstorage. Ideal it should get cleared when the sandbox is manually refreshed.

```js
<GutenbergSandbox 
  initialBlocks={[['example/block']]}
  files={[
      name: "blocks/index.js",
      active: true,
      code: "console.log( 'Hello World' )"
  ]]} />
```

## How does this work?
- At the heart of this is the [`<Sandpack />` package from codesandbox](https://sandpack.codesandbox.io).
- A custom wrapping react component is used to always add in a headless gutenberg instance simmilar to the [playground used in the Gutenberg Repo](https://github.com/WordPress/gutenberg/blob/trunk/storybook/stories/playground/index.js). 
- To make it nicer to write documentation the component is then used in a [MDX](https://mdxjs.com) file so it can live alongside the documentation.
- This is heavily inspired by the new [https://beta.reactjs.org](https://beta.reactjs.org) website which does [something simmilar](https://github.com/reactjs/reactjs.org/blob/014f4890dc30a3946c63f83b06883241ddc9bc75/beta/src/pages/learn/reacting-to-input-with-state.md?plain=1#L36-L132) in their docs.
