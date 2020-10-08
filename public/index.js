import EventManager from "../lib/EventManager";
import ValueResolver from "../lib/ValueResolver" // change the directoryWhere
import Foo from "./../lib/Foo/Foo";
import Bar from "./../lib/Bar/Bar";
import FoBar from "./../fobar/Fobar"
const eventManager = new EventManager();
 ('body').subscribe('click', function(event){
console.log('intersting', event);
	console.log(this.dataResolver.call(this,5))})
eventManager
	.setSubscribers( [FoBar] )

	window.eventManager = eventManager



