const topics = [
    //Array
  { id: 'array', icon: '▦', 
    name: 'Array Operations',
    desc: 'Insert, delete, and search values.', 
    detail: 'Work with a list of values and access items by index.' },
    
    //LINKED LIST
  { id: 'linked', icon: '⛓',
    name: 'Linked List',
    desc: 'Add and remove nodes in sequence.', 
    detail: 'Practice linked-list insertion, deletion, and traversal.' },

    //STACKS
  { id: 'stack', 
    icon: '▤', 
    name: 'Stack', 
    desc: 'Push, peek, and pop (LIFO).', 
    detail: 'The last item added is the first item removed.' },

    //QUEUES
  { id: 'queue', 
    icon: '⇥', 
    name: 'Queue', 
    desc: 'Enqueue and dequeue (FIFO).', 
    detail: 'The first item added is the first item removed.' },

    //TREE
  { id: 'tree', 
    icon: '🌳', 
    name: 'Binary Tree', 
    desc: 'Build a tree and view its structure.', 
    detail: 'Create a binary tree with a root and optional children.' },

    //GRAPH
  { id: 'graph', 
    icon: '◎', 
    name: 'Graph', 
    desc: 'Create vertices and connect edges.', 
    detail: 'Build an undirected graph and view its adjacency list.' },
  
    //LINEAR SEARCH
    { id: 'linear', 
    icon: '⌕', 
    name: 'Linear Search', 
    desc: 'Find a target by checking each item.', 
    detail: 'Search through values from left to right.' },

    //BUBBLE SORT
  { id: 'bubble', 
    icon: '↕', 
    name: 'Bubble Sort', 
    desc: 'Sort values by swapping neighbors.', 
    detail: 'Watch a list become sorted in ascending order.' },

    //QUICK SORT
  { id: 'quick', 
    icon: '⚡', 
    name: 'Quick Sort', 
    desc: 'Sort using a pivot strategy.', 
    detail: 'Partition values around a pivot, then sort each side.' },

    //TRAVERSAL
  { id: 'traversal', 
    icon: '⑂', 
    name: 'Tree Traversals', 
    desc: 'Inorder, preorder, and postorder.', 
    detail: 'Enter a tree in level-order, then compare traversal sequences.' }
];

let current = 'array';
const $ = id => document.getElementById(id);

function renderCards() {
  $('cards').innerHTML = topics.map((t, i) => `
    <button class="card ${t.id === current ? 'active' : ''}" data-topic="${t.id}">
      <span class="number">${String(i + 1).padStart(2, '0')}</span>
      <div class="icon">${t.icon}</div>
      <div class="name">${t.name}</div>
      <div class="desc">${t.desc}</div>
    </button>
  `).join('');
  document.querySelectorAll('.card').forEach(b =>
    b.addEventListener('click', () => selectTopic(b.dataset.topic))
  );
}

function field(label, id, placeholder = '', value = '') {
  return `<div class="field">
    <label for="${id}">${label}</label>
    <input id="${id}" placeholder="${placeholder}" value="${value}">
  </div>`;
}

function buttons(items) {
  return `<div class="actions">
    ${items.map(x =>
      `<button class="action ${x.secondary ? 'secondary' : ''}" data-action="${x.id}">${x.label}</button>`
    ).join('')}
  </div>`;
}

function nums(id = 'values') {
  const raw = $(id)?.value ?? '';
  if (!raw.trim()) throw Error('Enter at least one number.');
  const a = raw.trim().split(/[\s,]+/).map(Number);
  if (a.some(n => !Number.isInteger(n))) throw Error('Please enter integers only.');
  return a;
}

function val(id) {
  const v = $(id)?.value.trim();
  if (v === '' || v === undefined) throw Error('Please fill in all required fields.');
  const n = Number(v);
  if (!Number.isInteger(n)) throw Error('Please enter a valid integer.');
  return n;
}

function show(value) {
  $('output').className = 'output';
  $('output').textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  $('status').className = 'status';
  $('status').textContent = 'Done. Try another operation or choose a different card.';
}

function fail(err) {
  $('output').className = 'output';
  $('output').textContent = 'Unable to run this operation.';
  $('status').className = 'status error';
  $('status').textContent = err.message || String(err);
}

