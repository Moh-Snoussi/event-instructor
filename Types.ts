export type dynamicAttributes = {classList: string} | { innerHTML: string} | { className: string} | { disabled: string} | {clear: string}

export type DynamicElements = {
	elementId: dynamicAttributes
} | {
	[elementId: string]: dynamicAttributes
}

export type EventFire = {
	name: string,
	fire: Function
}

export type Subscriptions = {
	/**
	 * used to allow "uniqueKey" to appear in the ide suggestion
	 */
	uniqueKey:
		{
			[elementId: string]:
				{
					[eventName: string]: {
						callBack: () => void
					}
				}
		}
} | {
	/**
	 * used to allow "elementId" to appear in the ide suggestion
	 * the elementId can be a document or window as well
	 */
	[uniqueKey: string]:
		{
			elementId:
				{
					[eventName: string]: {
						callBack: void
					}
				}
		},
} | {

	/**
	 * this type is used to autocomplete and suggest the eventName
	 * used to allow "eventName" to appear in the ide suggestion
	 */
	[uniqueKey: string]:
		{
			[elementId: string]:
				{
					eventName: {
						callBack: void
					}
				}
		}
} | {

	/**
	 * this type is used to autocomplete and suggest the eventName
	 * used to allow "eventName" to appear in the ide suggestion
	 */
	[uniqueKey: string]:
		{
			[elementId: string]:
				{
					[eventName: string]: {
						callBack: Function
					}
				}
		},
}




