import EventManager from "../lib/EventManager";
import Foo from "../Foo/Foo"
import Bar from "../Foo/Bar"
import ValueResolver from "../lib/ValueResolver" // change the directoryWhere
const eventManager = new EventManager();
('body').subscribe('click', function(event){
	console.log('intersting', event);
	console.log(this.dataResolver.call(this,5))})
eventManager
	.setSubscribers( [Foo, Bar] )