function run(fn) {
  try { show(fn()); }
  catch (e) { fail(e); }
}

function selectTopic(id) {
  current = id;
  renderCards();
  const t = topics.find(x => x.id === id);
  $('workTitle').textContent = t.name;
  $('workDesc').textContent = t.detail;
  $('output').className = 'empty';
  $('output').innerHTML = `<div><div class="big">${t.icon}</div>Run an operation to see the output here.</div>`;
  $('status').textContent = 'Ready. Enter your values and select an operation.';

  let c = '';
  switch (id) {
    case 'array':
      c = field('Numbers', 'values', 'e.g. 8 3 12 5', '8 3 12 5') +
          field('Number to insert', 'insertVal', 'e.g. 7', '7') +
          field('Insert at index', 'index', '0 through list length', '2') +
          field('Number to delete', 'deleteVal', 'e.g. 3', '3') +
          field('Number to search', 'target', 'e.g. 12', '12') +
          buttons([
            { id: 'arrayInsert', label: 'Insert' },
            { id: 'arrayDelete', label: 'Delete', secondary: true },
            { id: 'arraySearch', label: 'Search', secondary: true },
            { id: 'arrayReset', label: 'Show original', secondary: true }
          ]);
      break;

      //Linked List
    case 'linked':
      c = field('Initial values', 'values', 'e.g. 10 20 30', '10 20 30') +
          field('Value to insert at end', 'insertVal', 'e.g. 40', '40') +
          field('Value to delete', 'deleteVal', 'e.g. 20', '20') +
          buttons([
            { id: 'linkedInsert', label: 'Insert node' },
            { id: 'linkedDelete', label: 'Delete node', secondary: true },
            { id: 'linkedShow', label: 'Display list', secondary: true }
          ]);
      break;

      //Stack
    case 'stack':
      c = field('Initial stack (bottom to top)', 'values', 'e.g. 10 20 30', '10 20 30') +
          field('Value to push', 'insertVal', 'e.g. 40', '40') +
          buttons([
            { id: 'stackPush', label: 'Push' },
            { id: 'stackPeek', label: 'Peek top', secondary: true },
            { id: 'stackPop', label: 'Pop', secondary: true }
          ]);
      break;

      //QUEUE
    case 'queue':
      c = field('Initial queue (front to rear)', 'values', 'e.g. 10 20 30', '10 20 30') +
          field('Value to enqueue', 'insertVal', 'e.g. 40', '40') +
          buttons([
            { id: 'queueEnqueue', label: 'Enqueue' },
            { id: 'queueFront', label: 'View front', secondary: true },
            { id: 'queueDequeue', label: 'Dequeue', secondary: true }
          ]);
      break;

      //TREE
    case 'tree':
      c = field('Root value', 'root', 'e.g. 8', '8') +
          field('Left child of root (optional)', 'left', 'leave blank for none', '3') +
          field('Right child of root (optional)', 'right', 'leave blank for none', '10') +
          field('Left child of left node (optional)', 'leftLeft', 'leave blank for none', '1') +
          field('Right child of left node (optional)', 'leftRight', 'leave blank for none', '6') +
          buttons([
            { id: 'treeBuild', label: 'Build tree' },
            { id: 'treeClear', label: 'Clear', secondary: true }
          ]);
      break;

      //GRAPH
    case 'graph':
      c = field('Vertices (separate with commas)', 'vertices', 'e.g. A, B, C, D', 'A, B, C, D') +
          field('Edges (one per comma, use A-B)', 'edges', 'e.g. A-B, A-C, B-D', 'A-B, A-C, B-D') +
          buttons([
            { id: 'graphBuild', label: 'Build graph' },
            { id: 'graphClear', label: 'Clear', secondary: true }
          ]);
      break;

      //LINEAR
    case 'linear':
      c = field('Numbers', 'values', 'e.g. 5 8 2 8 10', '5 8 2 8 10') +
          field('Target value', 'target', 'e.g. 8', '8') +
          buttons([{ id: 'linearSearch', label: 'Search' }]);
      break;

      //BUBBLE SORT
    case 'bubble':
    case 'quick':
      c = field('Numbers to sort', 'values', 'e.g. 8 3 12 5 1', '8 3 12 5 1') +
          buttons([
            { id: id + 'Sort', label: 'Sort ascending' },
            { id: 'sortClear', label: 'Clear output', secondary: true }
          ]);
      break;

      //TRAVERSAL
    case 'traversal':
      c = field('Root value', 'root', 'e.g. 8', '8') +
          field('Left child', 'left', 'optional', '3') +
          field('Right child', 'right', 'optional', '10') +
          field('Left child of left node', 'leftLeft', 'optional', '1') +
          field('Right child of left node', 'leftRight', 'optional', '6') +
          buttons([{ id: 'traversalRun', label: 'Show all traversals' }]);
      break;
  }

  $('controls').innerHTML = c;
  document.querySelectorAll('[data-action]').forEach(b =>
    b.addEventListener('click', () => handle(b.dataset.action))
  );
}

