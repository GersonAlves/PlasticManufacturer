(function () {
    "use strict";
    angular
        .module("plasticManufacturer")
        .controller("RawMaterialController", ["rawMaterialResource", RawMaterialController]);

    function RawMaterialController(rawMaterialResource) {
        var vm = this;
        vm.rawMaterial = {};
        vm.rawMaterial.Costs = {};

        rawMaterialResource.query(function (data) {
            
            vm.rawMaterials = data;

        });

        vm.submit = function () {

            console.log(vm.rawMaterial);

            rawMaterialResource.save(vm.rawMaterial)

            //console.log(teste);
        };

    }

    }());   