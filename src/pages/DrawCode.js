import React, { useState } from 'react';

import { Container, Grid, Form, Button } from 'semantic-ui-react'
import { parseScript } from 'esprima';

import CodeEditor from '../components/CodeEditor'
import FlowChartGraph from '../components/FlowChartGraph'
import { BodyDeclaration } from '../utils/statement-payload/body-declaration-handler'
import { SymbolicSubstitutionHandler } from '../utils/statement-symbolic-substitution/symbolic-substitution-handler'
import { FlowChartHandler } from '../utils/flow-chart/flow-chart-handler'
import { ColorHandler } from '../utils/color-condition/color-handler'

const DrawCode = () => {

    // let a = 1;
    // while(1 < 2) {
    //     let c = 33;
    //     let f = 44;
    // }

    // if(1 < 2){
    //     let a = 1;
    //     let a = 2;
    // } else if (1 > 2) {
    //     let b = 1;
    //     let b = 3;
    // } else {
    //     let c = 1;
    //     let c = 4;
    // }

    // let b = 2;

    const [code, setCode] = useState(`

    let a1 = 2;
    
    while(a1 < 3){
      a1 = 22;
    }
    
    if(1 < 2){
        let a2 = 1;
        let a3 = 1;
    } else if(2 > 3) {
        let a4 = 2;
        let a5 = 2;
    } else if(3 > 4) {
        let a5 = 2;
        let a6 = 2;
    } else if(4 > 5) {
        let a6 = 2;
        let a7 = 2;
    } else {
        let a8 = 1;
        let a9 = 1;
    }

    let a10 = 3;
    
    `);
    const [parsedCode, setParsedCode] = useState({});
    const [payloads, setPayloads] = useState([]);
    const [nodes, setNodes] = useState([]);

    const handleRunCode = () => {
        setParsedCode(parseScript(code))
        // setPayloads(new BodyDeclaration(parseScript(code).body).payloads);
        let payloads = new BodyDeclaration(parseScript(code).body).payloads;
        new SymbolicSubstitutionHandler(payloads).doSymbolicSubstitution()
        new ColorHandler(payloads).colorCode()
        let flowChartPayloads = new FlowChartHandler(payloads).createFlowChartObjects()
        let connections = new FlowChartHandler(flowChartPayloads).connect()
        
        let start = {
            type: 'start',
            id: 'my_start_node',
            label: 'Start',
            state: 'highlighted', // Support for flowstate (allows you to modify the styling of a node based on this value)
            connection: {
                id: 'my_condition_node',
                position: 'bottom',
            },
        }
        if (connections.length == 0)
        return;
        
        start.connection.id = connections[0].id;
        connections = [start, ...connections]
        setNodes(connections);
        setPayloads(payloads);
        console.log(payloads);
    }

    return (
        <Container>
            <FlowChartGraph nodes={nodes} />
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