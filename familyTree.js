// d3.json('data.json').then(data => {
//     const width = 960;
//     const height = 600;

//     const svg = d3.select("svg")
//         .attr("width", width)
//         .attr("height", height);

//     const tree = d3.tree()
//         .size([height, width - 160]);

//     const stratify = d3.stratify()
//         .id(d => d.name)
//         .parentId(d => d.mother);

//     const root = stratify(data);
//     tree(root);

//     const link = svg.selectAll(".link")
//         .data(root.links())
//         .enter().append("path")
//         .attr("class", "link")
//         .attr("d", d3.linkHorizontal()
//             .x(d => d.y)
//             .y(d => d.x));

//     const node = svg.selectAll(".node")
//         .data(root.descendants())
//         .enter().append("g")
//         .attr("class", "node")
//         .attr("transform", d => `translate(${d.y},${d.x})`);

//     node.append("circle")
//         .attr("class", d => d.data.sex === "M" ? "male" : "female")
//         .attr("r", 10);

//     node.append("text")
//         .attr("dy", 3)
//         .attr("x", d => d.children ? -12 : 12)
//         .style("text-anchor", d => d.children ? "end" : "start")
//         .text(d => d.data.display_name);
// });


// Adding drag feature

// d3.json('data.json').then(data => {
//     const width = 960;
//     const height = 600;

//     const svg = d3.select("svg")
//         .attr("width", width)
//         .attr("height", height);

//     const tree = d3.tree()
//         .size([height, width - 160]);

//     const stratify = d3.stratify()
//         .id(d => d.name)
//         .parentId(d => d.mother);

//     const root = stratify(data);
//     tree(root);

//     const link = svg.selectAll(".link")
//         .data(root.links())
//         .enter().append("path")
//         .attr("class", "link")
//         .attr("d", d3.linkHorizontal()
//             .x(d => d.y)
//             .y(d => d.x));

//     const node = svg.selectAll(".node")
//         .data(root.descendants())
//         .enter().append("g")
//         .attr("class", "node")
//         .attr("transform", d => `translate(${d.y},${d.x})`)
//         .call(d3.drag()
//             .on("start", dragStarted)
//             .on("drag", dragged)
//             .on("end", dragEnded)
//         );

//     node.append("circle")
//         .attr("class", d => d.data.sex === "M" ? "male" : "female")
//         .attr("r", 10);

//     node.append("text")
//         .attr("dy", 3)
//         .attr("x", d => d.children ? -12 : 12)
//         .style("text-anchor", d => d.children ? "end" : "start")
//         .text(d => d.data.display_name);

//     function dragStarted(event, d) {
//         if (!event.active) tree(root);
//         d.fx = d.x;
//         d.fy = d.y;
//     }

//     function dragged(event, d) {
//         d.fx = event.y;
//         d.fy = event.x;
//         d3.select(this).attr("transform", `translate(${d.fy},${d.fx})`);
//         link.attr("d", d3.linkHorizontal()
//             .x(d => d.y)
//             .y(d => d.x));
//     }

//     function dragEnded(event, d) {
//         if (!event.active) tree(root);
//         d.fx = null;
//         d.fy = null;
//     }
// });


// Adding undo and redo button 

// d3.json('data.json').then(data => {
//     const width = 960;
//     const height = 600;

//     const svg = d3.select("svg")
//         .attr("width", width)
//         .attr("height", height);

//     const tree = d3.tree()
//         .size([height, width - 160]);

//     const stratify = d3.stratify()
//         .id(d => d.name)
//         .parentId(d => d.mother);

//     const root = stratify(data);
//     tree(root);

//     const linkGroup = svg.append("g").attr("class", "links");
//     const nodeGroup = svg.append("g").attr("class", "nodes");

//     let link = linkGroup.selectAll(".link")
//         .data(root.links())
//         .enter().append("path")
//         .attr("class", "link")
//         .attr("d", d3.linkHorizontal()
//             .x(d => d.y)
//             .y(d => d.x));

//     let node = nodeGroup.selectAll(".node")
//         .data(root.descendants())
//         .enter().append("g")
//         .attr("class", "node")
//         .attr("transform", d => `translate(${d.y},${d.x})`)
//         .call(d3.drag()
//             .on("start", dragStarted)
//             .on("drag", dragged)
//             .on("end", dragEnded)
//         );

//     node.append("circle")
//         .attr("class", d => d.data.sex === "M" ? "male" : "female")
//         .attr("r", 10);