function treeFromFields() {
  const root = val('root');
  const opt = id => {
    const v = $(id).value.trim();
    return v === '' ? null : Number(v);
  };
  for (const id of ['left', 'right', 'leftLeft', 'leftRight']) {
    const v = opt(id);
    if (v !== null && !Number.isInteger(v)) throw Error('Tree node values must be integers.');
  }
  const node = v => v === null ? null : { v, left: null, right: null };
  const r = node(root);
  r.left = node(opt('left'));
  r.right = node(opt('right'));
  if (r.left) {
    r.left.left = node(opt('leftLeft'));
    r.left.right = node(opt('leftRight'));
  }
  return r;
}

function preorder(n, a = []) {
  if (n) { a.push(n.v); preorder(n.left, a); preorder(n.right, a); }
  return a;
}
function inorder(n, a = []) {
  if (n) { inorder(n.left, a); a.push(n.v); inorder(n.right, a); }
  return a;
}
function postorder(n, a = []) {
  if (n) { postorder(n.left, a); postorder(n.right, a); a.push(n.v); }
  return a;
}

function treeText(n, prefix = '', last = true) {
  if (!n) return '(empty tree)';
  let out = prefix + (last ? '└─ ' : '├─ ') + n.v + '\n';
  if (n.left) out += treeText(n.left, prefix + (last ? '   ' : '│  '), !n.right);
  if (n.right) out += treeText(n.right, prefix + (last ? '   ' : '│  '), true);
  return out;
}
    //ARRAY
