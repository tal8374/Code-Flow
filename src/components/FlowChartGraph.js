import React from 'react';
import { Flowchart, FlowchartConfig, Node } from 'react-flowchart.js';

const FlowChartGraph = ({ nodes }) => {
    // Nodes (required) - this is our list of nodes to display in the flowchart.
    // The properties "type", "id" and "label" are required. Connections are optional.
    // Note that the structure of connections vary based on the node type (eg. "condition" allows both "yes" and "no" connections).
    // Please see the flowchart.js README for documentation on this: https://github.com/adrai/flowchart.js#node-specific-specifiers-by-type
    // const nodes = [
    // {
    //     type: 'start',
    //     id: 'my_start_node',
    //     label: 'Start flow',
    //     state: 'highlighted', // Support for flowstate (allows you to modify the styling of a node based on this value)
    //     connection: {
    //         id: 'my_condition_node',
    //         position: 'bottom',
    //     },
    // },
    //     {
    //         type: 'condition',
    //         id: 'my_condition_node',
    //         label: 'True or false?',
    //         connections: {
    //             yes: {
    //                 id: 'dummy_node',
    //                 position: 'right',
    //             },
    //             no: {
    //                 id: 'my_operation_node',
    //                 position: 'bottom',
    //             },
    //         },
    //     },
    // {
    //     type: 'operation',
    //     id: 'my_operation_node',
    //     label: 'Foo operation',
    // },
    //     {
    //         type: 'inputoutput',
    //         id: 'dummy_node',
    //         label: 'Dummy',
    //         connection: {
    //             id: 'end',
    //             position: 'bottom',
    //         },
    //     },
    //     {
    //         type: 'end',
    //         id: 'end',
    //         label: 'End flow',
    //     },
    // ];

    // Config (optional) - here we configure the flowchart, eg. line width, font family, arrow type, yes and no texts, etc.
    const config = {
        lineWidth: 1,
        yesText: 'True',
        noText: 'False',
    };

    // Styles (optional) - here we define the base styling for our nodes based on the node type (the "type" property)
    const styles = {
        // condition: {
        //     fill: 'lightyellow',
        // },
        // operation: {
        //     fill: 'lightblue',
        //     'font-color': 'red',
        // },
        // inputoutput: {
        //     fill: 'green',
        //     'font-color': 'white',
        // },
    };

    // States (optional) - here we define styling for the flowstate defined on nodes (the "state" property)
    const states = {
        hasReached: {
            fill: 'green',
            'font-color': 'white',
        },
        hasNotReached: {
            fill: 'grey',
            'font-color': 'white',
        },
        falseTest: {
            fill: 'red',
            'font-color': 'white',
        },
        trueTest: {
            fill: 'green',
            'font-color': 'white',
        },
    };

    // OnClick (optional) - here we define a callback for when clicking a node
    const onClick = (item, mouseEvent) => {
        console.log('Item clicked:', item);
        console.log('Mouse event:', mouseEvent);
    };

    return (
        <div>
            <h1>Flowchart example</h1>
            <Flowchart
                nodes={nodes}
                config={config}
                styles={styles}
                states={states}
                onClick={onClick}
            />
        </div>
    );
};

export default FlowChartGraph;