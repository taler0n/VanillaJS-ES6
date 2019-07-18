window.onload = init;

function Node(id, name, parent){
	this.children = [];
	this.parent = parent;
	this.id = id;
	this.name = name;
}

function init(){
	var namePrefix = "node_";
	var id = 0;
	var root = new Node(id, namePrefix + id);
	id++;
	var queue = [ root ];
	var current = 0;
	var maxSize = 16;
	var childCount = 2;

	while (queue.length <= maxSize - childCount){
		var item = queue[current];
		current++;

		for (var i = 0; i < childCount; i++) {
			var newNode = new Node(id, namePrefix + id, item);
			id++;
			queue.push(newNode);
			item.children.push(newNode);
		}
	}

	play(root, namePrefix);
}

function play(root, namePrefix){
	console.log("Valid finding predicates look something like: 'id === XX' or 'name === " + namePrefix + "XX'");

	while (true){
		var question = "Please, enter a finding predicate:";
		console.log(question);
		var predicate = prompt(question);

		if (predicate === null){
			break;
		} else {
			console.log(predicate);
			var answer = find(root, predicate);

			if (answer !== undefined && answer.hasOwnProperty("path")){
				console.log(answer.path);
			} else {
				console.log("Not found");
			}
		}
	}
}

function find(root, predicate){
	var queue = [ root ];
	var current = 0;

	while (current < queue.length){
		var node = queue[current];
		current++;

		if (eval("node." + predicate)){
			var output = { node: node, path: getPath(node) };
			return output;
		} else {
			for (var i = 0; i < node.children.length; i++) {
				queue.push(node.children[i]);
			}
		}
	}

	return undefined;
}

function getPath(node){
	var path = [];

	while (node.parent != undefined){
		path.push(node.parent.name);
		node = node.parent;
	}

	return path.reverse().join("/");
}