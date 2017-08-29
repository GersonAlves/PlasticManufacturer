(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("rawMaterialResource", ["$resource", "appSettings", rawMaterialResource])

    function rawMaterialResource($resource, appSettings) {

        return $resource(appSettings.serverPath + "/api/rawMaterials/:id");
    }
}());