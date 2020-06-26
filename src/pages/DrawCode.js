import React, { useState } from 'react';

import { Container, Grid, Form, Button } from 'semantic-ui-react'
import { parseScript } from 'esprima';

import CodeEditor from '../components/CodeEditor'
import { BodyDeclaration } from '../utils/statement-payload/body-declaration-handler'
import { SymbolicSubstitutionHandler } from '../utils/statement-symbolic-substitution/symbolic-substitution-handler'

const DrawCode = () => {


//     let a = 222;
// function func(b) {
//     if(false)
//         return 23232;
//     else if(true)
//         return 44444;
//     else if(false)
//         return 44444;
//     else
//         return 55555;
//     return b;
// }
// let c = func(3333);


    const [code, setCode] = useState(`
    if(1)
        c = 23232;
    else if(2)
        c = 44444;
    else if(3)
        c = 44444;
    else
        c = 55555;
    `);
    const [parsedCode, setParsedCode] = useState({});
    const [payloads, setPayloads] = useState([]);

    const handleRunCode = () => {
        setParsedCode(parseScript(code))
        // setPayloads(new BodyDeclaration(parseScript(code).body).payloads);
        let payloads = new BodyDeclaration(parseScript(code).body).payloads;
        // console.log(payloads)
        new SymbolicSubstitutionHandler(payloads).doSymbolicSubstitution()
        setPayloads(payloads);
        console.log(payloads)
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