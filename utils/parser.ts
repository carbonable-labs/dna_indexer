// src/utils/eventMapping.ts
import { hash, uint256 } from "starknet";

export interface EventMember {
  name: string;
  type: string;
  kind: string;
}

export interface EventAbi {
  type: string;
  name: string;
  kind: string;
  members: EventMember[];
}

export class EventMapper {
  private eventsMap = new Map<bigint, EventAbi>();
  private nameMap = new Map<bigint, String>();

  constructor(abi: EventAbi[]) {
    this.initializeEventsMap(abi);
  }

  private initializeEventsMap(abi: EventAbi[]) {
    for (const event of abi) {
      const shortName = event.name.split("::").pop() || event.name;
      const selector = BigInt(hash.getSelector(shortName));
      this.eventsMap.set(selector, event);
      this.nameMap.set(selector, shortName);
      console.log(`✅ Loaded event: ${shortName} with selector ${selector}`);
    }
  }

  public getEventName(selector: string): string | undefined {
    const selectorBN = BigInt(selector);
    let name = this.nameMap.get(selectorBN);
    return name ? name.toString() : selector;
  }

  public createObjectFromAbi(selector: string, data: string[]): any {
    const selectorBN = BigInt(selector);
    const eventAbi = this.eventsMap.get(selectorBN);
    if (!eventAbi) {
      return { data };
    }

    let result: any = {};
    let dataIndex = 0;

    for (const member of eventAbi.members) {
      switch (member.type.split("::").pop()) {
        case "u256":
          result[member.name] = uint256
            .uint256ToBN({ low: data[dataIndex], high: data[dataIndex + 1] })
            .toString(10);
          dataIndex += 2;
          break;
        case "ContractAddress":
        case "ClassHash":
          result[member.name] = data[dataIndex];
          dataIndex += 1;
          break;
        case "u64":
        case "u32":
          result[member.name] = parseInt(data[dataIndex]);
          dataIndex += 1;
          break;
        case "bool":
          result[member.name] = Boolean(BigInt(data[dataIndex]));
          dataIndex += 1;
          break;
      }
    }

    return result;
  }
}
