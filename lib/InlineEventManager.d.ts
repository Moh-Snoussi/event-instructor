import EventManager from "./EventManager";
export default class InlineEventManager {
    /**
     *
     */
    private eventManager;
    /**
     *
     * @param eventManager
     */
    constructor(eventManager: EventManager);
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringSubscriber;
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringEventValueResolver;
    private handleInlineSubscriber;
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringUnsubscriber;
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringUnresolve;
    private setStringSubscribeOnes;
}
//# sourceMappingURL=InlineEventManager.d.ts.map