function handle(a) {
  run(() => {
    if (a === 'arrayInsert') {
      const x = nums(), v = val('insertVal'), i = val('index');
      if (i < 0 || i > x.length) throw Error('Index must be between 0 and ' + x.length + '.');
      x.splice(i, 0, v);
      return 'After insertion:\n' + JSON.stringify(x);
    }
    if (a === 'arrayDelete') {
      const x = nums(), v = val('deleteVal'), i = x.indexOf(v);
      if (i < 0) return 'Number not found. Array unchanged:\n' + JSON.stringify(x);
      x.splice(i, 1);
      return 'Deleted first occurrence of ' + v + ':\n' + JSON.stringify(x);
    }
    if (a === 'arraySearch') {
      const x = nums(), v = val('target'), i = x.indexOf(v);
      return i < 0 ? 'Number not found.' : 'Number found at index ' + i + '.';
    }
    if (a === 'arrayReset') return 'Original array:\n' + JSON.stringify(nums());


//LINKED LIST
    if (a.startsWith('linked')) {
      const x = nums();
      if (a === 'linkedInsert') x.push(val('insertVal'));
      if (a === 'linkedDelete') {
        const v = val('deleteVal'), i = x.indexOf(v);
        if (i < 0) return 'Value not found. List unchanged:\n' + x.join(' → ') + ' → None';
        x.splice(i, 1);
      }
      return 'Linked list:\n' + x.join(' → ') + ' → None';
    }

    //STACK
    if (a === 'stackPush') {
      const x = nums();
      x.push(val('insertVal'));
      return 'Stack (bottom → top):\n' + JSON.stringify(x) + '\nTop element: ' + x[x.length - 1];
    }
    if (a === 'stackPeek') {
      const x = nums();
      if (!x.length) throw Error('Stack is empty.');
      return 'Top element: ' + x[x.length - 1] + '\nStack unchanged:\n' + JSON.stringify(x);
    }
    if (a === 'stackPop') {
      const x = nums();
      if (!x.length) throw Error('Stack is empty.');
      const v = x.pop();
      return 'Popped element: ' + v + '\nUpdated stack:\n' + JSON.stringify(x);
    }

    //QUEUES
    if (a === 'queueEnqueue') {
      const x = nums();
      x.push(val('insertVal'));
      return 'Queue (front → rear):\n' + JSON.stringify(x);
    }
    if (a === 'queueFront') {
      const x = nums();
      if (!x.length) throw Error('Queue is empty.');
      return 'Front element: ' + x[0] + '\nQueue unchanged:\n' + JSON.stringify(x);
    }
    if (a === 'queueDequeue') {
      const x = nums();
      if (!x.length) throw Error('Queue is empty.');
      const v = x.shift();
      return 'Dequeued element: ' + v + '\nUpdated queue:\n' + JSON.stringify(x);
    }

    //TREE
    if (a === 'treeBuild' || a === 'traversalRun') {
      const r = treeFromFields();
      if (a === 'treeBuild') {
        return 'Tree structure (left/right branches):\n' + treeText(r) +
               '\nPreorder display: ' + preorder(r).join(' ');
      }
      return 'Inorder (Left–Root–Right): ' + inorder(r).join(' ') +
             '\nPreorder (Root–Left–Right): ' + preorder(r).join(' ') +
             '\nPostorder (Left–Right–Root): ' + postorder(r).join(' ');
    }

    if (a === 'treeClear' || a === 'graphClear' || a === 'sortClear') {
      return 'Cleared. Enter values and run an operation.';
    }

    //GRAPH
    if (a === 'graphBuild') {
      const vs = $('vertices').value.split(',').map(s => s.trim()).filter(Boolean);
      if (!vs.length) throw Error('Enter at least one vertex.');
      if (new Set(vs).size !== vs.length) throw Error('Vertex names must be unique.');
      const g = Object.fromEntries(vs.map(v => [v, []]));
      const edges = $('edges').value.trim();
      if (edges) {
        for (const e of edges.split(',')) {
          const parts = e.trim().split('-').map(s => s.trim());
          if (parts.length !== 2 || !g[parts[0]] || !g[parts[1]]) {
            throw Error('Invalid edge "' + e.trim() + '". Use known vertices like A-B.');
          }
          g[parts[0]].push(parts[1]);
          g[parts[1]].push(parts[0]);
        }
      }
      return 'Undirected graph adjacency list:\n' +
             Object.entries(g).map(([v, n]) => v + ' → [' + n.join(', ') + ']').join('\n');
    }

    //LINEAR SEARCH
    if (a === 'linearSearch') {
      const x = nums(), v = val('target'), i = x.indexOf(v);
      return i < 0 ? 'Element not found.' : 'Element found at index ' + i + '.';
    }

    //BUBBLE SORT
    if (a === 'bubbleSort') {
      const x = nums();
      let steps = 0;
      for (let i = 0; i < x.length; i++) {
        let swapped = false;
        for (let j = 0; j < x.length - i - 1; j++) {
          if (x[j] > x[j + 1]) {
            [x[j], x[j + 1]] = [x[j + 1], x[j]];
            swapped = true;
            steps++;
          }
        }
        if (!swapped) break;
      }
      return 'Sorted array:\n' + JSON.stringify(x) + '\nAdjacent swaps: ' + steps;
    }

    //QUICK SORT
    if (a === 'quickSort') {
      const original = nums();
      function qs(arr) {
        if (arr.length <= 1) return arr;
        const p = arr[Math.floor(arr.length / 2)];
        return [...qs(arr.filter(n => n < p)), ...arr.filter(n => n === p), ...qs(arr.filter(n => n > p))];
      }
      return 'Sorted array:\n' + JSON.stringify(qs(original));
    }

    throw Error('Please choose a valid operation.');
  });
}

renderCards();
selectTopic('array');