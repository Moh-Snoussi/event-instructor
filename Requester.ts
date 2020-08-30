import 'whatwg-fetch'
import EventManager from "./EventManager";
import {EventFire} from "./Types";

type RequestType = {

	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
	method: MethodType,
	url?: string,
	body?: any
}

type MethodType = 'GET' | 'get' | 'POST' | 'post'

export default class Requester {

	/**
	 *
	 * @type {{message: string}}
	 */
	private static defaultError: { success: boolean, message: string } = {
		success: false,
		message: 'ein Fehler bei der Bearbeitung der Anfrage aufgetreten ist'
	}

	/**
	 *
	 * @param url
	 * @param data
	 * @param operation describe the intended operation (delete, update, edit ...)
	 * @param bodyStringify
	 * @returns {Promise<Response>}
	 */
	static async post(operation: string, url: string, data: Object = {}, bodyStringify: boolean = true): Promise<Response> {
		return await this.request(operation, url, data, 'POST', bodyStringify)
	}

	/**
	 *
	 * @param operation describe the intended operation (delete, update, edit ...)
	 * @param url
	 * @param data
	 * @returns {Promise<Response>}
	 */
	static async get(operation: string, url: string, data: Object = {}): Promise<Response> {
		return await this.request(operation, url, data);
	}

	/**
	 *
	 * @param operation describe the intended operation (delete, update, edit ...)
	 * @param url
	 * @param data
	 * @param method
	 * @param bodyStringify
	 * @returns {Promise<Response>}
	 */
	static async request(operation: string, url, data: any = {}, method: MethodType = 'GET', bodyStringify: boolean = true): Promise<Response> {
		const init = Requester.prepareRequest(data, method, url, bodyStringify)
		return fetch(init.url, init)
			.then(response => response.ok ? response.json() : this.defaultError)
			.then(result => {
				// assigning the operation that can be later accessed from the eventListeners
				result.operation = operation
				// firing the event
				if (result?.refreshNeeded === true) {
					this.responseReceivedSuccessEvent.fire.call(this, {message: 'Erfolg. <br>automatische Aktualisierung des Browsers'})
					setTimeout(function () {
						window.location.reload()
					}, 1000)
				} else if (result?.progress) {
					this.responseReceivedProgressEvent.fire.call(this, result)
				} else if (result?.success) {
					this.responseReceivedSuccessEvent.fire.call(this, result)
				} else {
					this.responseReceivedErrorEvent.fire.call(this, result)
				}

				Promise.resolve(result)
				return result
			})
			.catch(error => {
				error.operation = operation
				this.responseReceivedErrorEvent.fire.call(this, error)
			});
	}

	/**
	 *
	 * @param data
	 * @param url
	 * @param method
	 * @param stringify
	 */
	private static prepareRequest(data: any, method: MethodType, url: string, stringify: boolean = true): RequestType {
		const params: RequestType = {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			method: method
		}

		if (method === 'GET' && Object.keys(data).length > 0) {
			url += new URLSearchParams(data).toString()
		} else if (method === 'POST') {
			if (stringify) {
				data = JSON.stringify(data);
			}
			params.body = data
		}

		params.url = url

		return params
	}


	/**
	 *
	 * @type {{name: string, fire: Requester.responseReceivedSuccessEvent.fire}}
	 */
	static responseReceivedSuccessEvent: EventFire = {
		name: 'responseReceivedSuccess',
		fire: function (oldEvent: Event): void {
			// this function is called in an event handler used the .call(this) therefore the "this" reference the class object
			const event = Requester.responseReceivedSuccessEvent
			const eventManager = new EventManager()
			eventManager.fire(event.name, oldEvent)
		}
	}


	/**
	 *
	 * @type {{name: string, fire: Requester.responseReceivedSuccessEvent.fire}}
	 */
	static responseReceivedProgressEvent: EventFire = {
		name: 'responseReceivedProgress',
		fire: function (oldEvent: Event): void {
			// this function is called in an event handler used the .call(this) therefore the "this" reference the class object
			const event = Requester.responseReceivedProgressEvent
			const eventManager = new EventManager()
			eventManager.fire(event.name, oldEvent)
		}
	}


	/**
	 *
	 * @type {{name: string, fire: Requester.responseReceivedErrorEvent.fire}}
	 */
	static responseReceivedErrorEvent: EventFire = {
		name: 'responseReceivedError',
		fire: function (oldEvent: Event): void {
			// this function is called in an event handler used the .call(this) therefore the "this" reference the class object
			const event = Requester.responseReceivedErrorEvent
			const eventManager = new EventManager()
			eventManager.fire(event.name, oldEvent)
		}
	}
}

