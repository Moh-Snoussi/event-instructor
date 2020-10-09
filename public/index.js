import EventManager from "../lib/EventManager";
import ValueResolver from "../lib/ValueResolver" // change the directoryWhere
import Foo from "./../lib/Foo/Foo";
const eventManager = new EventManager();

// ('body').subscribe('click', function(event){
// 	console.log('intersting', event);
// 	console.log(this.dataResolver.call(this,5))})
	eventManager
	.setSubscribers( [Foo] )
	
	window.eventManager = eventManager
	window.foo = Foo



