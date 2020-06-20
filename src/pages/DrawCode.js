import React, { useState } from 'react';

import { Container, Grid, Form, TextArea, Button } from 'semantic-ui-react'
import { parseScript } from 'esprima';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import CodeEditor from '../components/CodeEditor'

import { BodyDeclaration } from '../utils/statement-symbolic-substitution/body-declaration-handler'

const DrawCode = () => {

    const [code, setCode] = useState('');
    const [parsedCode, setParsedCode] = useState({});
    const [payloads, setPayloads] = useState({});

    const handleRunCode = () => {
        setParsedCode(parseScript(code))

        setPayloads(new BodyDeclaration(parseScript(code).body, null, 0).body);
    }

    return (
        <Container>
            <Grid>
                <Button fluid onClick={handleRunCode} style={{ marginTop: '4vh' }}>Run Code</Button>
                <Grid.Column width={8} >

                    <CodeEditor
                        code={code}
                        setCode={setCode}
                    />


                    {/* <Form>
                        <TextArea
                            placeholder='Tell us more'
                            onChange={(event) => setCode(event.target.value)}
                            value={code}
                            style={{ minHeight: 300 }
                            } />
                    </Form> */}
                </Grid.Column>
                <Grid.Column width={8}>
                    <Form>
                        <pre
                            style={{
                                width: '300',
                                height: '300px',
                                overflow: 'scroll',
                            }}
                        >
                            {JSON.stringify(parsedCode, null, 2)}
                        </pre>
                    </Form>
                </Grid.Column>
            </Grid>

            <pre
                style={{
                    width: '100%',
                    height: '300px',
                    overflow: 'scroll',
                }}
            >
                {JSON.stringify(payloads, null, 2)}
            </pre>
        </Container>
    )
}

export default DrawCode;