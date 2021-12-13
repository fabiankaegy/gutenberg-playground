import { Sandpack, SandpackSetup, SandpackFile } from "@codesandbox/sandpack-react";

import gutenberg from './gutenberg';

type SandpackProps = {
    files: File[],
    setup?: SandpackSetup;
  };

type File = {
    name: string,
    code: string,
    active?: boolean,
    hidden?: boolean,
}

export default function GutenbergSandbox(props: SandpackProps) {
    let {files} = props;

    const allFiles = files.reduce(
        (result: Record<string, SandpackFile>, codeSnippet: File) => {

        let filePath; // path in the folder structure
        let fileHidden = false; // if the file is available as a tab
        let fileActive = false; // if the file tab is shown by default

        filePath = '/' + codeSnippet.name;
        fileHidden = !! codeSnippet.hidden
        fileActive = !! codeSnippet.active;
        
        if (result[filePath]) {
            throw new Error(
            `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
            );
        }
        result[filePath] = {
            code: codeSnippet.code,
            hidden: fileHidden,
            active: fileActive,
        };

        return result;
        },
        {}
    );

    allFiles['/styles.css'] = {
        code: [allFiles['/styles.css']?.code ?? ''].join('\n\n'),
        hidden: true,
    };

    allFiles['/index.js'] = { 
        code: gutenberg.index,
        hidden: true,
    }

    allFiles["/styles.css"] = { 
        code: gutenberg.style,
        hidden: true,
    }

    allFiles["/App.js"] = {
        code: gutenberg.app,
        hidden: true,
    }

    return (
        <Sandpack
            template="react"
            customSetup={{
                dependencies: {
					"@wordpress/block-editor": "^8.0.9",
					"@wordpress/block-library": "^6.0.13",
					"@wordpress/components": "^19.1.3",
					"@wordpress/editor": "^12.0.12",
					"@wordpress/element": "^4.0.4",
					"@wordpress/hooks": "^3.2.2",
					"@wordpress/html-entities": "^3.2.3",
					"@wordpress/icons": "^6.1.1",
					"@wordpress/blocks": "^11.1.4",
					"@wordpress/api-fetch": "^5.2.6",
					"@wordpress/dom-ready": "^3.2.3",
					"@wordpress/keyboard-shortcuts": "^3.0.6",
					"@wordpress/format-library": "^3.0.15",
				},
                files: allFiles
            }}
            options={{
				editorHeight: 600
			}}
        />
    );
}



