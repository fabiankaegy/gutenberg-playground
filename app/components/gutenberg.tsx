
const indexCode = `
import React from 'react';
import ReactDOM from 'react-dom';

import "./blocks";

import * as blockEditor from '@wordpress/block-editor';
import * as components from '@wordpress/components';
import * as blockLibrary from '@wordpress/block-library';
import * as editor from '@wordpress/editor';
import * as element from '@wordpress/element';
import * as hooks from '@wordpress/hooks';
import * as htmlEntities from '@wordpress/html-entities';
import * as icons from '@wordpress/icons';
import * as blocks from '@wordpress/blocks';
import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';
import { Editor } from './App';

const wp = {
	components,
	blockEditor,
	blockLibrary,
	domReady,
	editor,
	element,
	hooks,
	htmlEntities,
	icons,
	apiFetch,
	blocks,
};

window.wp = wp;

ReactDOM.render(
	<Editor />,
	document.getElementById('root'),
);
`;

const styles = `
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	-webkit-font-smoothing: auto;
	-moz-font-smoothing: auto;
	-moz-osx-font-smoothing: grayscale;
	font-smoothing: auto;
	text-rendering: optimizeLegibility;
	font-smooth: always;
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
}
`

const gutenbergCode = `
import { useEffect, useState } from "@wordpress/element";
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockTools,
  WritingFlow,
  ObserveTyping
} from "@wordpress/block-editor";
import { Popover, SlotFillProvider } from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import { ShortcutProvider } from "@wordpress/keyboard-shortcuts";
import "@wordpress/format-library";
import { createBlock } from "@wordpress/blocks";

// CSS for editor
import "./styles.css";
import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";

// css for blocks
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/editor.css";
import "@wordpress/block-library/build-style/theme.css";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const Editor = () => {
  const [blocks, setBlocks] = useLocalStorage("block-list", [
    createBlock("example/block")
  ]);

  useEffect(() => {
    registerCoreBlocks();
  }, []);

  return (
    <ShortcutProvider>
      <SlotFillProvider>
        <BlockEditorProvider
          value={blocks}
          onInput={setBlocks}
          onChange={setBlocks}
        >
          <div className="playground__content">
            <BlockTools>
              <div className="editor-styles-wrapper">
                <BlockEditorKeyboardShortcuts.Register />
                <WritingFlow>
                  <ObserveTyping>
                    <BlockList />
                  </ObserveTyping>
                </WritingFlow>
              </div>
            </BlockTools>
          </div>
          <Popover.Slot />
        </BlockEditorProvider>
      </SlotFillProvider>
    </ShortcutProvider>
  );
};

`;

export default {
    index: indexCode,
    app: gutenbergCode,
    style: styles
}