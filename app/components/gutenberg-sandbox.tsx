import { Children, ReactChildren, ReactElement } from "react";
import { Sandpack, SandpackSetup, SandpackFile } from "@codesandbox/sandpack-react";

import gutenberg from './gutenberg';

type SandpackProps = {
    children: ReactChildren;
    setup?: SandpackSetup;
  };

export default function GutenbergSandbox(props: SandpackProps) {
    let {children, setup} = props;
    let codeSnippets = Children.toArray(children) as ReactElement[];
    let isSingleFile = true;

    const files = codeSnippets.reduce(
        (result: Record<string, SandpackFile>, codeSnippet: ReactElement) => {

        // if (codeSnippet.props.mdxType !== 'pre') {
        //     return result;
        // }
        const {props} = codeSnippet.props.children;
        let filePath; // path in the folder structure
        let fileHidden = false; // if the file is available as a tab
        let fileActive = false; // if the file tab is shown by default

        console.log( props )
        if (props.metastring) {
            const [name, ...params] = props.metastring.split(' ');
            filePath = '/' + name;
            if (params.includes('hidden')) {
            fileHidden = true;
            }
            if (params.includes('active')) {
            fileActive = true;
            }
            isSingleFile = false;
        } else {
            throw new Error(
                `Code block is missing a filename: ${props.children}`
            );
        }
        if (result[filePath]) {
            throw new Error(
            `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
            );
        }
        result[filePath] = {
            code: props.children as string,
            hidden: fileHidden,
            active: fileActive,
        };

        return result;
        },
        {}
    );

    files['/styles.css'] = {
        code: [files['/styles.css']?.code ?? ''].join('\n\n'),
        hidden: true,
    };

    files['/index.js'] = { 
        code: gutenberg.index,
        hidden: true,
    }

    files["/styles.css"] = { 
        code: gutenberg.style,
        hidden: true,
    }

    files["/App.js"] = {
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
                files: files
            }}
            options={{
				editorHeight: 600
			}}
        />
    );
}



