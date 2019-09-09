import { printNodeToString,PrintNode } from '../PrintNode';
const node: PrintNode<any> = {
    color: 'red',
    marginTop: '12px',
    marginLeft: '1px',
    selector: [['$:hover', {
        color: 'green',
        marginTop: '20px',
        marginLeft: '21px',
    }], [
        '$:focus', {
            color: 'blue',
            marginTop: '2px',
            marginLeft: '3px',
        }
    ]],
    media: [
        [
            '@media screen and (max-width: 120em)',
            [
                [
                    '$:hover', {
                        color: 'red',
                        marginTop: '20px',
                        marginLeft: '21px',
                    }
                ],
                [
                    '$:focus', {
                        color: 'blue',
                        marginTop: '2px',
                        marginLeft: '3px',
                    }
                ]
            ]
        ]
    ]
}
describe('css print', () => {
    it('print', () => {
        expect(printNodeToString(node)).toMatchSnapshot();
    });
});