import EventManager from "./EventManager";
import {DynamicElements, Subscriptions} from "./Types";

export interface ElementInstructorInterface {
    getSubscribers(): Subscriptions;
}

export interface Constructable<T> {
    new(...args: any) : T;
}

/**
 * nimmt Elemente ids und das Attribut, die umgeschaltet werden müssen
 *
 * Beispiel:
 * ElementeInstructor.instruct({'elementId': {attributeKey: attributeValue}})
 *
 * das Element auf den originalen Zustand zurücksetzen * Beispiel
 * ElementeInstructor.instruct({'elementId': {attributeKey: attributeValue}}, true)
 */
export default abstract class ElementsInstructor extends HTMLElement implements ElementInstructorInterface {

    abstract getSubscribers(): Subscriptions;

    abstract dynamicElements: DynamicElements
    /**
     * @type EventManager
     */
    eventManager: EventManager;

    protected constructor() {
        super();
        this.eventManager = new EventManager()
    }

    /**
     * take elements Ids and the needed action
     *
     *
     * @param dynamicElements
     * @param reverseMode
     * @returns {Object}
     */
   public instruct(dynamicElements: DynamicElements, reverseMode: boolean = false): Object {
        const data: Object = {}

        for (let id in dynamicElements) {
            if (dynamicElements.hasOwnProperty(id)) {
                let el : any = document.getElementById(id);

                data[id] = el.value

                if (typeof dynamicElements[id] === 'object' && dynamicElements[id] !== null) {
                    for (let att in dynamicElements[id]) {
                        if (dynamicElements[id].hasOwnProperty(att)) {
                            let oldAttr = el[att]

                            if (typeof oldAttr === 'boolean') {
                                el[att] = reverseMode ? !dynamicElements[id][att] : dynamicElements[id][att]
                            } else if (att === 'classList') {
                                el.classList[reverseMode ? 'remove' : 'add'](dynamicElements[id][att])
                            } else if (dynamicElements[id][att] === 'clear' && !reverseMode) {
                                el[att] = ''
                            } else if (el[att] !== undefined) {

                                el[att] = reverseMode ? oldAttr.replace(dynamicElements[id][att], ' ') : oldAttr +
                                    ' ' +
                                    dynamicElements[id][att]
                            }
                        }
                    }
                }
            }
        }
        return data
    }
}

