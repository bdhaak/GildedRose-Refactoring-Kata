import { Item, GildedRose } from '@/gilded-rose';
import { describe, expect, test } from "@jest/globals";
import {verify, verifyAll, verifyAsJson} from "approvals/lib/Providers/Jest/JestApprovals";
import {verifyAllCombinations3} from "approvals/lib/Providers/Jest/CombinationApprovals";

describe('Gilded Rose', () => {
  
  // Original. Can be fixed easily. 
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    // expect(items[0].name).toBe('fixme');
    expect(items[0].name).toBe('foo');
  });

  // Step 1. Using approvals 
  it('should update quality', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    //expect(items[0].name).toBe('foo');
    verify(items[0].name);
  });

  // Step 2. Using approvals, json
  it('should update quality with json approvals', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    verifyAsJson(items[0]);
  });

  // Step 3. Using combination approvals
  it('should update quality with combination approvals', () => {  
    verifyAllCombinations3( updateQuality,
        ['Foo',
        'Aged Brie', 
        'Sulfuras, Hand of Ragnaros', 
        'Backstage passes to a TAFKAL80ETC concert'], 
        [-1, 0, 5, 6, 10, 11], 
        [0, 1, 49, 50, 51] );  
    
    });
});

function updateQuality(name: string, sellIn: number, quality: number) : string{
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  const qualityItem = items[0];
  return `${qualityItem.name}, ${qualityItem.sellIn}, ${qualityItem.quality}`;
}