//     node.append("text")
//         .attr("dy", 3)
//         .attr("x", d => d.children ? -12 : 12)
//         .style("text-anchor", d => d.children ? "end" : "start")
//         .text(d => d.data.display_name);

//     // Stack to hold the states for undo and redo
//     const undoStack = [];
//     const redoStack = [];

//     function saveState() {
//         const state = node.data().map(d => ({ x: d.x, y: d.y }));
//         undoStack.push(state);
//         redoStack.length = 0;  // Clear the redo stack
//     }

//     function restoreState(state) {
//         node.data().forEach((d, i) => {
//             d.x = state[i].x;
//             d.y = state[i].y;
//         });
//         update();
//     }

//     function undo() {
//         if (undoStack.length > 0) {
//             const state = undoStack.pop();
//             redoStack.push(node.data().map(d => ({ x: d.x, y: d.y })));
//             restoreState(state);
//         }
//     }

//     function redo() {
//         if (redoStack.length > 0) {
//             const state = redoStack.pop();
//             undoStack.push(node.data().map(d => ({ x: d.x, y: d.y })));
//             restoreState(state);
//         }
//     }

//     function update() {
//         node.attr("transform", d => `translate(${d.y},${d.x})`);

//         link.data(root.links())
//             .attr("d", d3.linkHorizontal()
//                 .x(d => d.y)
//                 .y(d => d.x));
//     }

//     function dragStarted(event, d) {
//         saveState();
//         if (!event.active) tree(root);
//         d.fx = d.x;
//         d.fy = d.y;
//     }

//     function dragged(event, d) {
//         d.fx = event.y;
//         d.fy = event.x;
//         d.x = event.y;
//         d.y = event.x;
//         d3.select(this).attr("transform", `translate(${d.fy},${d.fx})`);
//         link.attr("d", d3.linkHorizontal()
//             .x(d => d.y)
//             .y(d => d.x));
//     }

//     function dragEnded(event, d) {
//         if (!event.active) tree(root);
//         d.fx = null;
//         d.fy = null;
//         update();
//     }

//     // Create Undo and Redo buttons
//     d3.select("body").append("button")
//         .text("Undo")
//         .on("click", undo);

//     d3.select("body").append("button")
//         .text("Redo")
//         .on("click", redo);
// });



// drag part - 2

d3.json('data.json').then(data => {
    const width = 960;
    const height = 600;

    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    const tree = d3.tree()
        .size([height, width - 160]);

    const stratify = d3.stratify()
        .id(d => d.name)
        .parentId(d => d.mother);

    const root = stratify(data);
    tree(root);

    const linkGroup = svg.append("g").attr("class", "links");
    const nodeGroup = svg.append("g").attr("class", "nodes");

    let link = linkGroup.selectAll(".link")
        .data(root.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    let node = nodeGroup.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
        );

    node.append("circle")
        .attr("class", d => d.data.sex === "M" ? "male" : "female")
        .attr("r", 10);

    node.append("text")
        .attr("dy", 3)
        .attr("x", d => d.children ? -12 : 12)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.display_name);

    // Stack to hold the states for undo and redo
    const undoStack = [];
    const redoStack = [];

    function saveState() {
        const state = node.data().map(d => ({ x: d.x, y: d.y }));
        undoStack.push(state);
        redoStack.length = 0;  // Clear the redo stack
    }

    function restoreState(state) {
        node.data().forEach((d, i) => {
            d.x = state[i].x;
            d.y = state[i].y;
        });
        update();
    }

    function undo() {
        if (undoStack.length > 0) {
            const state = undoStack.pop();
            redoStack.push(node.data().map(d => ({ x: d.x, y: d.y })));
            restoreState(state);
        }
    }

    function redo() {
        if (redoStack.length > 0) {
            const state = redoStack.pop();
            undoStack.push(node.data().map(d => ({ x: d.x, y: d.y })));
            restoreState(state);
        }
    }

    function update() {
        node.attr("transform", d => `translate(${d.y},${d.x})`);

        link.data(root.links())
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));
    }

    function dragStarted(event, d) {
        saveState();
        d3.select(this).raise().classed("active", true);
    }

    function dragged(event, d) {
        d.x = event.y;
        d.y = event.x;
        d3.select(this).attr("transform", `translate(${d.y},${d.x})`);
        link.attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));
    }

    function dragEnded(event, d) {
        d3.select(this).classed("active", false);
        update();
    }

    // Create Undo and Redo buttons
    d3.select("body").append("button")
        .text("Undo")
        .on("click", undo);

    d3.select("body").append("button")
        .text("Redo")
        .on("click", redo);
});
