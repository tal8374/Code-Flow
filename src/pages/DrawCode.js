import React, { useState } from 'react';

import { Container, Grid, Form, Button } from 'semantic-ui-react'
import { parseScript } from 'esprima';

import CodeEditor from '../components/CodeEditor'
import { BodyDeclaration } from '../utils/statement-payload/body-declaration-handler'
import { SymbolicSubstitutionHandler } from '../utils/statement-symbolic-substitution/symbolic-substitution-handler'

const DrawCode = () => {

    // let a = 2;
    // let b = a + 3;
    // function a() {
    //   return a + b + 1000;
    // }

    // let a = 1;
    // let b = a + 2


//     let a = 22;
//     function func(a) {
//     return 11;
//   }

    const [code, setCode] = useState(`
    
      func(1, a);
    `);
    const [parsedCode, setParsedCode] = useState({});
    const [payloads, setPayloads] = useState([]);

    const handleRunCode = () => {
        setParsedCode(parseScript(code))
        // setPayloads(new BodyDeclaration(parseScript(code).body).payloads);
        let payloads = new BodyDeclaration(parseScript(code).body).payloads;
        // new SymbolicSubstitutionHandler(payloads).doSymbolicSubstitution()
        setPayloads(payloads);
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