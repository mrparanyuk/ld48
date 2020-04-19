
var Scene = {

    create: function () {
        return [];
    },

    add: function (scene, item) {
        scene.push(item)
    },

    clear: function (scene) {
        scene.length = 0;
    },

    remove: function(scene, toRemove) {
        return scene.filter(function(item) {
            return item.body.id !== toRemove.id;
        });
    },

    computeSceneGeneralItem: function(item, offsetX, offsetY) {
        if (item.body && item.body.position) {
            item.computed = {x: item.body.position.x - offsetX, y: item.body.position.y + offsetY };
        }

        return item;
    },

    computeSceneVerticesItem: function(item, offsetX, offsetY) {
        if (item.body && item.body.vertices) {
            item.body.computedVertices = item.body.vertices.map(function (v) {
                return {x: v.x - offsetX, y: v.y + offsetY};
            });
        }

        return item;
    },

    computeSceneBridgeItem: function(item, offsetX) {
        item.boxes = item.boxes.map((function (generalItem) {
            generalItem.computed = {x: generalItem.body.position.x - offsetX, y: generalItem.body.position.y + offsetY };

            return generalItem;
        }).bind(this));

        return item;
    },

    computeTree: function(item, offsetX) {
        item.computedBox = {x: item.body.position.x - offsetX, y: item.body.position.y + offsetY };

        return item;
    },

    computeTriangle: function(item, offsetX, offsetY) {
          item.computedVerticles = [
              {x: item.x0 - offsetX, y: item.y0 - offsetY},
              {x: item.x1 - offsetX, y: item.y1 - offsetY},
              {x: item.x2 - offsetX, y: item.y2 - offsetY},
          ];

          return item;
    },

    computeScene: function (scene, point) {
        var offsetX;
        if (engine.world.gravity.y > 0) {
            offsetX = point.x - width / 12;
            offsetY = Math.round((height - 50 - 40 - point.y) / 2);
        } else {
            offsetX = point.x - width + 100;
            offsetY = Math.round((point.y - height) / 4 ) * -1;
        }


        return scene.map((function (item) {
            if (item.type && item.type === UNITS.TYPE_BRIDGE) {
                return this.computeSceneBridgeItem(item, offsetX, offsetY);
            } else if (item.type && item.type === UNITS.TYPE_VERTICES) {
                return this.computeSceneVerticesItem(item, offsetX, offsetY);
            } else if (item.type && item.type === UNITS.TYPE_TREE) {
                return this.computeTree(item, offsetX, offsetY);
            }  else if (item.type && item.type === UNITS.TYPE_TRIANGLE) {
                return this.computeTriangle(item, offsetX, offsetY);
            } else if (item.type && item.type === UNITS.TYPE_ARRAY_VERTICES) {
                item.boxes = item.boxes.map((function(box) {
                    this.computeSceneVerticesItem(box, offsetX, offsetY);

                    return box;
                }).bind(this))

                return item;
            } else {
                return this.computeSceneGeneralItem(item, offsetX, offsetY);
            }
        }).bind(this));
    }
}