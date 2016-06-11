/*
 * TASK: Create a simple highlevel data model for a cascading menu bar
 * INPUT: List of menu id and mappings of id to it's parent menu
 * OUTPUT: List of top level nodes and list of all the nodes with their children ids mapped
 * Using ES6 syntax
*/

'use strict'

const _ids = [6, 7, 4, 3, 5, 2, 1];
const _mapping = {
  6: 4,
  7: 4,
  4: 3,
  3: -1,
  5: 2,
  2: 1,
  1: -1
}

const input = {
  ids: _ids,
  mapping: _mapping
}

const createDataModel = (input) => {
  let ids = input.ids;
  let mapping = input.mapping;
  let sourceNodes = [];
  let nodes = {};

  ids.forEach(id => {
    createNode(id, mapping, nodes, sourceNodes)
  })

  return {
    sourceNodes,
    nodes
  }
}

/*
 * Helper utility to create a node
 * If the parent node is not created, it recursively creates it
*/
const createNode = (id, mapping, createdNodes, sourceNodes) => {
  let parentId = mapping[id];

  //If the node is already created then return
  if(createdNodes[id])
    return;

  //Create a simple model for this id
  createdNodes[id] = {
    id,
    val: 'Item no: ' + id
  }

  //If the current id has no parents then push it to source nodes
  if(parentId === -1) {
    sourceNodes.push(createdNodes[id]);
    return;
  }

  //If the parent element for this node is not yet created,
  //then recursively create it
  if(!createdNodes[parentId]) {
    createNode(parentId, mapping, createdNodes, sourceNodes);
  }

  //Add the child element to its parent
  let parent = createdNodes[parentId];
  if(!parent.children){
    parent.children = [];
  }
  parent.children.push(createdNodes[id]);
}

let result = createDataModel(input);
console.log(result.nodes[4]);
