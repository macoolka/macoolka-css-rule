
import { getMediaInfo, sort } from '../mapPrintNode';
import {
    PrintNode
} from '../../PrintNode';
describe('css', () => {
    it('getMediaInfo', () => {
        expect(getMediaInfo('@media screen and (max-width: 70em)&hover')).toEqual({ "name": "&hover", "value": 70 });
        expect(getMediaInfo('@media screen and (max-width: 70em) &hover ')).toEqual({ "name": "&hover", "value": 70 });
        expect(getMediaInfo('@media screen and (max-width: 80em)')).toEqual(80);
        expect(getMediaInfo('@media screen and (max-width: em)')).toEqual('@media screen and (max-width: em)');
        expect(getMediaInfo('&hover')).toEqual('&hover');

    });
    it('orderSelector', () => {
        const a: [string, PrintNode<any>][] = [
            ['@media screen and (max-width: 80em)', { color: 3 }],
            ['hover', { color: 0 }],
            ['@media screen and (max-width: 93em)', { color: 2 }],
            ['@media screen and (max-width: 50em)', { color: 4 }],
            ['@media screen and (max-width: 120em)', {
                color: 1,
            }]]
        expect(a.sort(sort)
        ).toEqual([
            ["hover", { "color": 0 }],
            ["@media screen and (max-width: 120em)", { "color": 1 }],
            ["@media screen and (max-width: 93em)", { "color": 2 }],
            ["@media screen and (max-width: 80em)", { "color": 3 }],
            ["@media screen and (max-width: 50em)", { "color": 4 }]
        ]);
    });
});
